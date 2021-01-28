import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRoute = express.Router();

userRoute.get(
    "/seed",
    expressAsyncHandler(async (req, res) => {
        // await User.remove({})
        const createdUser = await User.insertMany(data.user);
        res.status(200).send({ createdUser });
    })
);

userRoute.post(
    "/signin",
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ meassage: "Invalid user password or email" });
    })
);
export default userRoute;
