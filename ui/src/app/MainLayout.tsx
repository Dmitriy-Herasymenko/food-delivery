import { Outlet } from "react-router-dom"
import { Header } from '../app/header';
import { SideNavbar } from '../app/sidebar';

export const MainLayout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <SideNavbar className="md:flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:ml-64"><Outlet /></main>
      </div>
    </div>
  );
};
