import React from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './paymentForm';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    
    const options = {
        clientSecret: `${stripeTestPromise}_secret_${secretKey}`,
    }
    return (
        <Elements stripe={stripeTestPromise} options={options}>
            <PaymentForm/>
        </Elements>
    );
};

export default StripeContainer;