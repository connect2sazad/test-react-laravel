import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem('user')){
            navigate('/dashboard');
        }
    }, []);

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    function validateData() {
        if (email === null || email === "" || password === null || password === "") {
            console.log("Please enter Email and Password!");
            return false;
        }
        return true;
    }

    async function submitlogin(e) {
        e.preventDefault();
        if (validateData()) {

            let data = { 'email': email, 'password': btoa(password) };

            let result = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json'
                }
            });

            result = await result.json();

            if (result['status']) {
                sessionStorage.setItem("user", JSON.stringify(result['email']));
                navigate("/dashboard");

            } else {
                alert('Incorrect Creds');
            }
        } else {
            return false;
        }
    }

    return(
        <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" onClick={submitlogin}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <Link to="#">password?</Link>
        </p>
      </form>
    );
}