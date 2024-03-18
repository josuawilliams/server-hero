import express from 'express'
import bodyParser from 'body-parser'
import routesHero from '../routes/routes'
import cors from 'cors'
import 'dotenv/config'
import moment from 'moment'
const morgan = require('morgan')

async function startExpress(): Promise<void> {
  const app = express()
  const port = process.env.PORT
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  morgan.token('date', () => {
    return moment().format('DD MMMM YYYY, h:mm:ss')
  })
  app.use(morgan(':method :url :status - :response-time ms [:date]'))
  routesHero(app)

  app.use('/', (req, res) => {
    return res.json({
      status: 200,
      message: 'success'
    })
  })

  app.listen(port, () => {
    console.log('Server Running On http://localhost:4000/')
  })
}

export { startExpress }
