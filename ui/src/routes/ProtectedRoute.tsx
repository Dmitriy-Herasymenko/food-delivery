import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useEffect, useState } from "react";
import { Header } from "../app/header";
import { SideNavbar } from "../app/sidebar";
import { useDispatch } from "react-redux";
import { getUser } from "../store/reducers/user/action";

export const ProtectedRoute = () => {
  const dispatch = useDispatch();

    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        if (id) {
          dispatch(getUser(id));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();


const { token } = useAuth();


if (!token) {
  return <Navigate to="/login" />;
}

  return (
    <div className="flex flex-col md:flex-row">
      <SideNavbar className="md:flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};но 
