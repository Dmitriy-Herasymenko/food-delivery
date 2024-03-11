import { createBrowserRouter } from "react-router-dom";
import { LogIn, Registration, Voiting, NotFound, ChatListPage, MessagesPage } from "../pages";
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
        path: "/messages",
        element: <ChatListPage />,
      },
      {
        path: "/messages/:id",
        element: <MessagesPage />,
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
