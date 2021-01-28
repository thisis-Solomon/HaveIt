import React, { useState } from "react";
import { Link } from "react-router-dom";

const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefualt();
        //TODO: this action need to be impl
    };
    return (
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Sign in to have a convient online shopping</h1>
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
                    <labe />
                    <button className='primary' type='submit'>
                        Sign In
                    </button>
                </div>

                <div>
                    <label />
                    <h4>New Customer?{" "}<Link to='/register'>Create your account</Link></h4>
                </div>
            </form>
        </div>
    );
};

export default SigninPage;
