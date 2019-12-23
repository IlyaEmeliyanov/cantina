const mongoose = require('mongoose');

const SerieSchema = new mongoose.Schema({
    wine: {
        type: String,
        required: [true, 'The serie must have a wine'],
        enum: ['vino1', 'vino2', 'vino3'],
        minlength: 3,
        maxlength: 15
    },
    qty: {
        type: Number,
        required: [true, 'The serie must have a quantity'],
        min: 0,
        max: 1000
    },
    date: {
        type: Date,
        default: Date.now()
    },
    person: {
        type: String,
        required: [true, 'The serie must have a receiver'],
    },
    purpose: {
        type: String,
        enum: ['Omaggio', 'Ordine'],
        required: [true, 'The serie must have a purpose'],
    },
    comment: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'The serie must have a comment'],
    },
    destination: {
        type: [Number],
        index: '2dsphere',
        required: [true, 'The serie must have a destination']
    }
}, { toJSON: {virtuals: true}, toObject: {virtuals: true}});

const Serie = mongoose.model('Serie', SerieSchema);

module.exports = Serie;