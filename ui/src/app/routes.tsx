import { createBrowserRouter } from "react-router-dom";
import { LogIn, Registration, Voiting, NotFound } from "../pages";
import { MainLayout } from "./MainLayout";

export const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LogIn />,
      },
      {
        path: "/logIn",
        element: <LogIn />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/voiting",
        element: <Voiting />,
      },
      {
        path: "/dashboard",
        element: <NotFound />,
      },
    ],
  },
]);
