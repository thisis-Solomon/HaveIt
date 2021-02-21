import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRoute = express.Router();

orderRoute.post(
    "/",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems === 0) {
            res.status(400).send({ message: "Your cart is empty" });
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });

            const createdOrder = await order.save();
            res.status(201).send({
                message: "New order created",
                order: createdOrder,
            });
        }
    })
);

orderRoute.get(
    "/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: "Order not Found" });
        }
    })
);
export default orderRoute;
