import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const signInThunk = createAsyncThunk(
    "auth/signIn",
    async (
        payload: { email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            const { data, headers, status } = await axiosInstance.post(
                "/auth/signin",
                payload,
            );
            if (status === 200) {
                const token = headers["authorization"].split(" ")[1];
                localStorage.setItem("token", token);

                return data;
            }
            return rejectWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
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
            const { data, headers, status } = await axiosInstance.post(
                "/auth/signup",
                payload,
            );
            if (status === 200) {
                const token = headers["authorization"].split(" ")[1];
                localStorage.setItem("token", token);

                return data;
            }
            return rejectWithValue(data);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const signOutThunk = createAsyncThunk(
    "auth/signOut",
    async (payload, { rejectWithValue }) => {
        try {
            localStorage.setItem("token", "");
            axiosInstance.defaults.headers.common["authorization"] = "";
            return "USER_LOGGED_OUT";
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const authMeThunk = createAsyncThunk(
    "auth/authMe",
    async (payload, { rejectWithValue }) => {
        try {
            const { data, status, headers } = await axiosInstance.post(
                "/auth/me",
            );
            if (status === 200) {
                const token = headers["authorization"].split(" ")[1];
                localStorage.setItem("token", token);

                return data;
            }
            return rejectWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    },
);
