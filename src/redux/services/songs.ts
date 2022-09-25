// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

// Define a service using a base URL and expected endpoints
export const songApi = createApi({
    reducerPath: "songsApi",
    tagTypes: ["Songs", "Albums", "Artists"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        prepareHeaders: (headers) => {
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("token") || ""
                    : "";

            if (token) {
                console.log(token);

                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllSongs: builder.query<Song[], void>({
            query: () => `/songs`,
            providesTags: ["Songs"],
        }),
        getSongById: builder.query<Song, string>({
            query: (id) => `/songs/${id}`,
        }),
        getAllAlbums: builder.query<Album[], void>({
            query: () => `/albums`,
        }),
        getAlbumById: builder.query<Album, string>({
            query: (id) => `/albums/${id}`,
        }),
        getAllArtists: builder.query<Song["artist"][], void>({
            query: () => `/artists`,
        }),
        getArtistById: builder.query<Song["artist"], string>({
            query: (id) => `/artists/${id}`,
        }),
        deleteSong: builder.mutation<{ message: string; id: string }, string>({
            query: (id) => ({
                url: `/songs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Songs"],
        }),
        deleteAlbum: builder.mutation<{ message: string; id: string }, string>({
            query: (id) => ({
                url: `/albums/${id}`,
                method: "DELETE",
            }),
        }),
        updateSong: builder.mutation<Song, Song>({
            query: (song) => ({
                url: `/songs/${song.id}`,
                method: "PUT",
                body: song,
            }),
        }),
        updateAlbum: builder.mutation<Album, Album>({
            query: (album) => ({
                url: `/albums/${album.id}`,
                method: "PUT",
                body: album,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAllSongsQuery,
    useDeleteAlbumMutation,
    useDeleteSongMutation,
    useGetAlbumByIdQuery,
    useGetAllAlbumsQuery,
    useGetAllArtistsQuery,
    useGetArtistByIdQuery,
    useGetSongByIdQuery,
    useLazyGetAlbumByIdQuery,
    useLazyGetAllAlbumsQuery,
    useLazyGetAllArtistsQuery,
    useLazyGetAllSongsQuery,
    useLazyGetArtistByIdQuery,
    useLazyGetSongByIdQuery,
    usePrefetch,
    useUpdateAlbumMutation,
    useUpdateSongMutation,
} = songApi;
