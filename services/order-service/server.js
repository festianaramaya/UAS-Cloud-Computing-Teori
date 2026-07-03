require("dotenv").config();

const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", orderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Order Service berjalan di port ${process.env.PORT}`);
});