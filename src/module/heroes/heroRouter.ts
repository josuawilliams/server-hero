"use strict";

import express from "express";
import Authentication from "../../helper/auth";
import {
  AddHeroes,
  DeleteFavourite,
  DeleteHero,
  addFavourites,
  getById,
  getFavouritesHero,
  listHeroes,
  updateHero,
} from "./heroController";
const Router = express.Router();
const auth = Authentication.authRole();

Router.get("/list", listHeroes);
Router.get("/favourites", getFavouritesHero);
Router.get("/:Id", getById);
Router.post("/add-heroes", auth, AddHeroes);
Router.post("/favourites/:heroId", addFavourites);
Router.delete("/delete-favourite/:heroId", DeleteFavourite);
Router.delete("/delete-hero/:heroId", auth, DeleteHero);
Router.patch("/update-hero/:Id", auth, updateHero);
export default Router;
