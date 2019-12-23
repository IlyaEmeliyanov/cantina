const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 10,
        required: [true, 'A user must have a name'],
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: [true, 'The email is already in use'],
        validate: [validator.isEmail, 'The email must be a valid email']
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: [true, 'A user must have a password'],
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function(val){
                return val === this.password;
            },
            message: 'Passwords have to be equal'
        },
        minlength: 4,
        maxlength: 20,
        required: [true, 'A user must provide a confirmation of the password'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;