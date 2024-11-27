import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import DebexMainLayout from "./DebexMainLayout";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import Debt from "./pages/Debt/Debt";
import Expenses from "./pages/Expenses/Expenses";
import { GoogleOAuthProvider } from "@react-oauth/google"
import ProtectedRoute from "./auth/Protected/ProtectedRoute";
import Is_LoggedIn from "./auth/Protected/Is_LoggedIn";
import Not_LoggedIn from "./auth/Protected/Not_LoggedIn";
import { AccesToken, UserData } from "./utils/LocaStorage";
import Payto from "./pages/PayTo/PayTo";
const clientId = '621336373431-t4bk00pheghbibij0nab5ovpfuql7i6q.apps.googleusercontent.com';


// Function to get the access token from cookies
const getAccessToken = () => {
  return localStorage.getItem(AccesToken) &&  localStorage.getItem(UserData) ;
}

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!getAccessToken();
}



const router = createBrowserRouter([
  //Auth
  //Login

  {
    element: !isAuthenticated() ? <Outlet></Outlet> : <Navigate to="/debt"/>,
    children: [

      {
        path: "/login",
        element: <Login />,
        index: true
      },
      //Signup
      {
        path: "/signup",
        element: <Signup />,
      },

    ]
  },

  //Main Pages

      {
        path: "/",
        element: isAuthenticated() ? <DebexMainLayout /> : <Navigate to="/login"/>,
        children: [
          {
            path: "debt",
            element: <Debt />,
          },
          {
            path: "expenses",
            element: <Expenses />,
          },
          {
            path: "pay_to",
            element: <Payto />,
          },
        ],
      },
  {
    path: '*',
    element: <p>404 Error - Nothing here...</p>
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </GoogleOAuthProvider>
);