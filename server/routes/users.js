import express from 'express'
import * as UserController from '../controllers/users.js'

const router = express.Router()


router.post('/signin',UserController.signin) //
router.post('/signup',UserController.signup) //
 


export default router