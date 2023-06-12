const mongoose = require('mongoose')

const dbConnect = () => {
  try{
    const connect = mongoose.connect(process.env.MONGODB_URL)
    console.log("database connected successfully")
  }catch(error){
    console.log("Error on Database : ", error);
  }
}

module.exports = dbConnect;