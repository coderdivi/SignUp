import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
} from "react-router-dom";
import './index.css';

import { router } from './routes/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

console.log('REACTAPP_CLIENTID: ', process.env.REACT_APP_CLIENT_ID)
const clientId = process.env.REACT_APP_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
