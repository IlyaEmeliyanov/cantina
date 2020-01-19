const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: [true, 'The wine must have a name'],
    },
}, {toJSON: {virtuals: true}, toObject: {virtuals: true}});


const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;