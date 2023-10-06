const mongoose = require('mongoose');

const Destination = mongoose.Schema({
    country: {type: String, required: true},
    title: {type: String}
})

module.exports = mongoose.model('Destination', Destination)