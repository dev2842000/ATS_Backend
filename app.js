require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const {connectToMongo} = require('./connection')
const userRouter = require('./Routes/user')
const cors = require('cors');
const port = 3000


const app = express();
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routs
app.use('/',userRouter);

app.listen(port, () => console.log(`app live on port ${port}`))
connectToMongo(process.env.isProduction === "false" ? process.env.mongoURI: process.env.mongoDBProd)