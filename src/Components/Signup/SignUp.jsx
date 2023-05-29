import React, { useState } from "react";
import logo from "../../assets/logo.png";
import RegisterImg from "../../assets/register.png";
import google from "../../assets/google.png";
import FormInput from "../FormInput/FormInput";
import { Link, useNavigate } from "react-router-dom";
import GAuthButton from "../GOAuth/GOAuth";

export default function SignUp() {
  // *!State Management for the input field
  const [values, setValues] = useState({
    FullName: "",
    email: "",
    Password: "",
    confirmPassword: "",
  });

  //! Input field. Regex code used to validate form/*
  const inputs = [
    {
      id: 1,
      name: "FullName",
      type: "text",
      placeholder: "Enter your name",
      errorMessage: "Username should be 3-16 characters",
      label: "Name",
      pattern: "^[A-Za-z0-9](?=.*[@$^#!%*&]){3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      errorMessage: "Valid email is required",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "Password",
      type: "password",
      placeholder: "Enter your password",
      errorMessage:
        "Password should be 8-20 characters and should include alphanumeric charcters and a special character",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=*[a-zA-Z])(?=.*[@$^#!%*&])[a-zA-Z0-9@#^$!%*?&]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      label: "Confirm Password",
      pattern: values.Password,
      required: true,
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);
  // const requestData ={
  //   name: values,
  //   email:values,
  //   Password: values,
  //   confirmPassword: values.Password
  // }
const navigate= useNavigate();
  fetch("https://edgegap.onrender.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  })
    .then((response) => {
      if (response.ok) {
        // API call was successful
        return response.json();
      } else {
        // API call returned an error
        throw new Error("API request failed");
      }
    })
    .then((data) => {
      // Handle the API response data
      console.log(data);
    })
    .catch((error) => {
      // Handle any error that occurred during the API call
      console.error(error);
    })
    console.log(navigate);
  // .then(response=>response.json())
  // .then(data =>{
  //   console.log(data);
  // })
  // .catch(error =>{
  // console.error(error);
  // })

  return (
    <section className="App">
      <div className="logoContent">
        <img
          src={logo}
          alt="Edu_cate"
        />
      </div>
      <div className="contentBox">
        <form
          className="formBox"
          onSubmit={handleSubmit}
        >
          <h1>Create an account</h1>
          <p>Let's get you started</p>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <div className="link-btn-wrapper">
            {/* <Link to={`/signup-2`}> */}
            <button>Sign Up</button>
            {/* </Link> */}
          </div>
          <span className="spanOr">or</span>
          <a
            href="#"
            className="google-btn"
          >
            {/* <div>
              <img
                className="google-icon"
                src={google}
                style={{ width: "20px" }}
                alt="Google"
              />
            </div> */}
            <GAuthButton />
          </a>
          <span
            className="SignIn"
            style={{ marginTop: "10px", fontSize: "10px" }}
          >
            Already have an account?
            <a
              href="#"
              style={{ color: "orangered", textDecoration: "none" }}
            >
              Sign In
            </a>
          </span>
        </form>
      </div>
      <div className="imgBox">
        <div className="BannerText">
          <h1 style={{ color: "white" }}>
            Welcome to
            <span style={{ color: "orangered" }}> Educate</span>
          </h1>
          <p>Sign up to find the best courses according to your preferences</p>
        </div>
        <img
          src={RegisterImg}
          alt=""
        />
      </div>
    </section>
  );
}
