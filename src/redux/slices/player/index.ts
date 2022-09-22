import getAllSongs from "@redux/thunk/songs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        removeSong: (state, action: PayloadAction<string>) => {
            const index = state.songs.findIndex(
                (song) => song.id === action.payload,
            );
            state.songs.splice(index, 1);
        },
        addSong(state, action: PayloadAction<Song>) {
            state.songs.push(action.payload);
        },
        updateSong(state, action: PayloadAction<Song>) {
            const index = state.songs.findIndex(
                (song) => song.id === action.payload.id,
            );
            state.songs[index] = action.payload;
        },
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
    updateSong,
    addSong,
    setNextSongIndex,
    setSongDuration,
    setSelectedSong,
    setSongPosition,
    setDuration,
    setShowPlaylist,
    setIsOnPause,
    setIsOnPlay,
    removeSong,
} = counterSlice.actions;

export default counterSlice.reducer;
