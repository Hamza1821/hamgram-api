import { db } from "../connect.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register =async (req, res) => {
    // Check if user exists
    try {
        const q = 'SELECT * FROM users WHERE username = ?';
       await db.query(q, [req.body.username], async (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) {
                console.log(data)
                return res.status(409).json('User already exists');
            } 
            // Create user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const q = "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)";
            db.query(q, [req.body.username, req.body.email, hashedPassword, req.body.name], (err, data) => {
                if (err) return res.status(500).json(err);
              
                return res.status(200).json('User added');
            });
        });
    } catch (error) {
        console.log(error)
    }
   
};;

export const login = (req, res) => {   
   

    const q = 'SELECT * FROM users WHERE username = ?';
    db.query(q, [req.body.username], async (err, data) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // Check what data is being retrieved
        if (data.length === 0) return res.status(404).json("User not found");
        const checkPassword = await bcrypt.compare(req.body.password, data[0].password);
        if (!checkPassword) {
            return res.status(400).json("Wrong password or username");
        }
        const { password, ...others } = data[0]; // Exclude password from response
        const token = jwt.sign({ id: data[0].id }, "secret");
        res.cookie('accessToken', token, {
            httpOnly: true,
        }).status(200).json(others);
    });
};


export const logout = (req, res) => {
     res.clearCookie('accessToken',{
        secure:true,
        sameSite:'none'
     }).status(200).json('user has been logged out')
};

