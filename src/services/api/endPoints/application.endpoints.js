import { baseApi } from "../baseApi";

export const applicationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getApplications: builder.query({
            query: ({ page = 1, limit = 10, search = "", status = "" } = {}) => ({
                url: "/api/admin/applications",
                method: "GET",
                params: { search, page, limit },
            }),
            providesTags: ["Applications"],
        }),
    }),
});

export const { useGetApplicationsQuery } = applicationApi;