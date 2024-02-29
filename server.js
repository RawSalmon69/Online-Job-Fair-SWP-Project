const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'});

connectDB()

const app = express()

//Body Parser
app.listen(express.json())
//Cookie Parser
app.use(cookieParser())

//Route files


//Mount routers



const PORT = process.env.PORT || 5050
app.listen(PORT, console.log('Server is running in ', process.env.NODE_ENV, 'mode on port: ', PORT))

process.on('unhandledRejection', (err,) => {
    console.log(`Error: ${err.message}`)
    server.close(() => process.exit(1))
})