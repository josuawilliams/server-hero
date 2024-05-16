'use strict'

import express from 'express'
import { userRegister, userLogin } from './userController'

const Router = express.Router()

Router.post('/login', userLogin)
Router.post('/register', userRegister)

export default Router
