import { Request, Response, NextFunction } from 'express'
import response from '../../response'
import { UserModel } from '../../schema/userSchema'
import { comparePass, hashPassword } from '../../helper/hashPassword'
import { LoginToken } from '../../helper/globalHelper'

export async function userRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, name } = req.body
    if (!name) {
      return response.error('Masukkan Nama', res, 400)
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return response.error('Masukkan Email', res, 400)
    }
    if (!emailRegex.test(email)) {
      return response.error('Masukkan Email Yang Valid', res, 400)
    }
    if (!password) {
      return response.error('Masukkan Password', res, 400)
    }
    const checkAdmin = await UserModel.find({ email })
    if (checkAdmin.length !== 0)
      return response.error('User Sudah Terdaftar', res, 400)

    const hashing = hashPassword(password)
    const saveData = new UserModel({
      email,
      name,
      password: hashing,
      role: 'User'
    })

    const dataResponse: { email: string } = await saveData.save()
    return response.success(
      `Berhasil Register User Dengan Email ${dataResponse.email}`,
      res,
      202
    )
  } catch (error) {
    return response.error(error, res, 500)
  }
}

export async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body
    if (!email) {
      return response.error('Masukkan Email', res, 400)
    }
    if (!password) {
      return response.error('Masukkan Password', res, 400)
    }
    const checkAdmin = await UserModel.find({ email })
    if (checkAdmin.length === 0)
      return response.error('User Tidak Terdaftar', res, 400)

    const hashing = comparePass(password, checkAdmin[0].password)

    if (!hashing) return response.error('Password Salah', res, 401)

    const userToken = LoginToken(checkAdmin[0])

    const dataResponse = {
      accessToken: userToken,
      _id: checkAdmin[0]._id,
      name: checkAdmin[0].name,
      email: checkAdmin[0].email,
      role: checkAdmin[0].role
    }

    return response.successWithResponse(dataResponse, res, 200)
  } catch (error) {
    return response.error(error, res, 500)
  }
}

export async function userNameUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user
    const { name } = req.body

    if (!user) {
      return response.error('Error Access Token', res, 400)
    }
    if (!name) {
      return response.error('Nama User Harus Ada', res, 400)
    }
    const result = await UserModel.updateOne(
      { email: user.email },
      { $set: { name: name } }
    )
    if (result.matchedCount > 0) {
      return response.successWithResponse(name, res, 200)
    } else {
      return response.error('Gagal Update', res, 500)
    }
  } catch (error) {
    return response.error(error, res, 500)
  }
}
