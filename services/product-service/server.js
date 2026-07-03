require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Product Service berjalan di port ${process.env.PORT}`);
});