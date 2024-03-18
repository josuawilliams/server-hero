import userRoutes from '../module/user/userRouter'

export default (app: any) => {
  app.use('/user', userRoutes)
}
