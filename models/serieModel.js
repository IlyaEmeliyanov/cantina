const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema({
    wine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wine',
        required: [true, 'The serie must have a wine']
    },
    qty: {
        type: Number,
        required: [true, 'The serie must have a quantity'],
        min: 1,
        max: 1000
    },
    date: {
        type: Date,
        default: Date.now()
    },
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The serie must have a receiver'],
    },
    purpose: {
        type: String,
        required: [true, 'The serie must have a purpose'],
    },
    comment: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'The serie must have a comment'],
    },
    destinationStr: {
        type: String,
        required: [true, 'The serie must have a destination']
    }
}, { toJSON: {virtuals: true}, toObject: {virtuals: true}});

serieSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'person',
        select: '-__v -role -password -passwordConfirm -_id'
    });
    next();
});

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;