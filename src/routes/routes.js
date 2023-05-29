import React from "react";
import {createBrowserRouter,} from "react-router-dom";
import SignUp from '../Components/Signup/SignUp';
import UserAccess from '../Components/userSpecify/userAccess';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signup-2",
    element: <UserAccess />,
  },
]);