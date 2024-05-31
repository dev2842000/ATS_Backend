const mongoose = require('mongoose');

const connectToMongo = (mongoURI) => {
  mongoose.connect(mongoURI).then(()=>{
    console.log('DB connected')
  }).catch((err)=>console.error(err))
}

module.exports = {
    connectToMongo,
};