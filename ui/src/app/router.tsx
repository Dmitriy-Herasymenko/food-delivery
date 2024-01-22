import { createBrowserRouter } from "react-router-dom";
import { LogIn, Registration, Voiting } from "../pages";
import { App } from "../App";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/logIn",
      element: <LogIn />
    },
    {
      path: "/registration",
      element: <Registration />
    },
    {
      path: "/voiting",
      element: <Voiting />
    },
  ]);