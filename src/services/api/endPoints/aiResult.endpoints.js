import { baseApi } from "../baseApi";

export const aiResultApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAiResults: builder.query({
            query: ({ page = 1, limit = 10, search = "", apiname = "" } = {}) => ({
                url: "/api/rate/getallsuccessdata",
                method: "GET",
                params: { search, page, limit, apiname },
            }),
            providesTags: ["AiResults"],
        }),
    }),
});

export const { useGetAiResultsQuery } = aiResultApi;