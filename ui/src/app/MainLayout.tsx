
import { ReactNode } from 'react';
import { Header } from '../app/header';
import { SideNavbar } from '../app/sidebar';


interface MainLayoutProps {
    children: ReactNode;
  }
  

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <SideNavbar />
      <main className='flex-1 flex justify-center items-center p-4'>{children}</main>
    </div>
  );
};
