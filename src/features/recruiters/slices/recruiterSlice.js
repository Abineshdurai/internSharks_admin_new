import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchText: "",
    currentPage: 1,
    pageSize: 10,
    selectedRecruiter: null,
}

const recruiterSlice = createSlice({
    name: "recruiters",
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
        setSelectedRecruiter: (state, action) => {
            state.selectedRecruiter = action.payload;
        },
    },
})

export const { 
    setSearchText, 
    setCurrentPage, 
    setPageSize, 
    setSelectedRecruiter 
} = recruiterSlice.actions;
export default recruiterSlice.reducer;