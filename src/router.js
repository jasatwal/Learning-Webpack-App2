import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
// Inluded this by default because we expect this to be the 
// most visited route and therefore we don't want to do
// another round trip to the server to fetch this component
import ArtistMain from './components/artists/ArtistMain';

const componentRoutes = {
  component: Home,
  path: "/",
  IndexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path: "artist/new",
      getComponent(location, cb) {
        System.import("./components/artists/ArtistCreate")
          .then(module => cb(null, module.default));
      }
    },
    {
      path: "artist/:id",
      getComponent(location, cb) {
        System.import("./components/artists/ArtistDetail")
          .then(module => cb(null, module.default));
      }
    },
    {
      path: "artist/:id/edit",
      getComponent(location, cb) {
        System.import("./components/artists/ArtistEdit")
          .then(module => cb(null, module.default));
      }
    }
  ]
};

const Routes = () => {
  return (
     <Router history={hashHistory} routes={componentRoutes} />
  );
};

export default Routes;
