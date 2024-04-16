export type userType = {
  email: string
  name: string
  password: string
  timeOfEntry?: Date
}

export type authType = {
  name: string
  accessToken: string
  userId: string
}
