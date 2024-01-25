import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            {userName}
          </a>
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ml-2.5 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
      </nav>
    </header>
  );
};
