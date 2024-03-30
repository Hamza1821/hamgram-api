import { db } from "../connect.js"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import moment from "moment";



export const getPosts=(req,res)=>{

   const token=req.cookies.accessToken;
  

   if(!token) return res.status(401).json('not logged in')

   jwt.verify(token, "secret",(err,userInfo)=>{
      if(err) return res.status(403).json('token is not valid')
      
      const q=`SELECT p.*, u.id AS userId ,name,profilePic  FROM  posts AS p JOIN users AS u ON (u.id=p.userId) LEFT JOIN relationship AS r ON (p.userId = r.followedId) WHERE r.followerId=? OR p.userId=? ORDER BY p.createdAt DESC`
         db.query(q,[userInfo.id,userInfo.id],(err,data)=>{
       if(err) return res.status(500).json(err)
      
       return res.status(200).json(data)
      });

   })
  
}



export const addPost=(req,res)=>{

   const token=req.cookies.accessToken;
  

   if(!token) return res.status(401).json('not logged in')

   jwt.verify(token, "secret",(err,userInfo)=>{
      if(err) return res.status(403).json('token is not valid')
      
      const q="INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)"

      const values =[
         req.body.desc,
         req.body.img,
         moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
         userInfo.id
      ]
   
      db.query(q,[values],(err,data)=>{
       if(err) return res.status(500).json(err)
    
       return res.status(200).json("post has been created")
      });

   })
  
}

export const deletePost=(req,res)=>{

   const token=req.cookies.accessToken;
  

   if(!token) return res.status(401).json('not logged in')
 
   jwt.verify(token, "secret",(err,userInfo)=>{
      if(err) return res.status(403).json('token is not valid')
      
      const q="DELETE FROM posts WHERE(`userId` =? AND `id` =?)"

    
   
      db.query(q,[userInfo.id,req.params.id],(err,data)=>{
       if(err) return res.status(500).json(err)
       
       if(data.affectedRows>0) return res.status(200).json("post has been deleted")
       return res.status(403).json("you can delete your own posts")
      });

   })
  
}
