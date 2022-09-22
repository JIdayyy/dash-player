import { createAsyncThunk } from "@reduxjs/toolkit";
import socket from "@services/socket";

const socketConnectionThunk = createAsyncThunk(
    "socket/connection",
    async (payload, { rejectWithValue }) => {
        try {
            socket.on("connection", () => {
                console.log("connected");
            });

            return true;
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export default socketConnectionThunk;
