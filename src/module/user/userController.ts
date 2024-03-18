import { Request, Response, NextFunction } from 'express'
import response from '../../response'

export async function userRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body
    if (!email) {
      return response.error('Masukkan Email', res, 400)
    }
  } catch (error) {
    console.log(error)
  }
}
