import dotenv from 'dotenv';
dotenv.config(); // Load .env first

import http from 'http';
import app from './app.js';

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
