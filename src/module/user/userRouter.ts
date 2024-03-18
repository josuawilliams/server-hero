'use strict'

import express from 'express'
import { userRegister } from './userController'
// import { authentication } from '../../helper/auth'
// import { decryptData } from '../../middleware/decryptData'
const Router = express.Router()

// Router.post('/login', admin.adminLogin)
Router.post('/register', userRegister)

export default Router
