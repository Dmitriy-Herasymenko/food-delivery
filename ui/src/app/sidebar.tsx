import {
  MdOutlineSpaceDashboard,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiMessageSquareDots } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  className?: string; 
}


export const SideNavbar: React.FC<SidebarProps>  = ({ className }) => {
  const navigate = useNavigate();
  const { unreadMessages } = useSelector((state) => state?.messagesReducer);

  return (
    <div className={`your-existing-styles ${className} `}>
        <div className="p-6 w-1/2 h-screen bg-[#2a3447] border-r-[1px] border-r-[#333f55]  z-20 fixed top-0 -left-96 lg:left-0 lg:w-52  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-white pb-4 w-full">
              Food-delivery
            </h1>
            <div className="my-4 pb-4" >
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#4338CA] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" onClick={() => navigate("/dashboard")}>
                <MdOutlineSpaceDashboard className="text-[14px] text-[#7c8fad] " />
                <h3 className="text-[14px] text-[#7c8fad]">
                  Dashbord
                </h3>
              </div>
              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#4338CA] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" onClick={() => navigate("/voiting")}>
                <CgProfile className="text-[14px] text-[#7c8fad] " />
                <h3 className="text-[14px] text-[#7c8fad] ">
                  Voiting
                </h3>
              </div>

              <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#4338CA] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" onClick={() => navigate("/messages")}>
                <BiMessageSquareDots className="text-[14px] text-[#7c8fad]" />
                <h3 className="text-[14px] text-[#7c8fad]">
                  Messages
                </h3>
                {unreadMessages > 0 ? <div className="text-[12px] text-white text-center bg-[#49beff] h-5 w-6 rounded-full ">{unreadMessages}</div> : ''}
              </div>

              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#4338CA] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" onClick={() => navigate("/dashboard")}>
                <MdOutlineSettings className="text-[14px] text-[#7c8fad] " />
                <h3 className="text-[14px] text-[#7c8fad] ">
                  Settings
                </h3>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
