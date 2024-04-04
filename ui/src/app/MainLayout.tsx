import { Outlet } from "react-router-dom";
import { Header } from '../app/header';
import { SideNavbar } from '../app/sidebar';
import { useDispatch } from 'react-redux';
import { getUser } from "../store/reducers/user/action";

export const MainLayout = () => {

  const dispatch = useDispatch();

    const fetchData = async () => {
      try {
        const id = localStorage.getItem("userId");
        if (id) {
          dispatch(getUser(id));
        } u
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();


  return ( 
      <div className="flex flex-col md:flex-row">
        <SideNavbar className="md:flex-shrink-0" />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 md:ml-64"><Outlet /></main>
        </div>
      </div>
    ) 

};
