'use strict'

import express from 'express'
import { userRegister, userLogin } from './userController'
// import { authentication } from '../../helper/auth'
// import { decryptData } from '../../middleware/decryptData'
const Router = express.Router()

Router.post('/login', userLogin)
Router.post('/register', userRegister)

export default Router
