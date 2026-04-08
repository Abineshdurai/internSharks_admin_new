import { baseApi } from "../baseApi";

export const recruiterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruiters: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: "/api/admin/recruiters",
        method: "GET",
        params: { search, page, limit },
      }),
      providesTags: ["Recruiters"],
    }),

    getRecruiterById: builder.mutation({
      query: (id) => ({
        url: `/api/recruiter/admin/getrecdetail`,
        method: "POST",
        body: { id: id },
      }),
    }),
  }),
});

export const { useGetRecruitersQuery, useGetRecruiterByIdMutation } =
  recruiterApi;
