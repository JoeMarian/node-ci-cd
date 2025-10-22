const express = require('express');
const app = express();
const port = 3000;

app.get('/status', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Node.js API is running in a container'
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});