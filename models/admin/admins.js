const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi =  require('joi');


const adminSchema = new mongoose.Schema({
    admin_name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        trim: true,
        unique: true
    },
    phone: {
        type: Number,
        min: 0,
        trim: true,
        // unique: true
    },
    password: {
        type: String,
        minlength: 8,
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

adminSchema.methods.generateLoginToken = function () {
    return jwt.sign({_id: this._id, authority: this.authority}, config.get('JWTKEY'));
}

adminSchema.methods.generatePosToken = function () {
    return jwt.sign({_id: this._id}, config.get('JWTKEY'));
}

const Admin = mongoose.model('Admin', adminSchema);

function validate(admin) {
    const schema = Joi.object({
        admin_name: Joi.string().min(3).max(255),
        email: Joi.string().email().min(3).max(255),
        phone: Joi.number(),
        password: Joi.string().min(8).max(50),
        password_confirmation: Joi.any().equal(Joi.ref('password')).options({ messages: { 'any.only': 'Passwords do not match'} }),
    })

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(admin, options);
}

function validateLogin(reqBody) {
    const schema = Joi.object({
        email: Joi.string().min(0).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
    })

    const options = {
        errors: {
            wrap: {
                label: ''
            }
        }
    };

    return schema.validate(reqBody, options);
}

exports.Admin = Admin;
exports.validate = validate;
exports.validateLogin = validateLogin;
