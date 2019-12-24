const express = require('express');
const app = express();
const mongoose = require('mongoose');

const clc = require('cli-color');

const info = clc.cyanBright;
const error = clc.redBright;


const {port, DATABASE_DEV, DATABASE_PROD, NODE_ENV} = require('./config/config.json');
const serieRouter = require('./router/serieRoutes');
const authRouter = require('./router/authRoutes');

const globalError = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

console.log(info(`You are in ${process.env.NODE_ENV} mode👽`));

DATABASE_PROD.replace('<password>', process.env.DB_PASSWORD);

if(process.env.NODE_ENV === 'production')
    mongoose.connect(DATABASE_PROD, options).then(() => console.log(info('Connected to DB'))).catch(err => console.log(error('Error: ', err.message)));
else
    mongoose.connect(DATABASE_DEV, options).then(() => console.log(info('Connected to DB'))).catch(err => console.log(error('Error: ', err.message)));

process.env.NODE_ENV = NODE_ENV;



function config(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

app.use(config);

app.use('/', (req, res) => {
    res.send("Hello World");
});
app.use('/serie', serieRouter);
app.use('/main', authRouter);
app.use('*', (req, res, next) => {
    next(new AppError(`Invalid path ${req.path}`));
});
app.use(globalError);

const connectionPort = process.env.PORT || port;

app.listen(connectionPort, () => console.log(info('Connected to port:', connectionPort)));