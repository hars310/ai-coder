import express from 'express';
import morgan from 'morgan';
import dbconnection from './dbConnection/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dbconnection();

const app = express();

// it will log all the requests in the console
app.use(morgan('dev'));

// to use json and urlencoded 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

// to use routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

//routes
app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)


export default app;
