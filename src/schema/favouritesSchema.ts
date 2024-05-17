import mongoose, { Document } from "mongoose";
import { Favourites } from "../interface/favourites/favourites";

export interface FavouritesModel extends Favourites, Document {}

const FavouritesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  heroId: [{ type: mongoose.Schema.Types.ObjectId, ref: "heroes" }],
});

export const FavouritesModel = mongoose.model<FavouritesModel>(
  "favourites",
  FavouritesSchema
);
