const mongoose = require('mongoose');

const validateMongoID = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if(!isValid){
    throw new Error("Object ID is not Valid");
  }
}

module.exports = { validateMongoID }