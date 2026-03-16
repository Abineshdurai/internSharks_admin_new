import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: "",
    currentPage: 1,
    pageSize: 10,
    selectedStudent: null,
};

const studentsSlice = createSlice({
    name: "students",
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
        setSelectedStudent: (state, action) => {
            state.selectedStudent = action.payload;
        },
    },
});

export const {
    setSearchText,
    setCurrentPage,
    setPageSize,
    setSelectedStudent,
} = studentsSlice.actions;

export default studentsSlice.reducer;