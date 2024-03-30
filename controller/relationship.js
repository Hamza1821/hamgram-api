import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationship = (req,res)=>{

  const postId=req.query.postId

     const q="SELECT followerId FROM relationship WHERE(followedId=?) "
     db.query(q,[req.query.followedId],(err,data)=>{
        try {
             
          return res.status(200).json(data.map(relationship=>relationship.followerId));
          
        } catch (err) {
          return res.status(500).json(err)
        }

     })
    
}

export const addRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secret", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO relationship (`followerId`,`followedId`) VALUES (?)";
      const values = [
        userInfo.id,
        req.body.userId
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Following");
      });
    });
  };
  
  export const deleteRelationship = (req, res) => {
  
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secret", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "DELETE FROM relationship WHERE `followerId` = ? AND `followedId` = ?";
  
      db.query(q, [userInfo.id, req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Unfollow");
      });
    });
  };