const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors")
const path = require("path")

const app = express();

const port = process.env.PORT || 3000

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));


// middleware
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "client")))


mongoose.connect('mongodb://localhost:27017/FindApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((result) => {
    console.log('mongoDb connected...')
    app.listen(port)
})
.catch((err) => console.log(err));


app.use(authRoutes);