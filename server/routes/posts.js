import express from 'express'
import * as PostController from '../controllers/posts.js'

const router = express.Router()


router.post('/',PostController.createPost) //
router.get('/',PostController.getPosts) //
router.delete('/:id',PostController.deletePost) //


export default router