import React, { useEffect, useState } from "react";
import InputField from "../ui/InputField";
import { useFormik } from "formik";
import { useRegisterMutation } from "../../services/mainApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setVerifyEmail } from "../../features/auth/verifyEmailSlice";
import Button from "../ui/Button";
import { registerSchema } from "../../validations/register";
import Validatior from "./Validatior";

const Register = () => {
  const dispatch = useDispatch();
  const [register, {isLoading}] = useRegisterMutation(); 
  const [usernameErr, setUsernameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const submitBtnData = {
    text: 'Sign up',
    loadingText: 'Signing up',
    type: 'submit',
    isLoading: isLoading,
  }

  const submit = async (values) => {
    try {
        const regRes = await register(values).unwrap();
        console.log(regRes)
        if (!regRes.success) throw new Error("Error");
        dispatch(setVerifyEmail(values.Email))
        navigate('/auth/verifyEmail')
    } catch (err) {
      if (!err) {
        setError("Server xətası.");
      }
      if (err.status == 400) {
        setEmailErr(err.data.Message);
      }
      if (err.status == 404) {
        setUsernameErr(err.data.Message);
      }
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Username: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: submit
  });

  const inputs = {
    firstName: {
      type: "text",
      placeholder: "First name",
      autoComplete: "on",
      name: "FirstName",
      onChange: handleChange,
      value: values.FirstName,
    },
    lastName: {
      type: "text",
      placeholder: "Last name",
      autoComplete: "on",
      name: "LastName",
      onChange: handleChange,
      value: values.LastName,
    },
    userName: {
      type: "text",
      placeholder: "User name",
      autoComplete: "on",
      name: "Username",
      onChange: handleChange,
      value: values.Username,
    },
    email: {
      type: "email",
      placeholder: "Email address",
      autoComplete: "on",
      name: "Email",
      onChange: handleChange,
      value: values.Email,
    },
    password: {
      type: "password",
      placeholder: "Password",
      autoComplete: "on",
      name: "Password",
      onChange: handleChange,
      value: values.Password,
      pwdInp: true,
    },
    confirmPassword: {
      type: "password",
      placeholder: "Confirm password",
      autoComplete: "on",
      name: "ConfirmPassword",
      onChange: handleChange,
      value: values.ConfirmPassword,
      pwdInp: true,
    },
  };

    useEffect(() => {
      setEmailErr(null)
    }, [inputs.email.value])

    useEffect(() => {
      setUsernameErr(null)
    }, [inputs.userName.value])
  return (
    <form action={handleSubmit}>
      <div className="flex justify-between items-center mb-14">
        <h3 className="text-5xl">Sign Up</h3>
      </div>
      <div className="flex flex-col">
      <div className="mb-10 flex">
          <div className="mr-8 w-full">
            <label htmlFor="" className="block mb-3 text-base">
              First name
            </label>
            <InputField {...inputs.firstName} />
            <div className="max-w-52">
            {errors.FirstName && touched.FirstName && (
              <Validatior error={errors.FirstName}/>
            )}
          </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="block mb-3 text-base">
              Last name
            </label>
            <InputField {...inputs.lastName} />
            <div className="max-w-52">
            {errors.LastName && touched.LastName && (
              <Validatior error={errors.LastName}/>
            )}
          </div>
          </div>
        </div>
        <div className="mb-10">
          <label htmlFor="" className="block mb-3 text-base">
            User name
          </label>
          <InputField {...inputs.userName} />
          <div>
            {errors.Username && touched.Username && (
              <Validatior error={errors.Username}/>
            )}{usernameErr !== null && <Validatior error={error} />}
          </div>
        </div>
        <div className="mb-10">
          <label htmlFor="" className="block mb-3 text-base">
            Enter your email adsress
          </label>
          <InputField {...inputs.email} />
          <div>
            {errors.Email && touched.Email && (
              <Validatior error={errors.Email}/>
            )}{emailErr !== null && <Validatior error={error} />}
          </div>
        </div>
        <div className="mb-10">
          <label htmlFor="" className="block mb-3 text-base">
            Enter your password
          </label>
          <InputField {...inputs.password} />
          <div>
            {errors.Password && touched.Password && (
              <Validatior error={errors.Password}/>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="" className="block mb-3 text-base">
            Enter confirm password
          </label>
          <InputField {...inputs.confirmPassword} />
          <div>
            {errors.ConfirmPassword && touched.ConfirmPassword && (
              <Validatior error={errors.ConfirmPassword}/>
            )}
          </div>
        </div>
        <div className="flex mb-11">
          <div className="text-black text-base ml-auto">
          <Link to="/auth/Login">
          Have an Account ? <br />
          Sign in
          </Link>
          </div>
         
        </div>
        <div>
          <Button data={submitBtnData} />
        </div>
      </div>
    </form>
  );
};

export default Register;
