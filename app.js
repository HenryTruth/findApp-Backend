const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors")
const path = require("path")
const db = require('./config/keys').mongoURI;

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

// 'mongodb://localhost:27017/FindApp'
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(authRoutes);

app.listen(port, console.log(`Server running on  ${port}`));
