require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.group('Database Connected');
})


const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
})
