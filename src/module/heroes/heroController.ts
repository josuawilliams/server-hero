import { Request, Response, NextFunction } from "express";
import response from "../../response";
import { comparePass, hashPassword } from "../../helper/hashPassword";
import { HeroModel } from "../../schema/heroesSchema";
import { FavouritesModel } from "../../schema/favouritesSchema";
import mongoose from "mongoose";

interface Query {
  name?: { $regex: RegExp };
  type?: string;
}

export async function listHeroes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, type } = req.query;
    let query: Query = {};
    if (name) {
      query.name = { $regex: RegExp(name as string, "i") };
    }
    if (type) {
      query.type = type as string;
    }
    const datas = await HeroModel.find(query);
    return response.successList({ data: datas }, res, 200);
  } catch (error) {
    return response.error(error, res, 500);
  }
}

export async function AddHeroes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, type, imageUrl } = req.body;
    if (!name) {
      return response.error("Nama Hero Harus Ada", res, 400);
    }
    if (!type) {
      return response.error("Tipe Hero Harus Ada", res, 500);
    }
    if (!imageUrl) {
      return response.error(
        "Gambar Hero Harus Diisi Dalam Bentuk String",
        res,
        500
      );
    }
    const saveHero = new HeroModel({
      name,
      type,
      imageUrl,
    });
    await saveHero.save();
    return response.success(`Berhasil Menambah Hero`, res, 202);
  } catch (error) {
    return response.error(error, res, 500);
  }
}

export async function addFavourites(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const heroId = req.params.heroId;
    const userId = req.user._id;
    const heroData = [];

    if (!heroId) {
      return response.error("Invalid ID", res, 400);
    }

    const isHero = await HeroModel.findOne({
      _id: new mongoose.Types.ObjectId(heroId),
    });

    if (!isHero) {
      return response.error("Hero Tidak Terdaftar", res, 400);
    }

    const checkUserFavorite = await FavouritesModel.findOne({
      userId: new mongoose.Types.ObjectId(userId as string),
    });

    if (!checkUserFavorite) {
      heroData.push(new mongoose.Types.ObjectId(heroId as string));

      const saveFavourites = new FavouritesModel({
        userId: new mongoose.Types.ObjectId(userId as string),
        heroId: heroData,
      });
      await saveFavourites.save();
    } else {
      const isHeroFavorited = checkUserFavorite.heroId.includes(heroId);
      if (!isHeroFavorited) {
        await FavouritesModel.updateOne(
          { userId },
          {
            $push: {
              heroId: new mongoose.Types.ObjectId(heroId as string),
            },
          }
        );
      } else {
        return response.error("Hero Sudah Terdaftar Di Favorit", res, 500);
      }
    }
    return response.success(`Berhasil Menambah Favorit Hero`, res, 200);
  } catch (error) {
    return response.error(error, res, 500);
  }
}

export async function getFavouritesHero(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user._id;
    const [favouritesHero] = await FavouritesModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId as string),
        },
      },
      {
        $lookup: {
          from: "heroes",
          localField: "heroId",
          foreignField: "_id",
          as: "heroDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $unwind: "$heroDetails",
      },
      {
        $group: {
          _id: "$_id",
          user: {
            $first: "$userDetails",
          },
          heroes: {
            $push: "$heroDetails",
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: {
            _id: "$user._id",
            email: "$user.email",
            name: "$user.name",
          },
          hero: "$heroes",
        },
      },
    ]);
    if (!favouritesHero) {
      const isEmptyFavourite = await FavouritesModel.findOne({ userId });
      //Sampai Sini , jika blum ada favorit hero dan user belum terdaftar di Favorite
    }
    return response.successListFavourite({ data: favouritesHero }, res, 200);
  } catch (error) {
    console.log(error);

    return response.error(error, res, 500);
  }
}

export async function DeleteFavourite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    
  } catch (error) {
    return response.error(error, res, 500);
  }
}
