import express from "express";
import db from "./db.js";
import dotenv from 'dotenv'
import productRoute from "./routers/productRouter.js";
import userRoute from "./routers/userRouter.js";

dotenv.config()

// variable constance
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Routes

app.use("/api/users", userRoute);
app.use("/api/products", productRoute)

// DATABASE
db;

// Error handler
app.use((error, req, res, next) => {
    res.status(500).send({ message: error.message });
});

// App listening
app.listen(PORT, () => console.log(`server running at: ${PORT}`));
