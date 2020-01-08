//initialise express

const express = require('express'); 
const connectDB = require('./config/db');
const path = require('path');

const app = express(); 

// Connect Database 
connectDB();

//Init middleware 

app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

//Define API routes 

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

