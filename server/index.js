import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from  'cors'
import dotenv from 'dotenv'
import PostMessage from "./models/postMessage.js"

// import postRoutes from './routes/posts.js'
// import userRoutes from './routes/users.js'

const app=express()
dotenv.config()

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors()) ////

import postRoutes from './routes/posts.js'

// app.use('/posts',postRoutes)
// app.use('/user',userRoutes)

app.get('/',(req,res)=>{
  res.send('App is Running')
})
// app.post('/posts',(req,res)=>{
 
//   const post = req.body;

//         const newPostMessage = new PostMessage({...post})

    
//          newPostMessage.save().then( (result)=> {
//           res.status(201).json(newPostMessage );
//          }).catch(error=>{
//           res.status(409).json({ message: error.message });
//          });
      
    
// })
app.use('/posts',postRoutes)

 

const PORT= process.env.PORT || 5000 

// app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT} ! `))

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT} ??@@?!!@@@`)))
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);