import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchText: "",
    currentPage: 1,
    pageSize: 10,
    selectedStudentPayment: null,
}

const studentPaymentSlice = createSlice({
    name: "student",
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
        setSelectedStudentPayment: (state, action) => {
            state.selectedStudentPayment = action.payload;
        },
    },
});

export const {
    setSearchText,
    setCurrentPage,
    setPageSize,
    setSelectedStudentPayment,
} = studentPaymentSlice.actions

export default studentPaymentSlice.reducer;