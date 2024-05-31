const express = require('express')
const bodyParser = require('body-parser')
const {connectToMongo} = require('./connection')
const userRouter = require('./routes/user')
const port = 3000


const app = express();
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routs
app.use('/',userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`))
connectToMongo('mongodb://localhost:27017/ats-resume')