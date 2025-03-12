import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://alihuseyn1-001-site1.otempurl.com/api/Auth/'
    }),

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'Login',
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: 'Logout',
                headers: {
                    "Content-Type": "application/json"
                },
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: 'Register',
                method: 'POST',


                body: data
            })
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: 'SubmitRegister',
                method: 'POST',
                body: data
            })
        }),
        resendNewCode: builder.mutation({
            query: (data) => ({
                url: 'ResendNewCode',
                method: 'POST',
                body: data
            })
        }),
        forgetPassword: builder.mutation({
            query: (data) => ({
                url: 'ForgetPassword',
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: 'ResetPassword',
                method: 'POST',
                body: data
            })
        }),
    })
})

export const {
    useLogoutMutation,
    useRegisterMutation,
    useLoginMutation,
    useVerifyEmailMutation,
    useResendNewCodeMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation
} = mainApi;