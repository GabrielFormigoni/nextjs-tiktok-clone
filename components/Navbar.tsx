import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import logo from "../utils/logo.png";
import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { userProfile, addUser, removeUser }: { userProfile: any, addUser: any, removeUser: any } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={logo}
            alt="Logo"
            layout="responsive"
          ></Image>
        </div>
      </Link>

      <div>Search</div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="flex px-2 md:px-4 border-2 items-center gap-2 text-md font-semibold">
                <IoMdAdd className="text-xl" />
                <span className="hidden lg:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <Image
                  width={40}
                  height={40}
                  src={userProfile.image}
                  className="rounded-full cursor-pointer"
                  alt="profile-pic"
                />
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Erro!")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
