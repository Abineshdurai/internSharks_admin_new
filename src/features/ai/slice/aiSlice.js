import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchText : "",
    apiname : "",
    currentPage: 1,
    pageSize: 10
}
const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
            state.currentPage = 1;
        },
        setApiname: (state, action) => {
            state.apiname = action.payload;
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

export const { setSearchText, setApiname, setCurrentPage, setPageSize } = aiSlice.actions;
export default aiSlice.reducer;