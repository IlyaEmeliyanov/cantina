const express = require('express');
const app = express();
const mongoose = require('mongoose');

const clc = require('cli-color');

const info = clc.cyanBright;
const error = clc.redBright;


const {port, DATABASE, NODE_ENV} = require('./config/config.json');
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
mongoose.connect(DATABASE, options).then(() => console.log(info('Connected to DB'))).catch(err => console.log(error('Error: ', err.message)));
process.env.NODE_ENV = NODE_ENV;

function config(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
};

app.use(config);

app.use('/serie', serieRouter);
app.use('/', authRouter);
app.use('*', (req, res, next) => {
    next(new AppError(`Invalid path ${req.path}`));
});
app.use(globalError);

const connectionPort = process.env.PORT || port;

app.listen(connectionPort, () => console.log(info('Connected to port: ', connectionPort)));