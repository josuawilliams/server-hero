import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

const salt = genSaltSync(10)
const hashPassword = (password: string) => {
  const hash = hashSync(password, salt)
  return hash
}

const comparePass = (password: string, hash: string) => {
  const compare = compareSync(password, hash)
  return compare
}

export { hashPassword, comparePass }
