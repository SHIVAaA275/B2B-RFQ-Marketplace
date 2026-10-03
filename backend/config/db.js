const mongoose = require('mongoose')
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const ConnectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connnected  Successfully");
    }catch(error){
        console.log("MongoDB connection failed:", error.message);
        process.exit(1);
    }
    
}

module.exports = ConnectDB