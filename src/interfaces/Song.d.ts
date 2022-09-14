type Song = {
    id: string;
    link: string;
    duration: number;
    title: string | null;
};

interface IPlayer {
    isPlaying: boolean;
    songs: Song[];
    duration: number;
    selectedSong: Song | null;
    position: number;
    showPlaylist: boolean;
    songIndex: number;
}
