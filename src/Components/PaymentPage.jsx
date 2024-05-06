import React from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();
  const { paymentItem } = useAuth();

  return (
    <>
      <NavBar />
      <div className="grid place-content-center overflow-scroll">
        <div className="mx-auto mt-3 max-w-md overflow-hidden rounded-xl  bg-slate-800 p-4 text-center text-4xl text-white shadow-md md:max-w-2xl">
          <span>Checkout</span>
        </div>
        <p className="mx-4 text-2xl font-semibold text-yellow-600">
          1. Select a delivery address
        </p>
        <div className="w-92 m-5 box-border h-64 w-[700px] overscroll-none border-4 p-4">
          <p className="text-xl font-semibold">Your Addresses</p>
          <a href="www.google.com" className="text-blue-500">
            Sending items to more than one address?
          </a>
          <form>
            <textarea
              className="border"
              rows="4"
              cols="50"
              placeholder="Please Provide a Proper Address to delevered your item. & we contect with you.."
            ></textarea>
          </form>
          <button className="m-3 rounded-lg bg-yellow-300 p-1 font-semibold hover:bg-yellow-400">
            Use this address
          </button>
        </div>

        <div>
          <p className="mx-4 text-2xl font-semibold text-yellow-600">
            2. Payment Method
          </p>
          <div className="w-92 m-5 box-border h-64 w-[700px] overscroll-none border-4 p-4">
            <div className="flex">
              <p className="font-semibold">Apply coupon code :</p>
              <p>
                <input
                  type="text"
                  className="mx-4  border"
                  placeholder="Enter Cupan code"
                />
              </p>
              <button className="rounded-lg border bg-blue-700 p-1 text-white hover:bg-green-500">
                Apply
              </button>
            </div>

            <div className="mt-5">
              <label className="font-semibold">Select Payment Option :</label>
              <select className="mx-2">
                <option>Choose One</option>
                <option>Case on Delivery</option>
                <option>UPI Payment</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <p className="mx-4 text-2xl font-semibold text-yellow-600">
            3. Final Payment
          </p>
          <div className="w-92 m-5 box-border h-full w-[700px] overscroll-none border-4 p-4">
            <div className="mt-6">
              {paymentItem.map((FinalItem) => (
                <>
                  <div className="flex">
                    <div className="md:flex">
                      <div className="shrink-1 flex place-content-center md:shrink-0">
                        <img
                          className="h-[300px] object-fill md:h-64 md:w-48 lg:h-64 lg:w-48 xl:h-64 xl:w-48 2xl:h-64 2xl:w-48"
                          src={FinalItem.image}
                          alt="Online Shooping"
                        />
                      </div>
                      <div className="p-8">
                        <div className="text-2xl font-semibold uppercase text-indigo-500">
                          {FinalItem.category}
                        </div>
                        <div className="block cursor-pointer text-xl font-bold text-black hover:underline">
                          {FinalItem.title}
                        </div>
                        <div className="text-blue mt-2 text-lg font-bold tracking-wide text-slate-600">
                          {FinalItem.description}
                        </div>
                        <button className="mt-5 rounded-lg bg-green-600 p-3 font-serif text-[25px] text-white">
                          Price &#x20B9;{FinalItem.price}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-3xl font-bold">
                    Total Amount: &#x20B9;{FinalItem.price}
                  </div>
                </>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={() => navigate("fororder")}
                className="mt-5 rounded-lg bg-yellow-400 p-2 text-center font-serif text-[25px] font-bold"
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentPage;
