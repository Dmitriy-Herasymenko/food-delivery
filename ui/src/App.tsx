import { RouterProvider } from "react-router-dom"; 
import { routes } from "./app/routes";

export const App = () => {


  return <RouterProvider router={routes} />;
};
