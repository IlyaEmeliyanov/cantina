const Serie = require('../models/serieModel');
const User = require('../models/userModel');
const fs = require('fs');
const mongoose = require('mongoose');

const {DATABASE_DEV} = require('../config/config.json');
mongoose.connect(DATABASE_DEV).then(() => console.log(info('Connected to DB'))).catch(err => console.log(error('Error: ', err.message)));

const readFiles = (path) => {
    const filePath = path;
    const files = fs.readFileSync(filePath);
    const jsonFiles = JSON.parse(files);
    return jsonFiles;
}

const saveFiles = async(files, Model) => {
    await Model.insertMany(files);
}

const deleteFiles = async(Model) => {
    await Model.deleteMany();
}

// const series = readFiles('./series.json');
// const users = readFiles('./users.json');
// saveFiles(series, Serie);
// saveFiles(users, User);
deleteFiles(Serie);