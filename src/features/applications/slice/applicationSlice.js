import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchText : "",
    status: "",
    currentPage: 1,
    pageSize: 10
}

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
            state.currentPage = 1;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
            state.currentPage = 1;
        },
         setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.currentPage = 1;
        },
    }
})

export const { setSearchText, setStatus, setCurrentPage, setPageSize } = applicationSlice.actions;
export default applicationSlice.reducer;