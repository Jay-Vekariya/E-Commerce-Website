import React from "react";
import { useAuth } from "./AuthContext";

function CartButton({ listofcard }) {
  const {
    AddtoCard,
    setAddtoCard,
    setNotification,
    isNotification,
    setCompareItems,
  } = useAuth();

  const hadleDeleteItem = (id) => {
    console.log("Item Deleted...");
    setAddtoCard((listofcard) =>
      listofcard.filter((deletedItem) => deletedItem.id !== id),
    );
  };

  return (
    <div className="flex">
      <div>
        {listofcard.quantity <= 1 ? (
          <button
            onClick={() => {
              hadleDeleteItem(listofcard.id);
              setNotification(Number(isNotification - 1));
              setCompareItems([]);
            }}
            className="box-border h-7 w-7 cursor-pointer rounded-full border border-none  bg-slate-300 text-black disabled:opacity-75"
          >
            &#x2718;
          </button>
        ) : (
          <button
            className="roundedz-full box-border h-7 w-7 rounded-full border border-none  bg-green-700 text-white"
            onClick={() => {
              let seletedcard = AddtoCard.find(
                (list) => list.id === listofcard.id,
              );
              if (listofcard.quantity <= 1) {
                return;
              }
              console.log(seletedcard);
              seletedcard.quantity = seletedcard.quantity - 1;
              const listvalue = AddtoCard.filter(
                (value) => value.id !== listofcard.id,
              );
              setAddtoCard([...listvalue, seletedcard]);
            }}
          >
            -
          </button>
        )}
      </div>
      <div>
        <input
          type="text"
          value={listofcard.quantity}
          className="w-7 text-center"
          onChange={(e) => Number(e.target.value)}
        />
      </div>
      <div>
        <button
          className="h-7 w-7 rounded-full border-none bg-green-700 text-white"
          onClick={() => {
            let seletedcard = AddtoCard.find(
              (list) => list.id === listofcard.id,
            );
            console.log(seletedcard);
            seletedcard.quantity = seletedcard.quantity + 1;
            const listvalue = AddtoCard.filter(
              (value) => value.id !== listofcard.id,
            );
            setAddtoCard([...listvalue, seletedcard]);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default CartButton;
