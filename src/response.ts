const error = async (message: string, res: any, code: number) => {
  return res.status(code).json(message)
}

export = {
  error
}
