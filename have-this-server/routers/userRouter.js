import express from "express";
import expressAsyncHandler from "express-async-handler"
import data from "../data.js";
import User from "../models/userModel.js";

const userRoute = express.Router();

userRoute.get("/seed", expressAsyncHandler(async (req, res) => {
    // await User.remove({})
    const createdUser = await User.insertMany(data.user);
    res.status(200).send({createdUser});
}));

export default userRoute