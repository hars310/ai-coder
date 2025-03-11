import express from 'express';
import morgan from 'morgan';
import dbconnection from './dbConnection/db.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dbconnection();

const app = express();

// it will log all the requests in the console
app.use(morgan('dev'));

// to use json and urlencoded 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// to use routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

//routes
app.use('/api/user', userRoutes)


export default app;
