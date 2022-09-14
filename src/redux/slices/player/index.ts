import getAllSongs from "@redux/thunk/songs";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IPlayer = {
    songs: [],
    duration: 0,
    selectedSong: null,
    position: 0,
    showPlaylist: true,
    isPlaying: false,
    songIndex: 0,
};

const counterSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setSongDuration: (state, action) => {
            state.duration = action.payload;
        },
        setSelectedSong: (state, action) => {
            const songId = state.songs.findIndex(
                (song) => song.id === action.payload,
            );
            state.songIndex = songId;
            state.selectedSong = state.songs[songId];
        },
        setSongPosition: (state, action) => {
            state.position = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setShowPlaylist: (state) => {
            state.showPlaylist = !state.showPlaylist;
        },
        setIsOnPlay: (state) => {
            state.isPlaying = true;
        },
        setIsOnPause: (state) => {
            state.isPlaying = false;
        },
        setNextSongIndex: (state) => {
            if (state.songIndex === state.songs.length - 1) {
                state.songIndex = 0;
            } else {
                state.songIndex = state.songIndex + 1;
            }
        },
    },
    extraReducers: {
        [getAllSongs.fulfilled.type]: (state, action) => {
            state.songs = action.payload;
        },
    },
});

export const {
    setNextSongIndex,
    setSongDuration,
    setSelectedSong,
    setSongPosition,
    setDuration,
    setShowPlaylist,
    setIsOnPause,
    setIsOnPlay,
} = counterSlice.actions;

export default counterSlice.reducer;
