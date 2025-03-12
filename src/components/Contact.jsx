import React, { useState } from 'react'
import Header from './Header'
import { useFormik } from 'formik';
import InputField from './ui/InputField';
import Button from './ui/Button';
import { useContactMutation } from '../services/productApi';

const Contact = () => {
    const [contact, {isLoading}] = useContactMutation()
    const [message, setMessage] = useState("")
    const submitBtnData = {
        text: "Send",
        loadingText: "Sending",
        type: "submit",
        isLoading: isLoading
      };

    const submit = async (values) => {
        console.log(values);
        
        try {
            const res = await contact(values);
             if (res.data.success) {
                setMessage('Your message has been successfully sent.')
             }
        } catch (err) {
            console.log(err);
            
        }
        
      };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        // validationSchema: loginSchema,
        onSubmit: submit,
    });

    const inputs = {
        name: {
          type: "text",
          placeholder: "Name",
          autoComplete: "on",
          name: "name",
          onChange: handleChange,
          value: values.name,
        },
        email: {
          type: "email",
          placeholder: "Email address",
          autoComplete: "on",
          name: "email",
          onChange: handleChange,
          value: values.email,
        },
        subject: {
          type: "text",
          placeholder: "Subject",
          autoComplete: "on",
          name: "subject",
          onChange: handleChange,
          value: values.subject,
        }
      };
    return (
        <div>
            <div className="bg-black/90 mb-16">
                <Header />
            </div>
            <div className='max-w-lg mx-auto'>
                <div className="flex items-center mb-4">
                    <h1 className="text-3xl font-semibold mr-4">Contact</h1>
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
                            Email
                        </label>
                        <InputField {...inputs.email} />
                    </div>
                    <div>
                        <label htmlFor="" className="block mb-3 text-base">
                            Subject
                        </label>
                        <InputField {...inputs.subject} />
                    </div>
                    <div className="pb-1">
                        <label htmlFor="" className="block mb-3 text-base">
                            Message
                        </label>
                        <textarea name="message" value={values.message} placeholder='Message' onChange={handleChange} id="" className='transition-shadow text-base outline-none p-3 h-28 border-gray-400 ring-1 ring-gray-400 focus:ring-blue-400 w-full rounded-lg'></textarea>
                    </div>
                    <div>
                        <p className='text-green-600 text-lg text-center'>{message}</p>
                    </div>
                    <div>
                        <Button data={submitBtnData} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact