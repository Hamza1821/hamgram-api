import express from 'express'
import {getUser,updateUser,getAllUser} from '../controller/user.js'
const router=express.Router()

router.get('/find/:userId',getUser)
router.put('/',updateUser)
router.get('/',getAllUser)

export default router