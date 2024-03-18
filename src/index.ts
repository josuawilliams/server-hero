import { startExpress } from './loaders/express'
import { startMongoDb } from './loaders/mongoDB'

async function start(): Promise<void> {
  try {
    await startMongoDb()
    await startExpress()
  } catch (err) {
    console.log(err)
  }
}

start()
