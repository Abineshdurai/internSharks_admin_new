import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: "",
    currentPage: 1,
    pageSize: 10,
}

const recruiterPaymentSlice = createSlice({
    name: "recruiterPayment",
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 1;
        },
        setSelectedRecruiterPayment: (state, action) => {
            state.selectedRecruiterPayment = action.payload;
        },
    },
});

export const { setSearchText, setCurrentPage, setPageSize, setSelectedRecruiterPayment } = recruiterPaymentSlice.actions;
export default recruiterPaymentSlice.reducer;