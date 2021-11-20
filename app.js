const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(express.urlencoded({
    extended: true
  }));
  

// middleware
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FindApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((result) => {
    console.log('mongoDb connected...')
    app.listen(3000)
})
.catch((err) => console.log(err));





// database connection


// routes
// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
// app.use(authRoutes);

app.use(authRoutes);