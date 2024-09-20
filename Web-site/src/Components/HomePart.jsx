import React, { useEffect } from "react";
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
      // const updatedCart = [...AddtoCard, { ...data, quantity: 1 }];
      // setAddtoCard(updatedCart);
      // localStorage.setItem("AddtoCard", JSON.stringify(updatedCart));
    } else {
      alert(`This Item is Alreay Added to your card..!!`);
    }
  };

  // useEffect(() => {
  //   const data = localStorage.getItem("AddtoCard");
  //   if (data) {
  //     setAddtoCard(JSON.parse(data));
  //   }
  // }, []);

  const Card = (data) => (
    <main className="mx-auto my-5 min-w-[300px] max-w-sm p-4 text-center md:max-w-4xl">
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
        className="disabled mx-auto my-5 max-w-md cursor-pointer overscroll-auto rounded-xl bg-white p-12 shadow-md hover:overscroll-contain md:max-w-4xl"
      >
        <div className="md:flex">
          <div className="flex justify-center md:shrink-0 md:justify-start lg:h-48 lg:w-60">
            <img
              className="h-64 w-48 object-fill md:h-64 md:w-48 lg:h-64 lg:w-48 xl:h-64 xl:w-48 2xl:h-64 2xl:w-48"
              src={data.image}
              alt="Online Shoping"
            />
          </div>
          <div className="flex flex-col justify-between p-4">
            <div className="text-2xl font-semibold uppercase text-indigo-500">
              {data.category}
            </div>
            <div className="block cursor-pointer text-xl font-bold text-black hover:underline">
              {data.title}
            </div>
            <div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="text-blue mt-2 text-lg font-semibold tracking-wide text-slate-600"
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

            <div className="mt-3 flex text-center md:text-left">
              <button
                onClick={(e) => {
                  handleAddToCart(data);
                  e.stopPropagation();
                  navigate("addtocart");
                }}
                className="h-10 w-40 rounded-md bg-indigo-500 p-2 uppercase text-white transition duration-300 hover:bg-blue-600"
              >
                Add To Cart
              </button>
              {/* {isAuthenticated ? ( */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("PaymentPage");
                  setpaymentItem([data]);
                }}
                className="mx-3 h-10 rounded-md bg-green-600 p-2 uppercase text-white transition duration-300 hover:bg-blue-600"
              >
                Buy Now
              </button>
              {/* ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    loginWithRedirect();
                  }}
                  className="mx-3 my-2 rounded-md bg-green-600 p-1 uppercase text-white transition duration-300 hover:bg-blue-600"
                >
                  Buy Now
                </button>
              )} */}
            </div>
          </div>
          <div className="flex-col place-content-center text-center text-[20px] md:flex-col md:place-content-start lg:place-content-start">
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
    </main>
  );

  return (
    <>
      <NavBar />
      <div className="flex w-auto flex-wrap justify-center">
        {AllProduct.map((data) => Card(data))}
      </div>
      <Footer />
    </>
  );
}

export default HomePart;
