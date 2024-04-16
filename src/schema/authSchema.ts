import mongoose, { Document } from 'mongoose'
import { authType } from '../interface/user/userInterface'

export interface authTypeModel extends authType, Document {}

const AuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  accessToken: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true }
})

export const AuthModel = mongoose.model<authTypeModel>('auth', AuthSchema)
