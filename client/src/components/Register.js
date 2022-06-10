import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"
import './Register.css'

const Register = ( {setAuth} ) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    const {email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value });
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {
            const body = {email, password, name}

            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            const parseRes = await response.json()

            localStorage.setItem("token", parseRes.token)
            setAuth(true)

        } catch (err) {
            console.error(err.message)
        }

    }
    return (
        <Fragment>
            <div class="register-container">
                <div class="register">
                    <span class="black title">Register an account </span>
                    <form class="register-form" onSubmit={onSubmitForm}>
                        <div>
                            Email
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="email" 
                                className="form-control my-3"
                                value={email}
                                onChange= {e => onChange(e)}
                            />
                            Password
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="password" 
                                className="form-control my-3"
                                value={password}
                                onChange= {e => onChange(e)}
                            />
                            Name
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="name" 
                                className="form-control my-3"
                                value={name}
                                onChange= {e => onChange(e)}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary btn-block">Sign up</button>
                        </div>
                    </form>
                    <span class="black">Have an account? <Link to="/login">Login here</Link></span>
                </div>
            </div>
        </Fragment>
    )
}

export default Register