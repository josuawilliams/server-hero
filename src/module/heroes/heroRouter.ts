"use strict";

import express from "express";
import Authentication from "../../helper/auth";
import { AddHeroes, listHeroes } from "./heroController";
const Router = express.Router();
const auth = Authentication.authRole();

Router.get("/list", listHeroes);
Router.post("/add-heroes", auth, AddHeroes);

export default Router;
