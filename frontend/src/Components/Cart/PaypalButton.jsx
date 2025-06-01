import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "Adv52TmWisQ6so7Af-ZVTNYFGPO9Yxi16Y1I8Fq-B0rXa9BV_CsVBE9zEO_ZXOYHDQboMYdwyEc5na_c" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(), // convert to string as required by PayPal
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order.capture();
            if (onSuccess) {
              onSuccess(details);
            }
          } catch (err) {
            if (onError) {
              onError(err);
            }
          }
        }}
        onError={(err) => {
          if (onError) {
            onError(err);
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
