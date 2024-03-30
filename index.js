import express from "express"
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from'cookie-parser'

const app = express();
import userRouter from './routes/users.js'
import postRouter from './routes/posts.js'
import commentRouter from './routes/comments.js'
import likeRouter from './routes/likes.js'
import relationshipsRouter from './routes/relationships.js'
import authRouter from './routes/authentication.js'
import multer from "multer";

//cors middleware
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true // Allow credentials
}));


// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//multer file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+ file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  //multer endpoint 

  app.post('/api/upload',upload.single("file"),(req,res)=>{
    const file= req.file;
    res.status(200).json(file.filename)
  })



  app.use(cookieParser());

// Routes
app.use("/api/users", userRouter); // Add a forward slash before "api/user"
app.use("/api/posts", postRouter); // Add a forward slash before "api/posts"
app.use("/api/comments", commentRouter); // Add a forward slash before "api/comment"
app.use("/api/likes", likeRouter); // Add a forward slash before "api/like"
app.use("/api/auth", authRouter);
app.use("/api/relationships", relationshipsRouter) // Add a forward slash before "api/auth"

app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(process.env.PORT||8080, () => {
    console.log("Server running on port 8080");
});
