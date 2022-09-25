type Album = {
    id: string;
    title: string;
    artistId: string;
    picture: string | null;
    artist?: Artist;
    _count?: {
        songs: number;
    };
};
