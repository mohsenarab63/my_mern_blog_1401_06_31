
import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose'

export const createPost = async(req,res)=>{
    const post = req.body;
    console.log ('in createPost',post) 
    try{
    const newPostMessage = new PostMessage({...post})
   
         await newPostMessage.save()
         res.status(201).json(newPostMessage );
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
             res.status(201).json(posts );
        }
        catch(error){
            res.status(409).json({ message: error.message });
    
        }


}