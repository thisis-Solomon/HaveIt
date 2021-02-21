import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckOutSteps from "../CheckOutSteps";

const PaymentMethodPage = (props) => {
    const [paymentMethod, setPaymentMethod] = useState("Paypal");

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        props.history.push("/shipping");
    }

    const dispatch = useDispatch();
    const handlePaymentSubmit = (event) => {
        event.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));

        props.history.push("./placeorder");
    };
    return (
        <div>
            <CheckOutSteps step1 step2 step3 />
            <form className='form' onSubmit={handlePaymentSubmit}>
                <div>
                    <h1>Choose your payment method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type='radio'
                            id='paypal'
                            name='paymentMethod'
                            required
                            checked
                            value='PayPal'
                            onChange={(event) =>
                                setPaymentMethod(event.target.value)
                            }
                        />
                        <label htmlFor='paypal'>PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type='radio'
                            id='stripe'
                            name='paymentMethod'
                            required
                            value='Stripe'
                            onChange={(event) =>
                                setPaymentMethod(event.target.value)
                            }
                        />
                        <label htmlFor='stripe'>Stripe</label>
                    </div>
                </div>

                <div>
                    <button className='primary' type='submit'>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentMethodPage;
