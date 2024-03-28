import Joi from 'joi';

export const createAddressSchema = Joi.object({
    addressLine: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    cityCode: Joi.string().required(),
    customer_id: Joi.number().required()
});
