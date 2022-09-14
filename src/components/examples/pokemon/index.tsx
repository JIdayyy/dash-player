import * as React from "react";
import { useGetAllSongsQuery } from "@redux/services/songs";

export default function Songs() {
    // Using a query hook automatically fetches data and returns query values
    const { data, error, isLoading } = useGetAllSongsQuery({});
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
    console.log(data);
    return <div className="App">SONGS</div>;
}
