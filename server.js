const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const config = require('config');
app.use(express.json());

const db = config.get('mongURI');

// Connect db
mongoose
.connect(db,{useNewUrlParser:true, useCreateIndex:true})
.then(()=> console.log("DB connected."))
.catch(err=> console.log(err));

//Assert Route
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;


app.listen(port, ()=> console.log(`Server run on port : ${port}`));