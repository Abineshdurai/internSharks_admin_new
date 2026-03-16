import { baseApi } from "../baseApi";

export const studentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: ({ page = 1, limit = 10, search = "" } = {}) => ({
                url: "api/admin/students",
                method: "GET",
                params: { search, page, limit }
            }),
            providesTags: ["Students"]
        }),

        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/api/admin/students/${id}`,
                method: "DELETE,"
            }),
            invalidatesTags: ["Students"],
        }),
    }),
});

export const {
    useGetStudentsQuery,
    useDeleteStudentMutation
} = studentsApi;