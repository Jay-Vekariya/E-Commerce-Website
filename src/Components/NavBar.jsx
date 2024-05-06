import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { searchCard, ResetState, isNotification, Logindata } = useAuth();
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const [toggleButton, setToggleButton] = useState(false);

  const handleToggle = () => {
    setToggleButton(!toggleButton);
  };

  // console.log("NEVBAR2" + Logindata);

  return (
    <>
      <nav className="w-full items-center overflow-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white md:justify-between">
        <ul className="lg:flex lg:justify-between">
          <div className="flex list-none justify-between space-x-4 p-3 md:px-20">
            <li className="cursor-pointer rounded-lg px-3 py-2 font-serif text-[25px] font-bold text-black hover:bg-slate-100  hover:text-slate-900">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="flex">
              <select
                onChange={(e) => {
                  searchCard(e.target.value);
                }}
                className="mx-2 w-[250px] cursor-pointer rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 px-3 py-2 font-bold  text-black hover:bg-slate-100 hover:text-slate-900"
              >
                <option className="text-center">SORT BY</option>
                <option>MEN'S CLOTHING</option>
                <option>WOMEN'S CLOTHING</option>
                <option>ELECTRONICS</option>
                <option>JEWELERY</option>
              </select>
              <button className="text-2xl" onClick={ResetState} title="Reset items">
                ⟲
              </button>
            </li>
            {!toggleButton && isAuthenticated && (
              <p className="pt-2">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="mx-3 h-9 w-9 cursor-pointer rounded-full md:rounded-full"
                />
              </p>
            )}
            <p
              onClick={handleToggle}
              className="cursor-pointer place-content-center text-[30px] lg:hidden"
            >
              &#9776;
            </p>
          </div>
          <li
            className={`lg:flex ${
              toggleButton ? "block" : "hidden"
            } absolute left-0 top-[64px] flex w-full flex-col items-center gap-4 space-x-14 bg-opacity-30 py-2 pr-5 text-lg text-black shadow-lg backdrop-blur-sm backdrop-filter max-lg:bg-[#FFFFFF0] sm:flex-col sm:items-center sm:justify-center sm:px-10 md:flex-col md:items-center md:justify-center lg:static lg:w-auto lg:flex-row lg:justify-between lg:space-x-14 `}
          >
            <input
              type="text"
              placeholder="Search here...!!"
              onChange={(e) => searchCard(e.target.value)}
              className="mt-4 w-64 rounded-lg border-2 border-purple-700 py-1 text-center font-serif text-[23px] text-black transition-all duration-300 focus:outline-none focus:ring focus:ring-purple-400 sm:w-64"
            />
            <button className="text-[30px] text-lg" title="Add to card">
              <NavLink to="/addtocart">
                &#128722;
                {isNotification > 0 ? (
                  <sup className="rounded-full bg-red-600 p-1 text-sm text-white">
                    {isNotification}
                  </sup>
                ) : (
                  ""
                )}
              </NavLink>
            </button>
            {isAuthenticated && (
              <div className="flex">
                <p className="place-content-center font-serif uppercase">
                  {user.name}
                </p>
                <img
                  src={user.picture}
                  alt={user.name}
                  className="mx-3 h-9 w-9 cursor-pointer rounded-full md:rounded-full"
                />
              </div>
            )}
            {isAuthenticated ? (
              <button
                className="rounded-lg bg-red-600 p-1.5 hover:bg-yellow-400"
                onClick={() => {
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });
                }}
              >
                Log Out
              </button>
            ) : (
              <div>
                <button
                  className="w-40 rounded-lg bg-blue-700 p-2 font-mono text-[23px] text-white hover:bg-green-700"
                  onClick={() => {
                    loginWithRedirect();
                  }}
                >
                  Log In
                </button>
              </div>
            )}
          </li>
          {/* <div className="p-4">
          </div> */}
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
