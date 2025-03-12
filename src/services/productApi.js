import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://alihuseyn1-001-site1.otempurl.com/api/'
    }),

    endpoints: (builder) => ({
        products: builder.query({
            query: () => 'Product'
        }),
        product: builder.query({
            query: (id) => `Product/${id}`
        }),
        addCart: builder.mutation({
            query: ({id, quantity, token}) => ({
                url: `Cart/add-to-cart/${id}`,
                method: 'POST',
                headers : {
                    'Authorization': `Bearer ${token}`
                },
                body: quantity
            })
        }),
        payment: builder.mutation({
            query: ({data, token}) => ({
                url: `Payment/payment`,
                method: 'POST',
                headers : {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            })
        }),
        
        applyPromoCode: builder.mutation({
            query: (data) => ({
                url: 'Coupon/apply',
                method: "POST",
                body: data
            })
        }),

        posts: builder.query({
            query: () => ({
                url: 'Post',
            })
        }),

        postDetails: builder.query({
            query: (id) => `Post/${id}`
        }),

        contact: builder.mutation({
            query: (data) => ({
                url: 'Contact/create',
                method: 'POST',
                body: data
            })
        }),

        subscribe: builder.mutation({
            query: ({data, token}) => ({
                url: 'Subscribe/create-checkout-session',
                method: 'POST',
                headers : {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            })
        }),

        planSuccess: builder.query({
            query: (id) => `Subscribe/plan-success/${id}`,
        
        }),

        planWithTrainer: builder.query({
            query: () => 'Plan/withTrainer'
        }),
        planWithoutTrainer: builder.query({
            query: () => 'Plan/withoutTrainer'
        }),

        trainers: builder.query({
            query: () => 'Trainer'
        }),
        
        trainer: builder.query({
            query: (id) => `Trainer/${id}`,
        
        }),

    })
})

export const {
    useProductsQuery,
    useProductQuery,
    useAddCartMutation,
    usePaymentMutation,
    useApplyPromoCodeMutation,
    usePostsQuery,
    usePostDetailsQuery,
    useContactMutation,
    usePlanWithTrainerQuery,
    usePlanWithoutTrainerQuery,
    useSubscribeMutation,
    usePlanSuccessQuery,
    useTrainersQuery,
    useTrainerQuery
} = productApi;