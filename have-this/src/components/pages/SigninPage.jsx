import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userAction";
import ErrorMessage from "../messages/ErrorMessage";
import LoadingBox from "../messages/LoadingBox";

const SigninPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Sign in to have a convient online shopping</h1>
                {loading && <LoadingBox />}
                {/* TODO: display the correct error meassage from the server */}
                {/* {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>} */}
                <div>
                    <label htmlFor='email'>Email address</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter Email'
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='password'>Email address</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter Password'
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label />
                    <button className='primary' type='submit'>
                        Sign In
                    </button>
                </div>

                <div>
                    <label />
                    <h4>
                        New Customer?{" "}
                        <Link to='/register'>Create your account</Link>
                    </h4>
                </div>
            </form>
        </div>
    );
};

export default SigninPage;
