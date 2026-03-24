import { baseApi } from "../baseApi";

export const studentsPaymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentsPayments: builder.query({
            query: ({ page = 1, limit = 10, search = "" } = {}) => ({
                url: "api/student/getallpaymentdetail",
                method: "GET",
                params: { search, page, limit }
            }),
            providesTags: ["StudentsPayment"]
        }),

        
        deleteStudentsPayments: builder.mutation({
            query: (id) => ({
                url: `/api/admin/students/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["StudentsPayment"],
        }),
    })
});

export const {
    useGetStudentsPaymentsQuery,
    useDeleteStudentsPaymentsMutation
} = studentsPaymentApi;