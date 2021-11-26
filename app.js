const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()
const multer = require('multer')
const upload = multer()



const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

  
// app.use(upload.array()); 

// middleware
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/FindApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((result) => {
    console.log('mongoDb connected...')
    app.listen(3000)
})
.catch((err) => console.log(err));


app.use(authRoutes);