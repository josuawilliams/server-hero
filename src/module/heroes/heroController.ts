import { Request, Response, NextFunction } from "express";
import response from "../../response";
import { comparePass, hashPassword } from "../../helper/hashPassword";
import { HeroModel } from "../../schema/heroesSchema";

export async function listHeroes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (error) {}
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
