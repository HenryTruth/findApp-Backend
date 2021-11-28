const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors")

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));


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