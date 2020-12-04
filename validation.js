const Joi = require('@Hapi/joi');

const validation = data => {
    const schema = Joi.object({
    name: Joi.string()
            .required(),
    email: Joi.string()
            .required()
            .email(),
    phone: Joi.string()
            .required(),
    DOB : Joi.date()
            .required()
    });
    return schema.validate(data);
};

module.exports = validation;