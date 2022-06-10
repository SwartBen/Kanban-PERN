import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"
import './Login.css'

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const {email, password } = inputs

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name] : e.target.value });
    };

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {

            const body = {email, password}

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            if (response.status === 200) {
                const parseRes = await response.json()
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <div class="login-container">
                <div class="login">
                    <span class="black title">Sign in to your account </span>
                    <form class="login-form" onSubmit={onSubmitForm}>
                        <div>
                            Email
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="email"
                                className="form-control my-3"
                                value = {email}
                                onChange={e => onChange(e)}
                            />
                            Password
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="password"
                                className="form-control my-3"
                                value = {password}
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div>
                            <button 
                                className="btn btn-primary 
                                btn-block">Sign In
                            </button>
                        </div>
                    </form>
                    <span class="black">Don't have an account? <Link to="/register">Register here</Link></span>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;