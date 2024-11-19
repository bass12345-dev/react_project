import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import DebexMainLayout from "./DebexMainLayout";
import Login from "./auth/Login";
import Signup from "./auth/SignUp";
import Debt from "./pages/Debt";
import Expenses from "./pages/Expenses";
import { GoogleOAuthProvider } from "@react-oauth/google"
const clientId = '621336373431-t4bk00pheghbibij0nab5ovpfuql7i6q.apps.googleusercontent.com';



const router = createBrowserRouter([
  //Auth
    //Login
      {
        path: "/login",
        element: <Login/>,
      },
    //Signup
      {
        path: "/signup",
        element: <Signup/>,
      },
  
  //Main Pages
  {
    path: "/",
    element: <DebexMainLayout/>,
    children: [
      {
        path: "debt",
        element: <Debt />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
    ],
  },
]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </GoogleOAuthProvider>
  );