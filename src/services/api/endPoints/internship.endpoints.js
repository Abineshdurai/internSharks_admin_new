import { baseApi } from "../baseApi";

export const internshipApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getInternships: builder.query({
            query: ({ page = 1, limit = 10, search = "" } = {}) => ({
                url: "/api/admin/jobs",
                method: "GET",
                params: { search, page, limit },
            }),
            providesTags: ["Internships"],
        }),
    }),
});

export const { useGetInternshipsQuery } = internshipApi;