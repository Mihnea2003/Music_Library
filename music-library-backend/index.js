const express = require('express');
const songRoutes = require('./routes/Songs_route');
const albumRoutes = require('./routes/Albums_route');
const artistRoutes = require('./routes/Artists_route');

const app = express();

// Middleware
app.use(express.json());

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
