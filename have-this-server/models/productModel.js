import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        brand: { type: String, required: true },
        rating: { type: Number, required: true },
        numberOfReviews: { type: Number, required: true },
        description: { type: String, required: true },
    },
    { timestamp: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
