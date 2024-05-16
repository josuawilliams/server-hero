import { NextFunction, Request, RequestHandler } from "express";
import response from "../response";
import { VerifyToken } from "./globalHelper";
import { UserModel } from "../schema/userSchema";
declare module "express" {
  interface Request {
    user?: any;
  }
}
class Authentication {
  private async checkToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.header("token-header");
      if (!token) {
        return response.error("Invalid Access Token", res, 400);
      }
      const access_token = VerifyToken(token);
      if (!access_token) {
        return response.error("Access Token Bermasalah", res, 400);
      }
      const checkEmail = await UserModel.find({ email: access_token.email });
      if (checkEmail.length === 0) {
        return response.error("Mohon Login Ulang", res, 400);
      }

      req.user = access_token;
      next();
    } catch (error) {
      return response.error(error, res, 500);
    }
  }

  private async checkRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.header("token-header");
      if (!token) {
        return response.error("Invalid Access Token", res, 400);
      }
      const access_token = VerifyToken(token);

      if (!access_token) {
        return response.error("Access Token Bermasalah", res, 400);
      }
      const [CheckingRole] = await UserModel.aggregate([
        {
          $match: {
            role: "Admin",
            email: access_token.email,
          },
        },
      ]);
      if (!CheckingRole) {
        return response.error("Forbiden", res, 401);
      }
      next();
    } catch (error) {
      return response.error(error, res, 500);
    }
  }

  public auth(): RequestHandler[] {
    return this.checkToken.bind(this);
  }

  public authRole(): RequestHandler {
    return this.checkRole.bind(this);
  }
}

export default new Authentication();
