import React, { useState } from "react";
import { UpdateProfile } from "../../shared/api";
import { getUser } from "../../store/reducers/user/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const UserSettingsPage: React.FC = () => {
  const { user } = useSelector((state: any) => state?.userReducer);
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [img, setImage] = useState<string>();

  const dispatch = useDispatch();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        console.log("Base64 string:", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataRequest = {
      id: user.id,
      userName: name,
      profileImageBase64: img,
    };
    console.log("dataRequser", dataRequest);
    await UpdateProfile(dataRequest);
    await dispatch(getUser(user.id));
  };

  return (
    <div className="p-10 mt-8 border-[1px] border-[#333f55]">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm leading-6 text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="block bg-[#2a3447] mt-2.5 w-full rounded-md border-[#333f55] px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
        </div>
        {/* <div className="mt-2.5">
          <label htmlFor="name" className="block text-sm leading-6 text-white">
            Email
          </label>
          <input
            type="text"
            id="name"
            className="block bg-[#2a3447] mt-2.5 w-full rounded-md border-[#333f55] px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={name}
            onChange={handleChangeName}
          />
        </div>*/}
        <div className="mt-10">
          <label htmlFor="name" className="block text-sm leading-6 text-white">
            Password
          </label>
          <input
            type="text"
            id="name"
            className="block bg-[#2a3447] mt-2.5 w-full rounded-md border-[#333f55] px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
        </div>
        <div className="mt-10">
          <label
            htmlFor="avatar"
            className="block text-sm leading-6 text-white mb-1"
          >
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block bg-[#2a3447] mt-2.5 w-full rounded-md border-[#333f55] px-3.5 py-2 text-[14px] text-[#7c8fad] shadow-sm ring-1 ring-inset ring-[#333f55] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};
