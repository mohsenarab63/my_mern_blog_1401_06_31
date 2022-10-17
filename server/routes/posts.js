import express from 'express'
import * as PostController from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()


router.get('/',PostController.getPosts) //
router.get('/:id',PostController.getSinglePost) //
router.post('/',auth,PostController.createPost) //
router.delete('/:id',PostController.deletePost) //
router.patch('/:id/likePost',auth,PostController.likePost) //
router.post('/:id/comment', auth, PostController.commentPost);



export default router