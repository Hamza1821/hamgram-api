import express from 'express'
const router=express.Router()
import {getPosts,addPost,deletePost} from '../controller/post.js'
router.get('/',getPosts)
router.post('/',addPost)
router.delete('/:id',deletePost)

export default router