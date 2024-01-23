import {
  MdOutlineSpaceDashboard,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";

export const SideNavbar = () => {
  return (
    <div >
        <div className="p-6 w-1/2 h-screen bg-[#4F46E5] z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-white pb-4 w-full">
              Food-delivery
            </h1>
            <div className="my-4 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSpaceDashboard className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Dashbord
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <CgProfile className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Voiting
                </h3>
              </div>

              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <BiMessageSquareDots className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Messages
                </h3>
              </div>

              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Settings
                </h3>
              </div>

              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-white group-hover:text-white " />
                <h3 className="text-base text-white group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
