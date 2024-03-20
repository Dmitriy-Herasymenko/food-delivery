import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from '../app/header';
import { SideNavbar } from '../app/sidebar';
import { useSelector } from 'react-redux';

export const MainLayout = () => {
  // const [token, setToken] = useState(localStorage.getItem('token'));
  // const { state } = useSelector(
  //   (state: any) => console.log("state")
  // );

  useSelector((state: any) => console.log("state", state))
  // useEffect(() => {
  //   // Функція для оновлення токену
  //   const updateToken = () => {
  //     setToken(localStorage.getItem('token'));
  //   };

  //   // Додавання слухача подій для зміни токену
  //   window.addEventListener('storage', updateToken);

  //   // Прибирання слухача подій при виході з компонента
  //   return () => {
  //     window.removeEventListener('storage', updateToken);
  //   };
  // }, []); 

  // useEffect(() => {
  //   // Оновлення токену при зміні localStorage
  //   setToken(localStorage.getItem('token'));
  // }, [localStorage.getItem('token')]); // Відслідковуємо зміну localStorage

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
