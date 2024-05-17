import { ObjectId } from "mongoose";

export interface Favourites {
  userId: string;
  heroId: string[];
}

export type User = {
  _id: ObjectId;
  email: string;
  name: string;
};

export type Hero = {
  _id: ObjectId;
  name: string;
  type: string;
  imageUrl: string;
};

export type FavouritesType = {
  _id: ObjectId;
  user: User;
  hero: Hero[];
};
