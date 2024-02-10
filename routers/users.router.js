import express from 'express'
import { logIn, signUp } from '../controllers/auth.controller.js'
import { getAllUsers, getUserById } from '../controllers/user.controller.js'

 
const router  = express.Router()


router.post('/signup',signUp)
router.post('/login',logIn)



router.get('/', getAllUsers)
router.get('/:id', getUserById)



export default router
