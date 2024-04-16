const error = async (message: string, res: any, code: number) => {
  return res.status(code).json(message)
}
const success = async (message: string, res: any, code: number) => {
  return res.status(code).json(message)
}

const successWithResponse = async (data: any, res: any, code: number) => {
  return res.status(code).json(data)
}

export = {
  error,
  success,
  successWithResponse
}
