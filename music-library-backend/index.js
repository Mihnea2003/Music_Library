const express = require('express');
const songRoutes = require('./routes/Songs_route');
const albumRoutes = require('./routes/Albums_route');
const artistRoutes = require('./routes/Artists_route');

const app = express();

// Middleware
app.use(express.json());
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
// Routes
app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/artists', artistRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
} catch (error) {
    console.error('Failed to start server:', error);
}
