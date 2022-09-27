import express from 'express'
import * as PostController from '../controllers/posts.js'

const router = express.Router()


router.post('/',PostController.createPost) //
router.get('/',PostController.getPosts) //


export default router