
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const cors = require('cors');

const app = express();
const port = 8080;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err))

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/myapp', router);    
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
