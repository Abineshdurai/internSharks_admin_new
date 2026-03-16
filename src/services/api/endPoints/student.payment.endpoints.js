import { baseApi } from "../baseApi";

export const studentsPaymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: ({ page = 1, limit = 10, search = "" } = {}) => ({
                url: "api/admin/student/getallpaymentdetail",
                method: "GET",
                params: { search, page, limit }
            }),
            providesTags: ["StudentsPayment"]
        }),

        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/api/admin/students/${id}`,
                method: "DELETE,"
            }),
            invalidatesTags: ["Students"],
        }),
    })
});

export const {
    useGetStudentsPaymentsQuery,
    useDeleteStudentsPaymentsMutation
} = studentsPaymentApi;