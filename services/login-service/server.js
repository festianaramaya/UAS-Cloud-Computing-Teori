require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Login Service berjalan di port ${process.env.PORT}`);
});