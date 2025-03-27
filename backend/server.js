require("dotenv").config()
const connectToDB = require("./config/db")
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth")
const featureRoutes = require("./routes/features");
const cors = require('cors');
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morgan("dev"))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/app/auth",authRoutes);
app.use("/app/features",featureRoutes);

app.listen(process.env.PORT, ()=>console.log("Server started at PORT:"+process.env.PORT));

connectToDB(process.env.MONGODB_URL);

