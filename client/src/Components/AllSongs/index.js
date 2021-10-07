import React, {useMemo} from "react";
import SongList from "Components/SongsList";

const AllSongs = () => {
    return <SongList 
        isFavRequired={true}
        allSongs={true}
    />
};

export default AllSongs;