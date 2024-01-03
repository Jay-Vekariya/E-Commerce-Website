import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  // const history = useHistory();
  const { searchCard, ResetState, isNotification, Logindata } = useAuth();
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const PostData = async (e) => {
    e.preventDefault();

    const {
      given_name,
      family_name,
      nickname,
      name,
      picture,
      locale,
      updated_at,
      email,
      email_verified,
      sub,
    } = Logindata;

    const res = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        given_name,
        family_name,
        nickname,
        name,
        picture,
        locale,
        updated_at,
        email,
        email_verified,
        sub,
      }),
    });

    const data = await res.JSON();

    if (data.status === 422 || !data) {
      window.alert("Invalid Operations");
      console.log("Invalid Operations");
    } else {
      window.alert("Opreations Completed...");
      console.log("Successfull Operations");

      // history.push("/");
    }
  };
  console.log("NEVBAR2" + Logindata);
  return (
    <>
      <nav>
        <ul className="flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white md:justify-between">
          <div className="flex list-none space-x-4 p-3 md:px-20 ">
            <li className="cursor-pointer rounded-lg px-3 py-2 text-black hover:bg-slate-100  hover:text-slate-900">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="cursor-pointer rounded-lg px-3 py-2 text-black hover:bg-slate-100 hover:text-slate-900">
              <NavLink to="selectedcard">Card Details</NavLink>
            </li>
            <li>
              <select
                onChange={(e) => {
                  searchCard(e.target.value);
                }}
                className="text-semibold mx-2 cursor-pointer rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 px-3 py-2  text-black hover:bg-slate-100 hover:text-slate-900"
              >
                <option>Sort by</option>
                <option>MEN'S CLOTHING</option>
                <option>WOMEN'S CLOTHING</option>
                <option>ELECTRONICS</option>
                <option>JEWELERY</option>
              </select>
            </li>
            <button className="text-2xl" onClick={ResetState}>
              ⟲
            </button>
          </div>

          <li className="flex items-center space-x-14 pr-5 sm:px-10 lg:space-x-14 ">
            <input
              type="text"
              placeholder="Search here.."
              onChange={(e) => searchCard(e.target.value)}
              className="duration-400 w-28 rounded-lg py-1 text-center text-black transition-all focus:outline-none focus:ring focus:ring-blue-600 sm:w-64  "
            />
            <button className="text-lg">
              <NavLink to="/addtocart">
                &#128722;
                {isNotification > 0 ? (
                  <sup className="rounded-full bg-red-600 p-0.5 text-sm">
                    {isNotification}
                  </sup>
                ) : (
                  ""
                )}
              </NavLink>
            </button>
            {/* <img
              src="https://m.timesofindia.com/photo/85301692/85301692.jpg"
              alt="idImage"
              className="h-9 w-9 cursor-pointer rounded-full md:rounded-full"
            /> */}
            {isAuthenticated && (
              <div className="flex">
                <p>{user.name}</p>
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
                  // PostData();
                }}
              >
                Log Out
              </button>
            ) : (
              <div>
                <button
                  className="rounded-lg bg-blue-600 p-1.5 hover:bg-green-700"
                  onClick={() => {
                    loginWithRedirect();
                    // PostData();
                  }}
                >
                  Log In
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
