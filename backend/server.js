import http from 'http'; 

// to use .env file
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

const server = http.createServer(app); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});