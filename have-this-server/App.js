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

app.get("/api/products", (req, res) => {
    res.status(200).send(data.products);
});

app.get("/api/products/:id", (req, res) => {
    const product = data.products.find(
        (x) => x._id === parseInt(req.params.id)
    );

    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send({ message: "Product not found" });
    }
});

// App listening
app.listen(PORT, () => console.log(`server running at: ${PORT}`));
