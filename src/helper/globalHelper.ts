import JWT, { verify } from "jsonwebtoken";

interface userLoginType {
  _id: string;
  email: string;
  name: string;
}

const LoginToken = (user: userLoginType) => {
  const token = JWT.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "3h",
    }
  );
  return token;
};

const VerifyToken = (token: string) => {
  return verify(token, process.env.SECRET_KEY);
};

export { LoginToken, VerifyToken };
