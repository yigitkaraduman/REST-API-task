const express = require('express');
const router = express.Router();
const Countries = require('../models/country');


router.get('/', async (req, res) => {
    let region  = req.query.region;
    let countries = '';
    
    if(region == undefined)
        countries = await Countries.find({});
    else
        countries = await Countries.find({region:region});

    res.send(countries);
})

module.exports = router;
