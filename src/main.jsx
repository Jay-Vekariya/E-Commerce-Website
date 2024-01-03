import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./Components/AuthContext";
import "./index.css";
import HomePart from "./Components/HomePart";
import AddToCart from "./Components/AddToCart.jsx";
import SelectedCard from "./Components/SelectedCard";
import { Auth0Provider } from "@auth0/auth0-react";
import PaymentPage from "./Components/PaymentPage";
import Fororder from "./Components/Fororder";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-qtx0cvuzkawxwnd3.us.auth0.com"
      clientId="zCWv0SMMYhyzpU3m55TfQxYomukdmVbn"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthContext>
        <Routes>
          <Route path="/" element={<HomePart />} />
          <Route path="/addtocart" element={<AddToCart />} />
          <Route path="/selectedcard" element={<SelectedCard />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
          <Route path="/addtocart/paymentpage" element={<PaymentPage />} />
          <Route path="/PaymentPage/fororder" element={<Fororder />} />
          <Route
            path="/addtocart/PaymentPage/fororder"
            element={<Fororder />}
          />
        </Routes>
      </AuthContext>
    </Auth0Provider>
  </BrowserRouter>,
);
