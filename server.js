const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors=require('cors')
const connectDB = require('./config/db')
require('dotenv').config()
const user=require('./routes/user')
const post=require('./routes/post')

connectDB()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/',user)
app.use('/post',post)



const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('server is running');
})