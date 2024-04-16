import JWT from 'jsonwebtoken'
// exports.adminRefreshToken = (admin) => {
//   const refreshToken = JWT.sign({ _id: admin._id }, process.env.SECRET_KEY_REFRESH, {
//     algorithm: "HS256"
//   });

//   return refreshToken;
// };
interface userLoginType {
  _id: string
  email: string
  name: string
}

const LoginToken = (user: userLoginType) => {
  const token = JWT.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name
    },
    process.env.SECRET_KEY,
    {
      algorithm: 'HS256',
      expiresIn: '3h'
    }
  )
  return token
}

export { LoginToken }
