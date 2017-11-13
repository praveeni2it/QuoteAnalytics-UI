import React from "react";
import {Route, IndexRoute} from "react-router";
import AppContainer from "./Components/AppContainer";
import Quotes from "./Components/Quotes";

export default (
  <Route path="/" component={AppContainer}>
    <Route path="/quotes" component={Quotes} />
  </Route>
);
