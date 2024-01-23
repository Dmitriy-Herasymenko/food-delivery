import { createBrowserRouter } from "react-router-dom";
import { LogIn, Registration, Voiting } from "../pages";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />
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