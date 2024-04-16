import mongoose, { Document } from 'mongoose'
import { userType } from '../interface/user/userInterface'

export interface userTypeModel extends userType, Document {}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minLength: 8,
    trim: true
  },
  timeOfEntry: {
    type: Date
  }
})

export const UserModel = mongoose.model<userTypeModel>('user', UserSchema)
