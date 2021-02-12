import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../CheckOutSteps";

const ShippingAdressPage = (props) => {
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!userInfo){
        props.history.push('/signin')
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postCode, setPostCode] = useState(shippingAddress.postCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            saveShippingAddress({ fullName, address, city, postCode, country })
        );
        props.history.push('/payment')
    };
    return (
        <div>
            <CheckOutSteps step1 step2></CheckOutSteps>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                        type='text'
                        placeholder='Enter Your Full Name'
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='postCode'>Post Code</label>
                    <input
                        type='text'
                        placeholder='Enter Post Code'
                        value={postCode}
                        onChange={(event) => setPostCode(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ShippingAdressPage;
