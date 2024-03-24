import Joi from 'joi';

export const createOrderSchema = Joi.object({
    quantity: Joi.number().integer().required(),
    price: Joi.number().required(),
    status: Joi.string().required(),
    product_id: Joi.number().integer().required(),
    address_id: Joi.number().integer().required(),
    customer_id: Joi.number().integer().required(),
});
