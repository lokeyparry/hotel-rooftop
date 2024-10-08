const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;



// Middleware setup
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true,
}));


const authRoutes = require('./src/routes/authuser.route');
const blogRoutes = require('./src/routes/blog.route');
const commentRoutes = require('./src/routes/comment.route');

// Routes setup
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);


async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    app.get('/', (req, res) => {
        res.send('Hotel Rooftop Server is Running..!');
    });
}



main().then(() => console.log('Mongodb connected successfully!')).catch(err => console.log(err));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});