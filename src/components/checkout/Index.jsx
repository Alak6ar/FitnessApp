import React, { useState } from "react";
import InputField from "../ui/InputField";
import Header from "../Header";
import Button from "../ui/Button";
import { usePaymentMutation } from "../../services/productApi";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { selectTotalAmount } from "../../features/basket/totalAmountSlice";


import { loadStripe } from "@stripe/stripe-js";


const Index = () => {

  const publishableKey = "pk_test_51Qw0pcBybKCJ0YtctQKhPb6sS9JqhPbsbufgmQjyHzFSeplZHtRCqyKkTT8cCnadYo44PCgYRmxAcGzQ8f8vqyP700gQcM3Z5b";
  const stripePromise = loadStripe(publishableKey);

  const token = useSelector(selectCurrentToken);
  const totalAmount = useSelector(selectTotalAmount)
  const [payment, { isLoading }] = usePaymentMutation();
  const [cardInfo, setCardInfo] = useState(null)

  const submitBtnData = {
    text: "Place order",
    loadingText: "Placing order",
    type: "submit",
    isLoading: isLoading
  };

  const submit = async (values) => {
    const stripe = await stripePromise;
    console.log(stripe);
    
    const data = {
      billingName: values.billingName,
      billingEmail: values.billingEmail,
      billingPhone: "0775815089",
      totalAmount: totalAmount,
      billingAddress: {
        line1: values.line1,
        line2: values.line2,
        city: values.city,
        state: values.state,
        postalCode: "1059",
        country: values.country,
      },
    };
    console.log(data);
    try {
      const res = await payment({data,token}).unwrap();

      const des = await stripe?.redirectToCheckout({
        sessionId: res.sessionId
      })

      console.log(res);
      console.log(des);
      
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      billingName: "",
      billingEmail: "",
      billingPhone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    // validationSchema: loginSchema,
    onSubmit: submit,
  });

  const inputs = {
    name: {
      type: "text",
      placeholder: "Name",
      autoComplete: "on",
      name: "billingName",
      onChange: handleChange,

      value: values.billingName,
    },
    phone: {
      type: "number",
      placeholder: "Phone number",
      autoComplete: "on",
      name: "billingPhone",
      onChange: handleChange,
      value: values.billingPhone,
    },
    line1: {
      type: "text",
      placeholder: "line1",
      autoComplete: "on",
      name: "line1",
      onChange: handleChange,
      value: values.line1,
    },
    line2: {
      type: "text",
      placeholder: "line2",
      autoComplete: "on",
      name: "line2",
      onChange: handleChange,
      value: values.line2,
    },
    city: {
      type: "text",
      placeholder: "City",
      autoComplete: "on",
      name: "city",
      onChange: handleChange,
      value: values.city,
    },
    state: {
      type: "text",
      placeholder: "State",
      autoComplete: "on",
      name: "state",
      onChange: handleChange,
      value: values.state,
    },
    postalCode: {
      type: "number",
      placeholder: "Postal code",
      autoComplete: "on",
      name: "postalCode",
      onChange: handleChange,
      value: values.postalCode,
    },
    email: {
      type: "email",
      placeholder: "Email address",
      autoComplete: "on",
      name: "billingEmail",
      onChange: handleChange,
      value: values.billingEmail,
    },
    country: {
      type: "text",
      placeholder: "Country",
      autoComplete: "on",
      name: "country",
      onChange: handleChange,
      value: values.country,
    },
  };
  return (
    <div>
      <div className="bg-black">
        <Header />
      </div>

      <div className="max-w-xl mx-auto mt-16 pb-12">
        <div className="flex items-center mb-4">
          <h1 className="text-3xl font-semibold mr-4">Checkout</h1>
          <div className="h-px bg-orange-600 w-8/12"></div>
        </div>
        <form action={handleSubmit} className="space-y-4">
         <div>
            <label htmlFor="" className="block mb-3 text-base">
              Name
            </label>
            <InputField {...inputs.name} />
          </div>
          <div>
            <label htmlFor="" className="block mb-3 text-base">
              Country
            </label>
            <InputField {...inputs.country} />
          </div>
          <div>
            <label htmlFor="" className="block mb-3 text-base">
              City
            </label>
            <InputField {...inputs.city} />
          </div>
          <div>
            <label htmlFor="" className="block mb-3 text-base">
              Line 1
            </label>
            <InputField {...inputs.line1} />
          </div>
          <div>
            <label htmlFor="" className="block mb-3 text-base">
              Line 2
            </label>
            <InputField {...inputs.line2} />
          </div>
          <div>
            <label htmlFor="" className="block mb-3 text-base">
              State
            </label>
            <InputField {...inputs.state} />
          </div>
          <div>
            <label htmlFor="" className="block mb-3 text-base">
              Postal code
            </label>
            <InputField {...inputs.postalCode} />
          </div>
          <div>
            <label htmlFor="" className="block mb-3 text-base">
              Phone number
            </label>
            <InputField {...inputs.phone} />
          </div>
          <div className="pb-5">
            <label htmlFor="" className="block mb-3 text-base">
              Email address
            </label>
            <InputField {...inputs.email} />
          </div>
          <div>
            <Button data={submitBtnData} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
