import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ErrorMessage from "../messages/ErrorMessage";
import LoadingBox from "../messages/LoadingBox";
import { detailsOrder } from "../actions/orderActions";

const OrderPage = (props) => {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
    ) : (
        <div>
            <h1>Order {order._id}</h1>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>
                                    {order.shippingAddress.fullName} <br />
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address},{" "}
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.postCode},{" "}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <ErrorMessage variant='success'>
                                        Delivered {order.deliveredAt}
                                    </ErrorMessage>
                                ) : (
                                    <ErrorMessage variant='danger'>
                                        Not delivered
                                    </ErrorMessage>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment method</h2>
                                <p>
                                    <strong>Name:</strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <ErrorMessage variant='success'>
                                        Paid {order.paidAt}
                                    </ErrorMessage>
                                ) : (
                                    <ErrorMessage variant='danger'>
                                        Not Paid
                                    </ErrorMessage>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Items Order</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className='row'>
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className='small'
                                                    />
                                                </div>
                                                <div className='min-30'>
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <div>
                                                    {item.qty} x ${item.price} ={" "}
                                                    ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>{" "}
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>{" "}
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>{" "}
                            <li>
                                <div className='row'>
                                    <div>
                                        <strong>Total Cost of Items</strong>
                                    </div>
                                    <div>
                                        <strong>
                                            ${order.totalPrice.toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
