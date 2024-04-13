import React from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuth0 } from "@auth0/auth0-react";

function HomePart() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const {
    AllProduct,
    AddtoCard,
    setAddtoCard,
    setCardDetail,
    setNotification,
    isNotification,
    CompareItems,
    setCompareItems,
    setpaymentItem,
    setLoginData,
  } = useAuth();

  console.log(AddtoCard);

  const handleAddToCart = (data) => {
    if (!CompareItems.includes(data)) {
      setAddtoCard([...AddtoCard, { ...data, quantity: 1 }]);
      setCompareItems([...CompareItems, data]);
      setNotification(isNotification + 1);
    } else {
      alert(`This Item is Alreay Added to your card..!!`);
    }
  };

 

  const Card = (data) => (
    <>
      {isAuthenticated && (
        <pre>{setLoginData(JSON.stringify(user, null, 2))}</pre>
      )}
      <div
        key={data.id}
        onClick={(e) => {
          e.preventDefault();
          setCardDetail([data]);
          navigate("selectedCard");
        }}
        className="disabled mx-auto my-5 max-w-md cursor-pointer   overscroll-auto rounded-xl bg-white shadow-md hover:overscroll-contain md:max-w-4xl"
      >
        <div className="md:flex">
          <div className="shrink-1 md:shrink-0">
            <img
              className="md:h-42 h-48 w-full object-cover md:w-48"
              src={data.image}
              alt="Online Shoping"
            />
          </div>
          <div className="p-8">
            <div className="font-semibold uppercase text-indigo-500">
              {data.category}
            </div>
            <div className="block cursor-pointer text-lg font-bold text-black hover:underline">
              {data.title}
            </div>
            <div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="text-blue mt-2 text-sm font-semibold tracking-wide text-slate-600"
              >
                <ReactReadMoreReadLess
                  charLimit={100}
                  readMoreText={"Read more ▼"}
                  readLessText={"Read less ▲"}
                  readMoreClassName="text-blue-500"
                  readLessClassName="text-red-500"
                >
                  {data.description}
                </ReactReadMoreReadLess>
              </div>
            </div>

            <div className="text-center md:text-left">
              <button
                onClick={(e) => {
                  handleAddToCart(data);
                  e.stopPropagation();
                  navigate("addtocart");
                }}
                className="my-2 rounded-md bg-indigo-500 p-1 uppercase text-white transition duration-300 hover:bg-blue-600"
              >
                Add To Cart
              </button>
              {isAuthenticated ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("PaymentPage");
                    setpaymentItem([data]);
                  }}
                  className="mx-3 my-2 rounded-md bg-green-600 p-1 uppercase text-white transition duration-300 hover:bg-blue-600"
                >
                  Buy Now
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    loginWithRedirect();
                  }}
                  className="mx-3 my-2 rounded-md bg-green-600 p-1 uppercase text-white transition duration-300 hover:bg-blue-600"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
          <div className="felx flex p-5 md:flex-col">
            <button className="mb-0 object-right-top text-green-700  md:mt-5 md:p-5">
              &#x20B9;{(data.price * 20).toFixed(2)}
            </button>
            <div className="mx-5 text-yellow-500">
              Rating:{data.rating.rate}&#11088;
            </div>
            <div className="mx-5 text-black md:mt-2">
              Count:{data.rating.count}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <NavBar />
      <div className="overflow-auto">
        {AllProduct.map((data) => Card(data))}
      </div>
      <Footer />
    </>
  );
}

export default HomePart;
