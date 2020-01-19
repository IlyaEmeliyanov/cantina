const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const {NODE_ENV, privateKey, JWT_COOKIE_EXPIRES_IN} = require('../config/config.json');

const AppError = require('../utils/AppError');
const bcrypt = require('bcryptjs');

const createJwt = (value) => {
    const token = jwt.sign({value}, privateKey, {
        expiresIn: '100d'
    });
    return token;
}

const createAndSendToken = (user, statusCode, res) => {
    const token = createJwt(user._id);
    const cookieOpt = {
      expires: new Date(
        Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    if (NODE_ENV === 'production') cookieOpt.secure = true;
  
    user.password = undefined;
    user.passwordConfirm = undefined;
  
    res.cookie('jwt', token, cookieOpt); // inserting the token in the cookies field of the clients computer
    
    res.header('x-auth-token', token);
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
};

exports.signup = catchAsync(async(req, res, next) => {
    const {name, email, password, confirmPassword, role} = req.body;

    User.findOne({email}).then(async(user) => {
        if(user) {
            console.log(user);
            return res.status(400).json({msg: 'User already exists'});
        }
        const newUser = await User.create({
            name, 
            email,
            password,
            confirmPassword,
            role
        });

        console.log('User was created in the database');

        createAndSendToken(newUser, 200, res);
    })

});

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;
    
    if(!email || !password) return next(new AppError('You must specify email and password fields', 400));
    
    const user = await User.findOne({email});
    const compared = await bcrypt.compare(password, user.password);
    
    if(compared && user) createAndSendToken(user, 200, res);
    else return next(new AppError('No user found with that credentials', 401));
});

exports.getMe = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) return next(new AppError('No user in the database with that ID', 400));
    res.json({
        status: 'succces',
        data: {
            _id: user._id,
            email: user.email,
            name: user.name
        }
    });
});

exports.deleteMe = catchAsync(async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.protect = catchAsync(async(req, res, next) => {
    if(!req.headers.authorization) return next(new AppError('You have to specify a JWT', 401));

    const token = req.headers.authorization.split(' ')[1];

    if(!token) return next(new AppError('You are not logged in', 401));

    const decoded = await jwt.decode(token, privateKey);

    const freshUser = await User.findById(decoded.value);
    if(!freshUser) return next(new AppError('This user does no longer exist', 401));

    req.user = freshUser;

    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.role))
            next();
        else
            return next(new AppError('You do not have permissions to perform this action', 403));
    };
}
