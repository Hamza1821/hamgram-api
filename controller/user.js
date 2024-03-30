import {db} from '../connect.js'
import jwt from 'jsonwebtoken'

export const getUser=(req,res)=>{
    const userId=req.params.userId
    
    const q="SELECT  * FROM users WHERE id=?"

    db.query(q,[userId],(err,data)=>{
        if(err) return res.status(500).json("error fetching user")

         const { password ,...info}=data[0]
         
         return res.json(info);

    })
}

export const updateUser=(req,res)=>{
 

    const token=req.cookies.accessToken;
  

   if(!token) return res.status(401).json('not logged in')

   jwt.verify(token, "secret",(err,userInfo)=>{
      if(err) return res.status(403).json('token is not valid')
      
      const q="UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=?"
         db.query(q,[req.body.name,req.body.city,req.body.website,req.body.profilePic,req.body.coverPic,userInfo.id],(err,data)=>{
       if(err) return res.status(500).json(err)
      
       if(data.affectedRows>0) return res.status(200).json("updated")
       return res.status(403).json("you can update only your profile")
      });

   })

}
export const getAllUser = (req, res) => {
   const token = req.cookies.accessToken;
 
   if (!token) return res.status(401).json('not logged in');
 
   jwt.verify(token, "secret", (err, userInfo) => {
     if (err) return res.status(403).json('token is not valid');
 
     const q = "SELECT * FROM users WHERE id != ? ORDER BY RAND() LIMIT 5;";
     db.query(q, [userInfo.id], (err, data) => {
       if (err) return res.status(500).json(err);
 
       // Map over the array of objects to create a new array with filtered data
       const filteredData = data.map(user => {
         // Destructure the user object and omit the 'password' key
         const { password, ...rest } = user;
         return rest; // Return the filtered object without the 'password' key
       });
 
       return res.status(200).json(filteredData);
     });
   });
 };