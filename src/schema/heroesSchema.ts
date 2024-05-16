import mongoose, { Document } from "mongoose";
import { heroesType } from "../interface/heroes/heroes";

export interface heroesTypeModel extends heroesType, Document {}

const HeroesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

export const HeroModel = mongoose.model<heroesTypeModel>(
  "heroes",
  HeroesSchema
);
