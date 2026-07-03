require("dotenv").config();

const { Pool } = require("pg");
const axios = require("axios");
const CircuitBreaker = require("opossum");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// ==============================
// Retry Pattern
// ==============================

async function getProducts(token) {

    const MAX_RETRY = 3;

    for (let i = 1; i <= MAX_RETRY; i++) {

        try {

            console.log(`Percobaan ke-${i}`);

            const response = await axios.get(
                "http://product-service:3001/products",
                {
                    headers: {
                        Authorization: token
                    },
                    timeout: 3000
                }
            );

            console.log("Product berhasil diambil");

            return response.data;

        } catch (err) {

            console.log(`Retry ke-${i} gagal`);

            if (i === MAX_RETRY) {
                throw err;
            }

            await new Promise(resolve => setTimeout(resolve, 2000));

        }

    }

}

// ==============================
// Circuit Breaker
// ==============================

const breaker = new CircuitBreaker(getProducts, {

    timeout: 5000,

    errorThresholdPercentage: 50,

    resetTimeout: 10000

});

breaker.fallback(() => {

    throw new Error("Product Service sedang tidak tersedia (Circuit Breaker Aktif)");

});

breaker.on("open", () => {
    console.log("Circuit Breaker OPEN");
});

breaker.on("halfOpen", () => {
    console.log("Circuit Breaker HALF OPEN");
});

breaker.on("close", () => {
    console.log("Circuit Breaker CLOSED");
});

// ==============================
// Create Order
// ==============================

exports.createOrder = async (req, res) => {

    const { product_name, quantity } = req.body;

    try {

        const token = req.headers.authorization;

        await breaker.fire(token);

        await pool.query(
            "INSERT INTO orders(product_name, quantity) VALUES($1,$2)",
            [product_name, quantity]
        );

        res.json({
            message: "Order berhasil dibuat"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// ==============================
// Get Orders
// ==============================

exports.getOrders = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM orders ORDER BY id");

        res.json(result.rows);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};