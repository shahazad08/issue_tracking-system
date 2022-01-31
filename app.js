const express = require('express');

const bodyParser = require('body-parser');

const app = express();

//Enviornment Variables
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT

app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Routes Define
const productRoutes=require('./src/routes/product.router')
const studentRoutes = require('./src/routes/student.routes')
const userRoutes=require('./src/routes/user.routes')

const dbConfig=require("./config/db.config")
dbConfig.connect()

app.use('/products', productRoutes)
app.use('/api/students', studentRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
  });