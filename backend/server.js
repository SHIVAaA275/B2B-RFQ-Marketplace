require('dotenv').config()
const cors = require('cors')
const express = require('express')
const ConnnectDB = require('./config/db')
const router = require('./routes/authRoutes')
const User = require('./models/User')
const cookieParser = require("cookie-parser");
const rfqRoutes = require("./routes/rfqRoutes");
const quotationRoutes = require("./routes/quotationRoutes");

const app = express()

ConnnectDB()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())


app.use('/api/auth', router )

app.use('/api/rfq', rfqRoutes)

app.use('/api/quotation', quotationRoutes)






app.listen(5000,()=>{
    console.log("server is running");
    
})