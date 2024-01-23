import { RouterProvider } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { routes } from "./app/routes";
import { MainLayout } from "./app/MainLayout";

export const App = () => {
  const { token } = useAuth();



  return  token ? <MainLayout><RouterProvider router={routes} /></MainLayout> : <RouterProvider router={routes} />
};
