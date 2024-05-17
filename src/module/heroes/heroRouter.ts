"use strict";

import express from "express";
import Authentication from "../../helper/auth";
import {
  AddHeroes,
  DeleteFavourite,
  addFavourites,
  getFavouritesHero,
  listHeroes,
} from "./heroController";
const Router = express.Router();
const auth = Authentication.authRole();

Router.get("/list", listHeroes);
Router.get("/favourites", getFavouritesHero);
Router.post("/add-heroes", auth, AddHeroes);
Router.post("/favourites/:heroId", addFavourites);
Router.delete("/delete-favourite/:heroId", DeleteFavourite);

export default Router;