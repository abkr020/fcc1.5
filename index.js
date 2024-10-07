const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle file upload
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Prepare file metadata
    const fileMetadata = {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    };

    res.json(fileMetadata);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
