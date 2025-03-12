import React, { useEffect, useState } from "react";
import InputField from "../ui/InputField";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/mainApi";
import Button from "../ui/Button";
import Validatior from "./Validatior";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    setEmail(searchParams.get("email"));
    setToken(searchParams.get("token"));
  }, []);

  const submitBtnData = {
    text: "Save",
    loadingText: "Saving",
    type: "submit",
    isLoading: isLoading,
  };

  const submit = async (values) => {
    const tokenRep = token.replace(/\s+/g, "+");
    const data = { email: email, token: tokenRep, ...values };
    try {
      const regRes = await resetPassword(data).unwrap();
      console.log(regRes);
      if (!regRes.success) throw new Error("Error");
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
    },
    // validationSchema: ,
    onSubmit: submit,
  });

  const inputs = {
    password: {
      type: "password",
      placeholder: "Password",
      autoComplete: "on",
      name: "password",
      onChange: handleChange,
      value: values.password,
      pwdInp: true,
    },
    confirmPassword: {
      type: "password",
      placeholder: "Confirm Password",
      autoComplete: "on",
      name: "confirmPassword",
      onChange: handleChange,
      value: values.confirmPassword,
      pwdInp: true,
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-14">
        <h3 className="text-5xl">Reset Password</h3>
      </div>
      <div className="flex flex-col">
        <div className="mb-10">
          <label htmlFor="" className="block mb-3 text-base">
            Enter password
          </label>
          <InputField {...inputs.password} />
          <div>{errors.password && touched.password && (
            <Validatior error={errors.password}/>)
          }</div>
        </div>
        <div className="mb-11">
          <label htmlFor="" className="block mb-3 text-base">
            Enter confirm password
          </label>
          <InputField {...inputs.confirmPassword} />
          <div>{errors.confirmPassword && touched.confirmPassword && 
            <Validatior error={errors.confirmPassword}/>
            }</div>
        </div>
        <div>
          <Button data={submitBtnData} />
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
