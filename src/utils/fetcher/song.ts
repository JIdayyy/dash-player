import axiosInstance from "../axiosInstance";

const songFetcher = {
    update: async (id: string, data: Partial<Song>): Promise<Song> =>
        (await axiosInstance.put(`/songs/${id}`, data)).data,
    delete: async (id: string): Promise<{ message: string; id: string }> =>
        (await axiosInstance.delete(`/songs/${id}`)).data,
};

export default songFetcher;
