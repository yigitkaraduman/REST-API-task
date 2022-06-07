const express = require('express');
require('dotenv').config();
const connectDB = require('./connection.js');

const DBURI = process.env.DBURI;
connectDB(DBURI);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get('/', (req,res) =>{
    res.send('hello');
})

const countryRoutes = require('./routes/countries');
app.use('/countries', countryRoutes);



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`);
})