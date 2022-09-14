import axiosInstance from "src/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllSongs = createAsyncThunk(
    "users/fetchByIdStatus",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get("/songs");
            return data;
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export default getAllSongs;
