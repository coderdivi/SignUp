import React from "react";
import { useState } from "react";
// import "./userAccess.css";
// import {GoogleLogin} from '@react-oauth/google';
import logo from "../../assets/logo.png";
import RegisterImg from "../../assets/register.png";
import UserEdit from "../../assets/user-edit.png";

export default function UserAccess () {

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [selectedOption, setSelectedOption] = useState('');
  const [continueEnabled, setContinueEnabled] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setContinueEnabled(true);
  };

  const handleContinueClick = () => {
    // Perform the action to navigate to the next page or perform any other logic
    console.log('Continue clicked. Selected option:', selectedOption);
  };
  return (
    //! form content//*
    <section className="App">
      <div className="logoContent">
        <img
          src={logo}
          alt="Edu_cate"
        />
      </div>
      <div id= "accessContent" className="contentBox">
        <form id="accessForm"
          className="formBox"
          onSubmit={handleSubmit}
        >
          <h1>Create an account</h1>
          <p>Please select type of user</p>
          <div className="userType">
            <div>
            <button id="button"   className={selectedOption === 'student' ? 'selected' : ''}
          onClick={() => handleOptionClick('student')}>
                <img
                  src={UserEdit}
                  alt="User"
                />
                Sign up as a Student
            </button>
            </div>
            <div>
            <button id="button"  className={selectedOption === 'Admin' ? 'selected' : ''}
          onClick={() => handleOptionClick('Admin')}>
            <img
                  src={UserEdit}
                  alt="User"
                />
                Sign up as an Admin
            </button>
            </div>
          </div>
          <button onClick={handleContinueClick} disabled={!continueEnabled}>Continue</button>
          <span
            className="SignIn"
            style={{ marginTop: "10px"}}
          >
            Already have an account?
            <a href="#"
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
};
