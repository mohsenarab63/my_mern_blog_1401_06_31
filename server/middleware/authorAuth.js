
import PostMessage from "../models/postMessage.js"

 const authorAuth = async (req,res,next) => {
    try {
            

            const loginUserId = req.userId ;
            const  post_id  = req.params?.id || null;

            const post = await PostMessage.findOne({ _id: post_id});
            if (!post) return res.status(403).json({ message: "post_not_found" ,code:'not_found'});

            const {creator} = post  


            
            console.log (`loginUserId = ${loginUserId} , creator=${creator}`) 
            // if(loginUserId !== userId ){
            //    console.log (`loginUserId !== userId`) 
              
            //   // return res.status(403).json({ message: "Not_LoggedIn" ,code:'not_owner'});

            // }else{
            //     console.log ('loginUserId === userId') 
            // }

            if(loginUserId !== creator ){
                console.log ('loginUserId !== creator') 
                return res.status(403).json({ message: "Access is denied" ,code:'not_owner'});
             }else{
                 console.log ('loginUserId === creator') 
             }

          

           //  return res.status(403).json({ message: "Not_LoggedIn" ,code:'login'});
        

         // return res.status(200).json({ message: "allowed" ,code:'No_Permission'});


    }
    catch(error){
        console.log (error) 
        return res.status(404).json({ message: "error in AuthorAuth middlware" ,code:'No_Permission', error:error});
    }

    next()
}

export default authorAuth 