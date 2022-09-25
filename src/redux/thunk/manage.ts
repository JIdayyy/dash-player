import { createAsyncThunk } from "@reduxjs/toolkit";
import albumFetcher from "@services/fetcher/album";

export const getAllAlbumsThunk = createAsyncThunk(
    "albums/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const albums = await albumFetcher.getAll();
            return albums;
        } catch (error) {
            rejectWithValue(error);
        }
    },
);

export const getAllAlbumsWithSongCountAndArtistThunk = createAsyncThunk(
    "albums/getAllWithSongCount",
    async (_, { rejectWithValue }) => {
        try {
            const albums = await albumFetcher.getAllWithSongCountAndArtist();
            return albums;
        } catch (error) {
            rejectWithValue(error);
        }
    },
);
