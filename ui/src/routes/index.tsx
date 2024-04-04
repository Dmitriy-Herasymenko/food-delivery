import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import {
  LogIn,
  Logout,
  Voiting,
  ChatListPage,
  MessagesPage,
  NotFound,
  UserSettingsPage,
  Registration,
} from "../pages";
import { MainLayout } from "../app/MainLayout";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/regestration",
      element: <Registration />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <div>User Home Page</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
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
        {
          path: "/settings",
          element: <UserSettingsPage />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LogIn />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
        path: "/regestration",
        element: <Registration />,
      },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
