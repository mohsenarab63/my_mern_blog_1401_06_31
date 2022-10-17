import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";

const secret = 'test';

 const auth = async (req,res,next) => {
    try {
        const auth_array = req.headers.authorization?.split(" ") || [];
        const token = auth_array.length > 1 ? auth_array[1] : null ;

        if(token) {
            const codedData = jwt.verify(token,secret)
            req.userId = codedData?.id

            const oldUser = await UserModal.findOne({ _id: codedData?.id});

            if (!oldUser) return res.status(403).json({ message: "user_not_found" ,code:'login'});
            
         }else{

             return res.status(403).json({ message: "Not_LoggedIn" ,code:'login'});
         }

         // return res.status(200).json({ message: "allowed" ,code:'No_Permission'});


    }
    catch(error){
        console.log (error) 
        return res.status(404).json({ message: "error in auth middlware" ,code:'No_Permission', error:error});
    }

    next()
}

export default auth 