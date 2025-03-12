import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VerifyEmail from "../components/auth/VerifyEmail";
import ForgetPassword from "../components/auth/ForgetPassword";
import ResetPassword from "../components/auth/ResetPassword";
import SubmitRegistration from "../components/auth/SubmitRegistration";
import ShoppingCart from "../pages/ShoppingCart";
import Class from "../pages/Class";
import Trainer from "../pages/Trainer";

import { AuthProvider } from "../context/AuthContext";
import ProductDetails from "../components/products/ProductDetails";
import Checkout from "../pages/Checkout";
import PostDetails from "../components/PostDetails";
import Contact from "../components/Contact";
import CheckoutSuccess from "../components/checkout/checkoutSuccess";
import PlanSuccess from "../components/PlanSuccess";

const AppRoutes = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/classes/:id" element={<Class />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/trainer/:id" element={<Trainer />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/post-details/:id" element={<PostDetails/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/success?" element={<CheckoutSuccess/>}/>
      <Route path="/plan-success?" element={<PlanSuccess/>}/>


      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
        <Route path="verifyEmail" element={<VerifyEmail />} />
        <Route path="forget-Password" element={<ForgetPassword />} />
        <Route path="submit-registration?" element={<SubmitRegistration />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
  
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </AuthProvider>
  
  );
};

export default AppRoutes;
