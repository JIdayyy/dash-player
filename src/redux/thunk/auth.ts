import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const signInThunk = createAsyncThunk(
    "auth/signIn",
    async (
        payload: { email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const { data, headers } = await axiosInstance.post(
                "/auth/signin",
                payload,
            );
            console.log("response", data);
            const token = headers["authorization"].split(" ")[1];
            localStorage.setItem("token", token);

            return data;
        } catch (error) {
            console.log(error);
            rejectWithValue(error);
        }
    },
);

export const signUpThunk = createAsyncThunk(
    "auth/signUp",
    async (
        payload: { email: string; password: string; username: string },
        { rejectWithValue },
    ) => {
        try {
            const { data, headers } = await axiosInstance.post(
                "/auth/signup",
                payload,
            );
            console.log(data);

            const token = headers["authorization"].split(" ")[1];
            localStorage.setItem("token", token);
            return data;
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export const authMeThunk = createAsyncThunk(
    "auth/authMe",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await axiosInstance
                .post("/auth/me")
                .then((res) => res.data)
                .catch((err) => rejectWithValue(err.response.data.message));

            return data;
        } catch (error) {
            rejectWithValue(error as string);
        }
    },
);
