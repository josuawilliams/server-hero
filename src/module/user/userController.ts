import { Request, Response, NextFunction } from 'express'
import response from '../../response'
import { UserModel } from '../../schema/userSchema'
import { AuthModel } from '../../schema/authSchema'
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
    if (!email) {
      return response.error('Masukkan Email', res, 400)
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
      password: hashing
    })

    const dataResponse: { email: string } = await saveData.save()
    return response.success(
      `Berhasil Register User Dengan Email ${dataResponse.email}`,
      res,
      202
    )
  } catch (error) {
    console.log(error)
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

    const auth = new AuthModel({
      name: checkAdmin[0].name,
      accessToken: userToken,
      userId: checkAdmin[0]._id
    })

    await auth.save()

    const dataResponse = {
      accessToken: userToken,
      _id: checkAdmin[0]._id,
      name: checkAdmin[0].name,
      email: checkAdmin[0].email
    }

    return response.successWithResponse(dataResponse, res, 200)
  } catch (error) {
    console.log(error)
  }
}
