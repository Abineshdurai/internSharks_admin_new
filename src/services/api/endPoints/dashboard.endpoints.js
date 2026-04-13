import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query({
            query: () => "/api/admin/dashboard/stats",
            method: "GET",
            providesTags: ["Dashboard"],
        }),
    }),
});

export const { useGetDashboardDataQuery } = dashboardApi;