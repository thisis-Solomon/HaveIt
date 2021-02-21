import CheckOutSteps from "../CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { useEffect } from "react";
import { CREATE_ORDER_RESET } from "../../constants/orderConstants";
import ErrorMessage from "../messages/ErrorMessage";
import LoadingBox from "../messages/LoadingBox";

const PlaceHolderPage = (props) => {
    const cart = useSelector((state) => state.cart);
    const userSignin = useSelector((state) => state.userSignin);
    // const { userInfo } = userSignin;

    // if (!userInfo) {
    //     props.history.push("/signin");
    // }

    if (!cart.paymentMethod) {
        props.history.push("/payment");
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, b) => a + b.qty * b.price, 0)
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();

    const handleOrderItems = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    useEffect(() => {
        if (success) {
            props.history.push("/order/" + order._id)
            dispatch({ type: CREATE_ORDER_RESET })
        }
    }, [dispatch, order, props.history, success]);

    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4 />
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>
                                    {cart.shippingAddress.fullName} <br />
                                    <strong>Address: </strong>
                                    {cart.shippingAddress.address},{" "}
                                    {cart.shippingAddress.city},{" "}
                                    {cart.shippingAddress.postCode},{" "}
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment method</h2>
                                <p>
                                    <strong>Name:</strong>
                                    {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Items Order</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>{" "}
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>{" "}
                            <li>
                                <div className='row'>
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>{" "}
                            <li>
                                <div className='row'>
                                    <div>
                                        <strong>Total Cost of Items</strong>
                                    </div>
                                    <div>
                                        <strong>
                                            ${cart.totalPrice.toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type='button'
                                    disabled={cart.cartItems.length === 0}
                                    className='primary block'
                                    onClick={handleOrderItems}
                                >
                                    Place Order
                                </button>
                            </li>
                            {loading && <LoadingBox />}
                            {error && (
                                <ErrorMessage variant='danger'>
                                    {error}
                                </ErrorMessage>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceHolderPage;
