import Joi from 'joi';

export const createCustomerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

export const updateCustomerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
})
