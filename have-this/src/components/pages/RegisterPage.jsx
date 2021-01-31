import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import ErrorMessage from "../messages/ErrorMessage";
import LoadingBox from "../messages/LoadingBox";

const RegisterPage = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (confirmPassword !== password) {
            alert("Your first and the second password do not much");
        } else {
            dispatch(register(name, email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Create an account and to have a convenient online shopping</h1>
                {loading && <LoadingBox />}
                {/* TODO: display the correct error meassage from the server */}
                {/* {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>} */}
                <div>
                    <label htmlFor='name'>Enter Name</label>
                    <input
                        type='name'
                        id='name'
                        placeholder='Enter Name'
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>

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
                    <label htmlFor='password'>Enter Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter Password'
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        placeholder='Enter Password'
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label />
                    <button className='primary' type='submit'>
                        Register
                    </button>
                </div>

                <div>
                    <label />
                    <h4>
                        Have already an account?{" "}
                        <Link to={`/signin?rediect=${redirect}`}>Sign-In</Link>
                    </h4>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
