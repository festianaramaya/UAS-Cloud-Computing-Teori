require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

exports.login = async (req, res) => {

    const { username, password } = req.body;

    const result = await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
    );

    if(result.rows.length === 0){

        return res.status(401).json({
            message:"User tidak ditemukan"
        });

    }

    const user = result.rows[0];

    if(password !== user.password){

        return res.status(401).json({
            message:"Password salah"
        });

    }

    const token = jwt.sign(

        {
            id:user.id,
            username:user.username
        },

        process.env.JWT_SECRET,

        {
            expiresIn:"1h"
        }

    );

    res.json({

        message:"Login berhasil",

        token

    });

};