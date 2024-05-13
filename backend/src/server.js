const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require("./config/dbConnection");
const taskRouter = require("./routes/taskRoute/task.route.js");
const userRouter = require("./routes/userRoute/user.route.js");
const cookieParser = require('cookie-parser');
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
connectDb();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//app endpoints
app.use("/task",taskRouter);
app.use("/user",userRouter);

app.get("/" , (req,res)=>{
    res.send("Hello from the server");
})

app.listen(PORT , ()=>{
    console.log(`server running on port : ${PORT}...`);
})