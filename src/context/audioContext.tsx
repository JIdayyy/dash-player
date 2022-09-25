import {
    createContext,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
    useState,
} from "react";

export const audioContext = createContext<{
    audioRef: RefObject<HTMLAudioElement> | null;
    setAudioRef: Dispatch<SetStateAction<RefObject<HTMLAudioElement> | null>>;
} | null>(null);

const AudioContextProvider = ({
    children,
}: {
    children: ReactNode;
}): JSX.Element => {
    const [audioRef, setAudioRef] =
        useState<RefObject<HTMLAudioElement> | null>(null);

    return (
        <audioContext.Provider value={{ audioRef, setAudioRef }}>
            {children}
        </audioContext.Provider>
    );
};

export default AudioContextProvider;
