import { useGetAllSongsQuery } from "@redux/services/songs";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useDispatch } from "react-redux";
import {
    setDuration,
    setIsOnPause,
    setIsOnPlay,
    setNextSongIndex,
    setSelectedSong,
    setShowPlaylist,
    setSongPosition,
} from "@redux/slices/player";
import { useAppSelector } from "@redux/store";
import { useEffect } from "react";

const usePlayer = (ref?: React.RefObject<HTMLAudioElement>) => {
    const dispatch = useDispatch();
    const { data: songs = [] } = useGetAllSongsQuery();

    const duration = useAppSelector(
        (state) => state.rootReducer.player.duration,
    );
    const position = useAppSelector(
        (state) => state.rootReducer.player.position,
    );
    const selectedSong = useAppSelector(
        (state) => state.rootReducer.player.selectedSong,
    );
    const showPlaylist = useAppSelector(
        (state) => state.rootReducer.player.showPlaylist,
    );
    const isPlaying = useAppSelector(
        (state) => state.rootReducer.player.isPlaying,
    );
    const songIndex = useAppSelector(
        (state) => state.rootReducer.player.songIndex,
    );

    const dispatchSetDuration = (dur: number) => {
        dispatch(setDuration(dur));
    };

    const play = () => {
        dispatch(setIsOnPlay());
        if (ref && ref.current) {
            ref.current.play();
        }
    };

    const pause = () => {
        dispatch(setIsOnPause());

        if (ref && ref.current) {
            ref.current.pause();
        }
    };

    const handleSelectSong = (id: string) => {
        dispatch(setSelectedSong(id));
    };

    const dispatchSongPosition = (position: number) => {
        dispatch(setSongPosition(position));
    };

    const toggleShowPlaylist = () => {
        dispatch(setShowPlaylist());
    };

    const dispatchSetIsOnPlay = () => {
        dispatch(setIsOnPlay());
    };
    const dispatchSetIsOnPause = () => {
        dispatch(setIsOnPause());
    };

    const dispatchSetNextSong = () => {
        dispatch(setNextSongIndex());
    };

    useEffect(() => {
        if (songs[songIndex] && songs[songIndex].id) {
            dispatch(setSelectedSong(songs[songIndex].id));
        }
    }, [songIndex]);

    useEffect(() => {
        if (
            Math.floor(ref?.current?.currentTime as number) ===
                Math.floor(ref?.current?.duration as number) &&
            !isPlaying
        ) {
            ref?.current?.pause();
            dispatch(setNextSongIndex());
            ref?.current?.play();
        }
    }, [isPlaying]);

    return {
        isPlaying,
        dispatchSetIsOnPause,
        dispatchSetIsOnPlay,
        toggleShowPlaylist,
        showPlaylist,
        dispatchSetDuration,
        playerRef: ref,
        position,
        selectedSong,
        songs,
        duration,
        play,
        pause,
        handleSelectSong,
        dispatchSongPosition,
        dispatchSetNextSong,
    };
};

export default usePlayer;
