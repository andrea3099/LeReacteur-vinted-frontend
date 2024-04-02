import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_URL);
const Payment = ({ token }) => {
  const location = useLocation();
  const { data } = location.state;
  const options = {
    mode: "payment",
    amount: Number((data.product_price * 100).toFixed(0)),
    currency: "eur",
  };
  return token ? (
    <div className="payment-body">
      <div className="payment-container">
        <div className="payment-card total-details">
          <div className="payment-title">Résumé de la commande</div>
          <div className="payment-content">
            <div>
              <span>Commande </span>
              <span>{data.product_price} €</span>
            </div>
            <div>
              <span>Frais protection acheteurs</span>
              <span>0,59 €</span>
            </div>
            <div>
              <span>Frais de port</span>
              <span>1,18 €</span>
            </div>
          </div>
          <div className="payment-content">
            <div className="total-payment">
              <span>Total</span>
              <span>{data.product_price + 1.18 + 0.59}</span>
            </div>
          </div>
        </div>
        <div className="payment-card">
          <div className="payment-content">
            Il ne vous reste plus qu'un étape pour vous offrir
            <span> {data.product_name}</span> Vous allez payer
            <span> {data.product_price} €</span> (frais de protection et frais
            de port inclus).
          </div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              title={data.product_name}
              price={data.product_price}
            />
          </Elements>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
