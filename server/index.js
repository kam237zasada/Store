require('dotenv').config({path: '.env'});
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const users = require('./routes/users')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))

mongoose.connect('mongodb+srv://kam237zasada:kam237zasada@cluster0.mz2cl.mongodb.net/test', { useFindAndModify: false, useNewUrlParser: true,useUnifiedTopology: true })
    .then (() => console.log("Connected.."))
    .catch (err => console.error(err));



app.use(express.json());
app.use('/user', users);


