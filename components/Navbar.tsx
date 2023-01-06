import React, { useState, useEffect } from "react";
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
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if(searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

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

      <div className="relative hidden md:block">
        <form
          className="absolute md:static top-10 left-20 bg-white"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search accounts and video'
            className="w-[300px] md:w-[350px] rounded-full md:top-0 p-3 font-medium md:text-md border-2 border-gray-100 focus:border-2 focus:border-gray-300 focus:outline-none bg-primary"
          />
          <button 
            className="absolute right-6 md:right-5 top-4 border-l-2 border-gray-300 pl-4 text-2xl"
            onClick={handleSearch}
          >
            <BiSearch />
          </button>
        </form>
      </div>

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
