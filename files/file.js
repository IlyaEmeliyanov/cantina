const Serie = require('../models/serieModel');
const fs = require('fs');
const mongoose = require('mongoose');

const {DATABASE} = require('../config/config.json');
mongoose.connect(DATABASE).then(() => console.log(info('Connected to DB'))).catch(err => console.log(error('Error: ', err.message)));

const readSeries = () => {
    const filePath = './series.json';
    const files = fs.readFileSync(filePath);
    const jsonFiles = JSON.parse(files);
    return jsonFiles;
}

const saveSeries = async() => {
    const files = readSeries();
    await Serie.insertMany(files);
}

const deleteSeries = async() => {
    await Serie.deleteMany();
}

saveSeries();
// deleteSeries();