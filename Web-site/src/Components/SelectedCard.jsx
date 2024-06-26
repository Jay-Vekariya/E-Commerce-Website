import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import Footer from "./Footer";

function SelectedCard() {
  const { cardDetail } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="overflow-hidden">
        <div className="h-screen max-h-[870px] overflow-scroll">
          <div>
            {cardDetail.map((card) => (
              <div className="mx-auto my-4 mt-32 max-w-md overflow-hidden rounded-xl bg-white py-32 shadow-2xl md:max-w-4xl">
                <div
                  onClick={navigate("/")} 
                  className="cursor-pointer px-5 text-3xl"
                >
                  <NavLink to="/">&crarr;</NavLink>
                </div>
                <div className="md:flex">
                  <div className="p-12 md:shrink-0">
                    <img
                      className="object-fill h-64 w-48 md:h-64 md:w-48 lg:h-64 lg:w-48 xl:h-64 xl:w-48 2xl:h-64 2xl:w-48"
                      src={card.image}
                      alt="shoping-cart"
                    />
                  </div>
                  <div className="p-4 place-content-center">
                    <div className="font-semibold uppercase text-violet-700 text-2xl">
                      {card.category}
                    </div>
                    <div className="block text-xl font-bold text-black hover:underline">
                      {card.title}
                    </div>
                    <div className="text-blue mt-2 text-lg font-semibold tracking-wide text-slate-600">
                      {card.description}
                    </div>
                  </div>
                  <div>
                    <button className="mb-0 mt-14 object-right-top  p-5 text-green-700">
                      &#x20B9;{card.price * 20}
                    </button>
                    <div className="mx-5 text-yellow-500">
                      Rating:{card.rating.rate}&#11088;
                    </div>
                    <div className="mx-5 mt-2 text-black">
                      Count:{card.rating.count}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default SelectedCard;
