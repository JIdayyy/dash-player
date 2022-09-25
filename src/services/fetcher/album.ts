import axiosInstance from "../../utils/axiosInstance";

const albumFetcher = {
    update: async (id: string, data: Partial<Album>): Promise<Album> =>
        (await axiosInstance.put(`/albums/${id}`, data)).data,
    getAll: async (): Promise<Album[]> =>
        (await axiosInstance.get("/albums")).data,
    getAllWithSongCountAndArtist: async (): Promise<Album[]> =>
        (await axiosInstance.get("/albums?count=songs&artist=true")).data,
    delete: async (id: string): Promise<Album> =>
        (await axiosInstance.delete(`/albums/${id}`)).data,
    getOneWithSongs: async (id: string): Promise<Album & { songs: Song[] }> =>
        (await axiosInstance.get(`/albums/${id}?songs=true`)).data,
};

export default albumFetcher;
