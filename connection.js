const mongoose = require('mongoose');

const connectToMongo = (dbUri) => {
  mongoose.connect(dbUri).then(()=>{
    console.log('DB connected')
  }).catch((err)=>console.error(err))
}

module.exports = {
    connectToMongo,
};