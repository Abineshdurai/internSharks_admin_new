import { baseApi } from "../baseApi";

export const recruiterPaymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecruiterPayments: builder.query({
            query: ({ page, limit, search }) => ({
                url: `api/recruiter/getallpaymentdetail?page=${page}&limit=${limit}&search=${search}`,
                method: "GET",
            }),
        }),
    })
})

export const { useGetRecruiterPaymentsQuery } = recruiterPaymentApi;