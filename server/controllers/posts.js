
import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose'

export const createPost = async(req,res)=>{
    const post = req.body;
    console.log ('in createPost',post) 
    try{
    const newPostMessage = new PostMessage({...post, creator:req.userId})
   
         await newPostMessage.save()
         res.status(201).json(newPostMessage );
    }
    catch(error){
        res.status(409).json({ message: error.message });

    }

}
export const likePost = async(req,res)=>{
    
    try{
            const {id} = req.params;
            const userId = req?.userId
            console.log ('userId ',userId) 
            console.log ('id ',id) 
            if(!userId) return res.status(403).json({message:'unauthenticated',code:'login'})
        
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

            const post = await PostMessage.findById(id)
            const index = post.likes.findIndex( likeUserId =>  likeUserId === String(userId) )
            if(index === -1){
                 post.likes.push(userId)
            }else{
                 post.likes = post.likes.filter(likeUserId => likeUserId !== String(userId))
            }
           
            const updatedPost = await PostMessage.findByIdAndUpdate(id,  post , { new: true });
    
            res.json({updatedPost,ok:true});
    }
    catch(error){
        res.status(409).json({ message: error.message });

    }

}

export const commentPost = async (req, res) =>{
       try{
          const  {comment} = req.body
          const  {id} = req.params
          const post = await PostMessage.findById(id) 
          post.comments.push(comment)
          const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new:true})
          res.json(updatedPost)

       }
       catch(error){
        res.status(409).json({ message: error.message });
       }
    

}



export const deletePost = async (req, res) => {

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    //res.json({ message: "Post deleted successfully." });

    res.json({ id: id, message:"Post deleted successfully." });


}

export const getPosts = async (req, res)=>{


    try{
        const { page } = req.query;
        const LIMIT = 4;
        const startIndex = (Number(page)-1)*LIMIT 
        // const newPostMessage = new PostMessage({...post})
       
        //      await newPostMessage.save()
             const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)
             res.status(200).json(posts );
        }
        catch(error){
            res.status(404).json({ message: error.message });
    
        }


}
export const getSinglePost = async (req, res)=>{


    try{
        //res.status(200).json('salammmmm' );
        const { id } = req.params;
        const post = await PostMessage.findById(id)
        res.status(200).json(post );
        }
        catch(error){
            res.status(404).json({ message: error.message });
    
        }


}


