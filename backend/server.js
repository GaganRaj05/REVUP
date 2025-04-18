require("dotenv").config()
const connectToDB = require("./config/db")
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth")
const featureRoutes = require("./routes/features");
const cors = require('cors');
const socketIo = require("socket.io");
const path = require('path');
const http = require('http');
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));
app.use("/app/auth",authRoutes);
app.use("/app/features",featureRoutes);

const server = http.createServer(app)
const io = socketIo(server);
io.on("connection",(socket)=> {

    socket.on("chat_message",(msg)=> {
        console.log("message recieved",msg);
        console.log(socket.id)
        socket.broadcast.emit(msg);
    })
    socket.on("disconnect",()=> {
        console.log("CLient disconnected",socket.id);
    })
})


server.listen(process.env.PORT, ()=>console.log("Server started at PORT:"+process.env.PORT));

connectToDB(process.env.MONGODB_URL);

