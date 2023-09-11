import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export const SignUp = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      navigate('/dashboard');
    }
  });

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  function validateData() {
    if (email === null || email === "" || password === null || password === "") {
      console.log("Please enter Email and Password!");
      return false;
    }
    return true;
  }

  async function submitReg(e) {
    e.preventDefault();
    if (validateData()) {

      let data = { 'name': name, 'email': email, 'contact': contact, 'password': password };

      let result = await fetch('http://127.0.0.1:8000/api/register', {
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

        window.location.reload(true);
      } else {
        alert('Incorrect Creds');
      }
    } else {
      return false;
    }
  }

  return (
    <form>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={name}
          onChange={handleName}
        />
      </div>
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
        <label>Contact</label>
        <PhoneInput
          className="form-control"
          placeholder="Contact"
          value={contact}
          onChange={setContact}
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
      <div className="d-grid">
        <button type="submit" className="btn btn-primary" onClick={submitReg}>
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <Link to="/login">sign in?</Link>
      </p>
    </form>
  );
}