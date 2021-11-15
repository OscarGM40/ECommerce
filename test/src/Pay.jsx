import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useHistory } from 'react-router-dom'

import React, { useEffect, useState } from "react";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    console.log(token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        history.push("/success");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [ stripeToken,history ]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing.Please,wait...</span>
      ) : (
        <StripeCheckout
          name="Oscar Shop"
          image="https://avatars.githubusercontent.com/u/1486366?v=4"
          billingAddress
          shippingAddress
          description="your total is 20€"
          amount={2000}
          token={onToken}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        >
          <button
            style={{
              border: "none",
              width: "120px",
              borderRadius: "5px",
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
