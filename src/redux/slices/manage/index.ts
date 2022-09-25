import { getAllAlbumsWithSongCountAndArtistThunk } from "./../../thunk/manage";
import { createSlice } from "@reduxjs/toolkit";

interface IManageState {
    albums: Album[];
    loaders: {
        albums: boolean;
    };
}

const initialState: IManageState = {
    albums: [],
    loaders: {
        albums: false,
    },
};

const manageSlice = createSlice({
    name: "manage",
    initialState,
    reducers: {
        addAlbum: (state, action) => {
            state.albums.push(action.payload);
        },
        removeAlbum: (state, action) => {
            const index = state.albums.findIndex(
                (album) => album.id === action.payload,
            );
            state.albums.splice(index, 1);
        },
        updateAlbum: (state, action) => {
            const index = state.albums.findIndex(
                (album) => album.id === action.payload.id,
            );
            state.albums[index] = {
                ...state.albums[index],
                ...action.payload,
            };
        },
    },
    extraReducers: {
        [getAllAlbumsWithSongCountAndArtistThunk.fulfilled.type]: (
            state,
            action,
        ) => {
            state.albums = action.payload;
            state.loaders.albums = false;
        },
        [getAllAlbumsWithSongCountAndArtistThunk.pending.type]: (state) => {
            state.loaders.albums = true;
        },
    },
});

export const { addAlbum, removeAlbum, updateAlbum } = manageSlice.actions;

export default manageSlice.reducer;
