require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

});

exports.getProducts = async (req, res) => {

    try{

        const result = await pool.query(
            "SELECT * FROM products ORDER BY id"
        );

        res.json(result.rows);

    }catch(err){

        res.status(500).json({

            message:"Database Error",

            error:err.message

        });

    }

};