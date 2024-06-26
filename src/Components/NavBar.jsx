import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { HiOutlineHome, HiOutlineFunnel } from "react-icons/hi2";

function NavBar() {
  const { searchCard, ResetState, isNotification } = useAuth();
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const [toggleButton, setToggleButton] = useState(false);

  const handleToggle = () => {
    setToggleButton(!toggleButton);
  };

  return (
    <nav className="flex w-full flex-row justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="flex w-auto flex-row items-center justify-between space-x-4 p-3 md:px-20">
        <li className="list-none">
          <NavLink
            to="/"
            className="flex items-center gap-x-1 rounded-lg py-2 font-serif text-2xl font-bold text-black hover:bg-slate-100 hover:text-slate-900"
          >
            <HiOutlineHome />
            Home
          </NavLink>
        </li>
        <li className="flex list-none items-center">
          <select
            onChange={(e) => {
              searchCard(e.target.value);
            }}
            className="selection: w-[250px] cursor-pointer scroll-smooth rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 px-3 py-2 font-bold text-black hover:bg-slate-100 hover:text-slate-900"
          >
            <option className="flex text-center">SORT BY</option>
            <option>MEN'S CLOTHING</option>
            <option>WOMEN'S CLOTHING</option>
            <option>ELECTRONICS</option>
            <option>JEWELERY</option>
          </select>
        </li>
        <li className=" list-none">
          <button className="text-2xl" onClick={ResetState} title="Reset items">
            ⟲
          </button>
        </li>
        <li className="flex items-center space-x-4">
          {!toggleButton && isAuthenticated && (
            <img
              src={user.picture}
              alt={user.name}
              className="h-9 w-9 cursor-pointer rounded-full lg:hidden"
            />
          )}
        </li>
        <li className="list-none">
          <button onClick={handleToggle} className="text-3xl lg:hidden">
            &#9776;
          </button>
        </li>
      </div>
      <ul
        className={`${
          toggleButton ? "block" : "hidden"
        } bg-blur-xl absolute left-0 top-[64px] w-full flex-col  items-center   p-3 py-2 text-center text-black shadow-lg max-lg:bg-[#FFFFFF45]  md:px-20 lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:space-x-14`}
      >
        <li className="mt-4 lg:mt-0">
          <input
            type="text"
            placeholder="Search here...!!"
            onChange={(e) => searchCard(e.target.value)}
            className="w-64 rounded-lg border-2 border-purple-700 py-1 text-center font-serif text-lg text-black transition-all duration-300 focus:outline-none focus:ring focus:ring-purple-400"
          />
        </li>
        <li>
          <NavLink to="/addtocart" className="relative text-3xl">
            &#128722;
            {isNotification > 0 && (
              <sup className="absolute -right-3 -top-1 rounded-full bg-red-600 p-1 text-sm text-white">
                {isNotification}
              </sup>
            )}
          </NavLink>
        </li>
        {isAuthenticated && (
          <li className="flex justify-center space-x-3">
            <p className="font-serif uppercase">{user.name}</p>
            <img
              src={user.picture}
              alt={user.name}
              className="h-9 w-9 cursor-pointer rounded-full"
            />
          </li>
        )}
        {isAuthenticated ? (
          <li>
            <button
              className="rounded-lg bg-red-600 p-1.5  hover:bg-yellow-400 md:w-20 lg:w-20 xl:w-20 2xl:w-20"
              onClick={() => {
                logout({
                  logoutParams: { returnTo: window.location.origin },
                });
              }}
            >
              Log Out
            </button>
          </li>
        ) : (
          <li>
            <button
              className="w-40 rounded-lg bg-blue-700 p-2 font-mono text-lg text-white hover:bg-green-700"
              onClick={() => {
                loginWithRedirect();
              }}
            >
              Log In
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
