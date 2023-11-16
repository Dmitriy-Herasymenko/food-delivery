import { createBrowserRouter } from "react-router-dom";
import { LogIn, Registration } from "../pages"

export const router = createBrowserRouter([
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
  ]);