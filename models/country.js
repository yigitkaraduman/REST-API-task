const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: String,
    region: String
});

module.exports = mongoose.model('Countries', CountrySchema);