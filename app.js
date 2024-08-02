const path = require("path");
const fs = require('fs');

const express = require("express");
const cors = require('cors')

const app = express();

const upcomingRouter = require('./routes/upcoming')
const completedRouter = require('./routes/completed')

app.use(express.json())
app.use(cors())

app.use('/public', express.static(__dirname + '/public'));

// app.use('/upcoming-images', express.static('uploads/upcoming'));
// app.use('/completed-images', express.static('uploads'));


// Serve index.html at the root URL
app.get('/', (req, res) => {
    console.log(__dirname, 'public')
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/upcoming', upcomingRouter)
app.use('/completed', completedRouter)

app.get('/files/upcoming', (req, res) => {
    const directoryPath = path.join(__dirname, 'public', 'uploads',  'upcoming');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        res.json(files);
    });
});

// Endpoint to get filenames from the 'completed' folder
app.get('/files/completed', (req, res) => {
    const directoryPath = path.join(__dirname, 'public', 'uploads', 'completed');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        res.json(files);
    });
});

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});