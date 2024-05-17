import { FavouritesType } from "./interface/favourites/favourites";
import { heroesType } from "./interface/heroes/heroes";

interface ResponseDataList<T> {
  data: T[];
}
interface ResponseData<T> {
  data: T;
}

const error = async (message: string, res: any, code: number) => {
  return res.status(code).json(message);
};
const success = async (message: string, res: any, code: number) => {
  return res.status(code).json(message);
};

const successList = async (
  data: ResponseDataList<heroesType>,
  res: any,
  code: number
) => {
  return res.status(code).json(data);
};

const successListFavourite = async (
  data: ResponseData<FavouritesType>,
  res: any,
  code: number
) => {
  return res.status(code).json(data);
};

const successWithResponse = async (data: any, res: any, code: number) => {
  return res.status(code).json(data);
};

export = {
  error,
  success,
  successList,
  successWithResponse,
  successListFavourite,
};
