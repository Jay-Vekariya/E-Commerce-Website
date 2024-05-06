import React from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import CartButton from "./CartButton";
import Footer from "./Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AddToCart() {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const {
    AddtoCard,
    setAddtoCard,
    setNotification,
    isNotification,
    setCompareItems,
    paymentItem,
    setpaymentItem,
  } = useAuth();

  const hadleDeleteItem = (id) => {
    console.log("Item Deleted...");
    setAddtoCard((listofcard) =>
      listofcard.filter((deletedItem) => deletedItem.id !== id),
    );
  };

  const listofdata = (listofcard) => (
    <>
      <li
        onClick={console.log(listofcard.id)}
        className="mx-auto my-4  max-w-md overflow-hidden rounded-xl bg-white shadow-2xl md:max-w-4xl "
      >
        <div className="md:flex ">
          <div className="shrink-1 grid place-content-center md:shrink-0 lg:h-48 lg:w-60">
            <img
              className="h-64 w-48 object-fill md:h-64 md:w-48 lg:h-64 lg:w-48 xl:h-64 xl:w-48 2xl:h-64 2xl:w-48"
              src={listofcard.image}
              alt="Online Shoping"
            />
          </div>
          <div className="p-4">
            <div className="text-2xl font-semibold uppercase text-indigo-500">
              {listofcard.category}
            </div>
            <div className=" block text-xl font-bold text-black hover:underline">
              {listofcard.title}
            </div>
            <div className="text-blue my-4 text-lg font-semibold tracking-wide text-slate-600">
              {listofcard.description}
            </div>
            <div className="flex place-content-center font-serif">
              <CartButton listofcard={listofcard} />
            </div>
            <div className="mt-6 flex place-content-center space-x-5 font-serif text-[20px]">
              <div>Quantity: {listofcard.quantity}</div>
              <div
                onClick={() => {
                  hadleDeleteItem(listofcard.id);
                  setNotification(Number(isNotification - 1));
                  setCompareItems([]);
                }}
                className="cursor-pointer rounded-xl border bg-red-500 p-1"
              >
                Delete
              </div>
              {isAuthenticated ? (
                <button
                  className="cursor-pointer rounded-xl border bg-green-600 p-1.5"
                  onClick={() => {
                    // setpaymentItem([...paymentItem, listofcard]);
                    setpaymentItem([listofcard]);
                    console.log(paymentItem);
                    navigate("PaymentPage");
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  className="cursor-pointer rounded-xl border bg-green-600 p-1.5"
                  onClick={() => {
                    loginWithRedirect();
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
          <div className="flex place-content-center pb-4 md:flex-col md:place-content-start lg:place-content-start">
            <button className="mb-0 object-right-top text-green-700  md:mt-5 md:p-5">
              &#x20B9;{(listofcard.price * 20 * listofcard.quantity).toFixed(2)}
            </button>
            <div className="mx-5 text-yellow-500">
              Rating:{listofcard.rating.rate}&#11088;
            </div>
            <div className="mx-5 text-black md:mt-2">
              Count:{listofcard.rating.count}
            </div>
          </div>
        </div>
      </li>
    </>
  );

  return (
    <>
      <NavBar />
      {isNotification === 0 ? (
        <div className="h-screen cursor-pointer py-32 text-center text-4xl  font-semibold hover:underline">
          <NavLink to={"/"}>Add to your first product..!!</NavLink>
        </div>
      ) : (
        <div className="h-screen overflow-scroll">
          <ul>{AddtoCard.map((listofcard) => listofdata(listofcard))}</ul>
        </div>
      )}
      <Footer />
    </>
  );
}
