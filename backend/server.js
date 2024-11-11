const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const userRoutes = require('./routes/auth');  // Import the user routes

const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb+srv://ysshalini911:ECwfe9T8a9Cpqj2v@myapp.zrhii.mongodb.net/?retryWrites=true&w=majority&appName=myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

// API routes
app.use('/api', userRoutes);  // Use routes defined in auth.js

// RSS Proxy route to fetch RSS feeds
app.get('/rss-proxy', async (req, res) => {
    try {
        const { url } = req.query;
        const response = await axios.get(url);
        res.set('Content-Type', 'application/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        res.status(500).send('Error fetching RSS feed');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
