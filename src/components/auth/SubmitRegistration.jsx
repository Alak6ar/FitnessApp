import React, { useEffect, useRef, useState } from "react";
import InputField from "../ui/InputField";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { useResendNewCodeMutation, useVerifyEmailMutation } from "../../services/mainApi";
import Button from "../ui/Button";
import { confirmKey } from "../../validations/submitRegistration";
import Validatior from "./Validatior";

const SubmitRegistration = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const navigate = useNavigate();
  const [resendNewCode] = useResendNewCodeMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    setEmail(searchParams.get("email"));
    setToken(searchParams.get("token"));
  }, []);
  const resendBtnRef = useRef();

  let timer;
  let countdown = 60;
  const [time, setTime] = useState(null);
  function startResendTimer() {
    resendBtnRef.current.disabled = true;
    timer = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    if (countdown > 0) {
      setTime(`${countdown} saniyə sonra`);
      countdown--;
    } else {
      resendBtnRef.current.disabled = false;
      setTime(null);
      countdown = 60;
      console.log(timer);
      clearInterval(timer);
    }
  }

  const resendOtpCode = async () => {
    if (time === null) {
      try {
        const res = await resendNewCode({ email: email }).unwrap();
        if (!res) {
          throw new Error(res?.message);
        }
        if (res) {
          console.log("Gonderildi");
          startResendTimer();
        }
      } catch (error) {
        console.log(error);
        // setError("Gündəlik limit aşılıb")
        // resendBtnRef.current.disabled = true;
      }
    }
  };

  const submitBtnData = {
    text: "Verify",
    loadingText: "Verifying",
    type: "submit",
    isLoading: isLoading,
  };

  const submit = async (values) => {
    const data = { email: email, ...values };
    try {
      const regRes = await verifyEmail(data).unwrap();
      console.log(regRes);
      if (!regRes.success) throw new Error("Error");
      navigate("/");
    } catch (err) {
      if (!err) {
        console.log("Server xətası.");
      }
      if (err.status == 409) {
        console.log(err.data.Message);
      }
      if (err.status == 400) {
        console.log(err.data.Message);
      }
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      confirmKey: "",
    },
    validationSchema: confirmKey,
    onSubmit: submit,
  });

  const inputs = {
    codeVerify: {
      type: "text",
      placeholder: "Code",
      autoComplete: "on",
      name: "confirmKey",
      onChange: handleChange,
      value: values.confirmKey,
    },
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-14">
        <h3 className="text-5xl">OTP Verification</h3>
      </div>
      <div className="flex flex-col">
        <div className="mb-11">
          <label htmlFor="" className="block mb-3 text-base">
            Enter code
          </label>
          <InputField {...inputs.codeVerify} />
          <div>{errors.confirmKey && touched.confirmKey && <Validatior error={errors.confirmKey} />}</div>
        </div>
        <div>
          <div className="flex mb-11">
            <p>
              <span className="text-base">Didn’t you receive the OTP? {time}</span>{" "}
              <button ref={resendBtnRef} type="button" onClick={resendOtpCode} className="text-blue-600 text-sm disabled:text-gray-500">
                Resend OTP
              </button>
            </p>
          </div>
        </div>
        <div>
          <Button data={submitBtnData} />
        </div>
      </div>
    </form>
  );
};

export default SubmitRegistration;
