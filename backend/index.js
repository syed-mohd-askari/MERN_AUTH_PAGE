//importing express and creating instance
const express = require('express');
const app = express();

//! To change it later with inbuilt express.json() parser
//a middleware to fetch all the clients requests to the server (parses all incoming request bodies)
const bodyParser = require('body-parser')

const cors = require('cors');

// importing Routers
const authRouter = require('./Routes/authRouter')
const productRouter = require('./Routes/productRouter')

//importing env file
require('dotenv').config();

//importing database connection
require('./Models/db')

//Taking port from env variable file
const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send("PONG")
})

// middleware to parse requests in the body
app.use(bodyParser.json());
app.use(cors())

app.use('/auth',authRouter)

app.use('/products',productRouter)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
