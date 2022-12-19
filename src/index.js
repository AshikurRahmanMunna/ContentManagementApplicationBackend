const express = require('express');
const cors = require('cors');
const dbConnect = require('./dbConnnect');
require('dotenv').config();
require('colors');

// routes import
const blogRoutes = require('./routes/blog.routes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

dbConnect();

app.get('/', (req, res) => {
    res.send('Server is running')
})

// routes
app.use('/api/blogs', blogRoutes)

app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`.blue);
});