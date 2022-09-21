import axiosInstance from "../axiosInstance";

const songFetcher = {
    update: async (id: string, data: Song): Promise<Song> =>
        (await axiosInstance.put(`/songs/${id}`, data)).data,
};

export default songFetcher;
