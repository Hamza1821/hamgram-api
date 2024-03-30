import jwt from 'jsonwebtoken'
import { db } from '../connect.js';
import moment from 'moment'




export const getComments=(req ,res)=>{

    
   const token=req.cookies.accessToken;
  

   if(!token) return res.status(401).json('not logged in')

   jwt.verify(token, "secret",(err,userInfo)=>{
      if(err) return res.status(403).json('token is not valid')
      
      const q=`SELECT c.*, u.id AS userId ,name,profilePic  FROM  comments AS c JOIN users AS u ON (u.id=c.userId) WHERE c.postId=? ORDER BY c.createdAt DESC`
         db.query(q,[req.query.postId],(err,data)=>{
       if(err) return res.status(500).json(err)
     
       return res.status(200).json(data)
      });

   })

}

export const addComments=(req ,res)=>{

    
    const token=req.cookies.accessToken;
   
 
    if(!token) return res.status(401).json('not logged in')
 
    jwt.verify(token, "secret",(err,userInfo)=>{
       if(err) return res.status(403).json('token is not valid')
       
       const q="INSERT INTO comments (`desc`,`postId`,`createdAt`,`userId`) VALUES (?)"
       const values =[
        req.body.newComment,
        req.body.postId,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id
     ]

          db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json(err)
     
        return res.status(200).json(data)
       });
 
    })
 
 }