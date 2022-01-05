require('dotenv').config();
const taskRoutes = require('./routes/tasks');
const connectDB = require('./database/connect');
const cors = require('cors');

const express = require('express');
const app = express();

// Solve CORS problem
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () =>
            console.log(`Servidor rodando na porta ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
