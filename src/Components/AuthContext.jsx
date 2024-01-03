import React, { useState, useEffect, createContext, useContext } from "react";

//Context API
const PostContext = createContext();
const useAuth = () => useContext(PostContext);

function AuthContext({ children }) {
  const [AllProduct, setAllProduct] = useState([]);
  const [searchValue, setSearchValue] = useState([]);
  const [AddtoCard, setAddtoCard] = useState([]);
  const [cardDetail, setCardDetail] = useState([]);
  const [CompareItems, setCompareItems] = useState([]);
  const [isNotification, setNotification] = useState(0);
  const [paymentItem, setpaymentItem] = useState([]);
  const [Logindata, setLoginData] = useState("");
  // const [email, setEmail] = useState("");

  // const handleOnSubmit = async (e) => {
  //   e.preventDefault();
  //   let result = await fetch("http://127.0.0.1:3000/AuthContext", {
  //     method: "post",
  //     body: JSON.stringify({ Logindata, email }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result = await result.json();
  //   console.log(result);
  // };

  function datafecting() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setAllProduct(data))
      .catch((error) => setAllProduct("Action Unkhown"));
  }
  // console.log("USING USESsTATE" + Logindata);

  useEffect(() => {
    datafecting();
  }, []);

  const searchCard = (searchValue) => {
    const filteredValue = AllProduct.filter((search) => {
      return `${search.title.toLowerCase()} ${search.category.toLowerCase()}`.includes(
        searchValue.toLowerCase(),
      );
    });
    setSearchValue(filteredValue);
    console.log("filteredValue", filteredValue);
  };

  const ResetState = () => {
    setSearchValue([]);
  };

  return (
    <>
      <PostContext.Provider
        value={{
          AllProduct: searchValue.length > 0 ? searchValue : AllProduct,
          AddtoCard,
          setAddtoCard,
          setAllProduct,
          cardDetail,
          setCardDetail,
          searchCard,
          ResetState,
          isNotification,
          setNotification,
          CompareItems,
          setCompareItems,
          paymentItem,
          setpaymentItem,
          setLoginData,
          Logindata,
          // setEmail,
          // handleOnSubmit,
        }}
      >
        {children}
      </PostContext.Provider>
    </>
  );
}

export { useAuth, AuthContext };
