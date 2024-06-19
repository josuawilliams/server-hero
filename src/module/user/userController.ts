import { Request, Response, NextFunction } from "express";
import response from "../../response";
import { UserModel } from "../../schema/userSchema";
import { comparePass, hashPassword } from "../../helper/hashPassword";
import { LoginToken } from "../../helper/globalHelper";
const nodemailer = require("nodemailer");

export async function userRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, name } = req.body;
    if (!name) {
      return response.error("Masukkan Nama", res, 400);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return response.error("Masukkan Email", res, 400);
    }
    if (!emailRegex.test(email)) {
      return response.error("Masukkan Email Yang Valid", res, 400);
    }
    if (!password) {
      return response.error("Masukkan Password", res, 400);
    }
    const checkAdmin = await UserModel.find({ email });
    if (checkAdmin.length !== 0)
      return response.error("User Sudah Terdaftar", res, 400);

    const hashing = hashPassword(password);
    const saveData = new UserModel({
      email,
      name,
      password: hashing,
      role: "User",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "josuawilliams17@gmail.com",
        pass: "eprd litx sgjm hjfb",
      },
    });

    const mailOptions = {
      from: "initestingkok@gmail.com",
      to: email,
      subject: "Welcome Herooo !!!",
      text: `Hello ${name},\n\nThank you for registering at our App.\n\nBest Regards,\nYour Company`, // plain text body
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333; text-align: center;">Welcome to App Hero, ${name}!</h2>
                <p style="color: #555;">Hello <strong>${name}</strong>,</p>
                <p style="color: #555;">Thank you for registering at Hero App. We're excited to have you with us.</p>
                
                <p style="color: #555;">If you have any questions, feel free to contact the Developer</a>.</p>
                <p style="color: #555;">Best Regards,<br>Josua Williams Tampubolon</p>
            </div>
        `,
    };

    // Mengirim email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const dataResponse: { email: string } = await saveData.save();
    return response.success(
      `Berhasil Register User Dengan Email ${dataResponse.email}`,
      res,
      202
    );
  } catch (error) {
    return response.error(error, res, 500);
  }
}

export async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    if (!email) {
      return response.error("Masukkan Email", res, 400);
    }
    if (!password) {
      return response.error("Masukkan Password", res, 400);
    }
    const checkAdmin = await UserModel.find({ email });
    if (checkAdmin.length === 0)
      return response.error("User Tidak Terdaftar", res, 400);

    const hashing = comparePass(password, checkAdmin[0].password);

    if (!hashing) return response.error("Password Salah", res, 401);

    const userToken = LoginToken(checkAdmin[0]);

    const dataResponse = {
      accessToken: userToken,
      _id: checkAdmin[0]._id,
      name: checkAdmin[0].name,
      email: checkAdmin[0].email,
      role: checkAdmin[0].role,
    };

    return response.successWithResponse(dataResponse, res, 200);
  } catch (error) {
    return response.error(error, res, 500);
  }
}

export async function userNameUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    const { name } = req.body;

    if (!user) {
      return response.error("Error Access Token", res, 400);
    }
    if (!name) {
      return response.error("Nama User Harus Ada", res, 400);
    }
    const result = await UserModel.updateOne(
      { email: user.email },
      { $set: { name: name } }
    );
    if (result.matchedCount > 0) {
      return response.successWithResponse(name, res, 200);
    } else {
      return response.error("Gagal Update", res, 500);
    }
  } catch (error) {
    return response.error(error, res, 500);
  }
}
