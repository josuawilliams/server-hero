import userRoutes from "../module/user/userRouter";
import heroRoutes from "../module/heroes/heroRouter";
import Authentication from "../helper/auth";

const auth = Authentication.auth();

export default (app: any) => {
  app.use("/user", userRoutes);
  app.use(auth);
  app.use("/heroes", heroRoutes);
};
