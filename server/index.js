require('dotenv').config({path: '.env'});
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const users = require('./routes/users')
const mongoLink = process.env.DBCONNECTION

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

mongoose.connect(mongoLink, { useFindAndModify: false, useNewUrlParser: true,useUnifiedTopology: true })
    .then (() => console.log("Connected.."))
    .catch (err => console.error(err));



app.use(express.json());
app.use('/user', users);


