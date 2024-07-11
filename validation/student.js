const Joi = require('joi');
const studentSchema = Joi.object({
    rollNo: Joi.string().required(),
    name: Joi.string().required(),
    studentClass: Joi.string().required(),
    section: Joi.string().required(),
    contactNo: Joi.string().pattern(/^[0-9]+$/).required(),


});

module.exports =studentSchema;