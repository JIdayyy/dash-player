import axiosInstance from "../axiosInstance";

const albumFetcher = {
    update: async (id: string, data: Partial<Album>): Promise<Album> =>
        (await axiosInstance.put(`/album/${id}`, data)).data,
};

export default albumFetcher;
