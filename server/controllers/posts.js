
import PostMessage from "../models/postMessage.js"
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

export const getPosts = async (req, res)=>{


    try{
        // const newPostMessage = new PostMessage({...post})
       
        //      await newPostMessage.save()
             const posts = await PostMessage.find()
             res.status(201).json(posts );
        }
        catch(error){
            res.status(409).json({ message: error.message });
    
        }


}