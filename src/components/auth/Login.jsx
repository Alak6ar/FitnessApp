import React, { useEffect, useState } from "react";
import InputField from "../ui/InputField";
import { useFormik } from "formik";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/mainApi";
import Button from "../ui/Button";
import { loginSchema } from "../../validations/login";
import Validatior from "./Validatior";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/auth/authSlice";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitBtnData = {
    text: "Sign in",
    loadingText: "Signing in",
    type: "submit",
    isLoading: isLoading,
  };

  const submit = async (values) => {
    try {
      const res = await login(values).unwrap();
      dispatch(setToken(res.token));
      navigate("/");
    } catch (err) {
      if (!err) {
        setError("Server xətası.");
      }
      if (err.status == 400) {
        setError(err.data.Message);
      }
      if (err.status == 404) {
        setError(err.data.Message);
      }
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: submit,
  });

  const inputs = {
    email: {
      type: "text",
      placeholder: "Username or email address",
      autoComplete: "on",
      name: "usernameOrEmail",
      onChange: handleChange,
      value: values.usernameOrEmail,
    },
    password: {
      type: "password",
      placeholder: "Password",
      autoComplete: "on",
      name: "password",
      onChange: handleChange,
      value: values.password,
      pwdInp: true,
    },
  };

  useEffect(() => {setError(null)}, [inputs.email.value, inputs.password.value]);
  return (
    <form action={handleSubmit}>
      <div className="flex justify-between items-center mb-14">
        <h3 className="text-4xl sm:text-5xl">Sign in</h3>
        <div className="text-base text-gray-800">
          <Link to="/auth/sign-up">
            No Account? <br /> Sign up
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-10">
          <label htmlFor="" className="block mb-3 text-base">
            Enter yor username or email adsress
          </label>
          <InputField {...inputs.email} />
          <div>{errors.usernameOrEmail && touched.usernameOrEmail && <Validatior error={errors.usernameOrEmail} />}</div>
        </div>
        <div className="mb-4">
          <label htmlFor="" className="block mb-3 text-base">
            Enter your password
          </label>
          <InputField {...inputs.password} />
          {errors.password && touched.password && <Validatior error={errors.password} />}
          {error !== null && <Validatior error={error} />}
        </div>
        <div className="flex mb-11">
          <div className="text-blue-500 text-base ml-auto">
            <Link to="/auth/forget-Password">Forgot Password</Link>
          </div>
        </div>
        <div>
          <Button data={submitBtnData} />
        </div>
      </div>
    </form>
  );
};

export default Login;
