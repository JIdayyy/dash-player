// import getAllSongs from "@redux/thunk/songs";
import { songApi } from "@redux/services/songs";
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
            if (!state.songs.find((song) => song.id === action.payload.id)) {
                state.songs.push(action.payload);
            }
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
    extraReducers: (builder) => {
        builder.addMatcher(
            songApi.endpoints.getAllSongs.matchFulfilled,
            (state, { payload }) => {
                state.songs = payload;
                state.selectedSong = payload[0];
                state.duration = Math.floor(parseInt(payload[0].duration));
                state.position = 0;
            },
        );
        builder.addMatcher(
            songApi.endpoints.deleteSong.matchFulfilled,
            (state, { payload }) => {
                const index = state.songs.findIndex(
                    (song) => song.id === payload.id,
                );
                state.songs.splice(index, 1);
            },
        );
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
