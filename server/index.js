// index.js
import express from 'express';
import { completion } from './functions.js';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello from Node.js backend!');
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        
        const response = await completion(prompt);
        res.json({ response });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
