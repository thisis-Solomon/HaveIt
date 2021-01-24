import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeItemFromCart } from "../actions/cartActions";
import ErrorMessage from "../messages/ErrorMessage";

const CartPage = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split("=")[1])
        : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const HandleRemoveFromCart = (id) => {
        dispatch(removeItemFromCart(id))
    };

    const HandleCheckout = () => {
        props.history.push("/signin?redirect=shipping");
    };

    return (
        <div className='row top'>
            <div className='col-2'>
                <h1>Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <ErrorMessage>
                        Your Cart is empty. <Link to='/'>Go Shopping</Link>
                    </ErrorMessage>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
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
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        <select
                                            value={item.qty}
                                            onChange={(event) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(
                                                            event.target.value
                                                        )
                                                    )
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>${item.price}</div>
                                    <div>
                                        <button
                                            type='button'
                                            onClick={() =>
                                                HandleRemoveFromCart(
                                                    item.product
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                            <h2>
                                Subtotal(
                                {cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                                items) : $
                                {cartItems.reduce(
                                    (a, c) => a + c.price * c.qty,
                                    0
                                )}
                            </h2>
                        </li>
                        <li>
                            <button
                                className='primary block'
                                type='button'
                                disabled={cartItems.length === 0}
                                onClick={HandleCheckout}
                            >
                                Procced To Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
