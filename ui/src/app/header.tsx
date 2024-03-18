import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {  Link } from 'react-router-dom';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const userName = localStorage.getItem("userName");

  return (
    <header className="bg-white shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            {mobileMenuOpen && (
              <div className="absolute top-0 right-0 transform translate-x-2/3 -translate-y-1/3 bg-red-500 w-2 h-2 rounded-full animate-ping"></div>
            )}
          </button>
        </div>

        <div
          className="hidden lg:flex lg:flex-1 lg:justify-end items-center"
        >
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            {userName}
          </a>
          <img
            id="avatarButton"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="inline-block h-8 w-8 rounded-full ring-2 ml-2.5 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </nav>

      {/* Всплывающее окно */}
      {isOpenMenu && (
        <div
          id="userDropdown"
          className=" absolute right-10 bg-[#4F46E5] divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <Link
              to="/login"
              onClick={() => {
                localStorage.removeItem('token')
                setIsOpenMenu(!isOpenMenu)
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
