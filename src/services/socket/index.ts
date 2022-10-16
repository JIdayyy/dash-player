import io from "socket.io-client";

const socket = io(
    process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000",
);
import store from "@redux/store";
import { addSong } from "@redux/slices/player";
import { songApi } from "@redux/services/songs";

socket.on("NEW_SONG", (data) => {
    store.dispatch(addSong(data));
});

socket.on("ALBUM_UPDATE", (data) => {
    console.log("UPDATE", data);

    songApi.useGetAllSongsQuery();
});

export default socket;
