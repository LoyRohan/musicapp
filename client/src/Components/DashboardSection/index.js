import React from "react";
import {Switch, Route } from "react-router-dom";
import Consts from "const";
import Album from "Components/Albums";
import AllSongs from "Components/AllSongs";
import FavList from "Components/FavList";
import SongsList from "Components/SongsList";

const DashboardSection = (props) => {
  return (
    <Switch>
      <Route path={Consts.fields.album.redirectUrl} component={Album} exact/>
      <Route path={Consts.fields.songs.redirectUrl} component={AllSongs} />
      <Route path={Consts.fields.favList.redirectUrl} component={FavList} />
      <Route
        path={`${Consts.fields.album.redirectUrl}/:id`}
        component={SongsList}
      />
    </Switch>
  );
};

export default DashboardSection;
