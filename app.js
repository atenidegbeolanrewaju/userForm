const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5050
const userRoute = require('./routes/user');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
    .once ('open', () => {
        console.log('Connected Database')
    })
    .on ('error', (error) => {
        console.log(error)
    });

app.use(express.json());
app.use('/form/user', userRoute);
app.use(bodyParser.urlencoded({ extended : true }));

app.listen(port, () => {
    console.log('Server is running on ' + port)
});