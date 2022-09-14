/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useDispatch } from "react-redux";
import {
    setDuration,
    setIsOnPause,
    setIsOnPlay,
    setNextSongIndex,
    setSelectedSong,
    setShowPlaylist,
    setSongDuration,
    setSongPosition,
} from "@redux/slices/player";
import { useAppSelector } from "@redux/store";
import { useEffect } from "react";

const usePlayer = (ref?: React.RefObject<HTMLAudioElement>) => {
    const dispatch = useDispatch();

    const {
        songs,
        duration,
        selectedSong,
        position,
        showPlaylist,
        isPlaying,
        songIndex,
    } = useAppSelector((state) => state.rootReducer.player);

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
        console.log("REF", ref);

        if (ref) {
            dispatch(setSongDuration(ref.current?.duration));
        }
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
            play();
        }
    }, [isPlaying]);
    console.log(position);
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
