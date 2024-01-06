const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')

dotenv.config();


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to database");
}).catch(() => {console.log("Error connecting to database")});

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)


app.listen(8800,()=>{
    console.log('Backend server running')
})