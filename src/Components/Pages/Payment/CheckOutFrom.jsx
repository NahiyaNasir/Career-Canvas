import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

import { toast } from "react-hot-toast";

const CheckOutFrom = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/createPaymentIntent", { amount })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [amount, clientSecret]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      alert(error.message);
    } else {
      console.log("success card method", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log(paymentIntent);
      // if (paymentIntent.status === "succeeded") {
      //   toast.success(paymentIntent.id);
      // }
      const res = await axios.post("http://localhost:8000/api/payments", {
        email: user?.email,
        paymentIntentId: paymentIntent.id,
        amount,
        status: "SUCCEEDED",
      });
      // console.log(res);
      if (res.data?.paymentIntentId) {
        toast.success(" now you are a  premium user");
      }
    }
  };
  return (
    <div >
      <form  onSubmit={handleSubmit} className="py-5">
        <div className="text-center  px-2 mt-3 text-2xl md:px-10 lg:px-52">
        <CardElement
        
        options={{
          style: {
            base: {
              backgroundColor:"",
              fontSize: "20px",
              color: "#FFFFFF",
              "::placeholder": {
                color: "#FFFFFF",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
        </div>
       <div className="mt-2">
       <button
        
        type="submit"
        className="  px-4 py-1 bg-gray-200 text-green-500 text-xl font-semibold cursor-pointer rounded  "
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
       </div>
      </form>
    </div>
  );
};

export default CheckOutFrom;