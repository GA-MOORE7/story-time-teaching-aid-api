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

mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const database = mongoose.connection;

database.on('error', (error) => {
    console.log('Database Connection Error:', error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on Port ${port}`);
});
