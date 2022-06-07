const express = require('express');
require('dotenv').config();
const connectDB = require('./connection.js');

const DBURI = process.env.DBURI;
connectDB(DBURI);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get('/', (req,res) =>{
    res.send('hello from my rest API project!');
})

//routes for countries
const countryRoutes = require('./routes/countries');
app.use('/countries', countryRoutes);

//routes for salesrep
const salesrepRoutes = require('./routes/salesrep');
app.use('/salesrep', salesrepRoutes);

//routes for optimal
const optimalRoutes = require('./routes/optimal');
app.use('/optimal', optimalRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serving on port: ${PORT}`);
})