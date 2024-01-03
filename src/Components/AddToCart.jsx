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
          <div className="p-12 md:shrink-0">
            <img
              className="grid h-56 w-full grid-cols-3 place-items-center gap-4 object-cover md:h-48 md:w-48"
              src={listofcard.image}
              alt="Online Shoping"
            />
          </div>
          <div className="p-8">
            <div className="font-semibold uppercase text-indigo-500">
              {listofcard.category}
            </div>
            <div className=" block text-lg font-bold text-black hover:underline">
              {listofcard.title}
            </div>
            <div className="text-blue mt-2 text-sm font-semibold tracking-wide text-slate-600">
              {listofcard.description}
            </div>
            <div className="my-5">
              <CartButton listofcard={listofcard} />
              <div className="my-5 flex space-x-5">
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
                      // setpaymentItem([...paymentItem, listofcard]);
                      loginWithRedirect();
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <button className="mb-0 mt-5 object-right-top  p-5 text-green-700">
              &#x20B9;
              {Number(listofcard.price * 20 * listofcard.quantity).toFixed(2)}
            </button>
            <div className="mx-5 text-yellow-500">
              Rating:{listofcard.rating?.rate}&#11088;
            </div>
            <div className="mx-5 mt-2 text-black">
              Count:{listofcard.rating?.count}
            </div>
          </div>
          <div
            onClick={() => {
              hadleDeleteItem(listofcard.id);
              setNotification(Number(isNotification - 1));
              setCompareItems([]);
            }}
            className="cursor-pointer p-4"
          >
            &#9940;
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
