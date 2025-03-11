import express from 'express';
import morgan from 'morgan';
import dbconnection from './dbConnection/db.js';

dbconnection();

const app = express();

// it will log all the requests in the console
app.use(morgan('dev'));

// to use json and urlencoded 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to use routes
app.get('/', (req, res) => {
    res.send('Hello World');
});


export default app;
