import express from "express";
import data from "./data.js";

// variable constance
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).send("HaveIt Backend in Process");
});

app.get('/api/products', (req, res) => {
    res.status(200).send(data.products)
})

// App listening
app.listen(PORT, () => console.log(`server running at: ${PORT}`));