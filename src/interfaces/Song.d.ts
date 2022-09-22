type Song = {
    id: string;
    link: string;
    title: string;
    duration: string;
    album: Album;
    artistId: string;
    updated_at: string;
    userId: string | null;
    albumId: string;
    artist: Artist;
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
