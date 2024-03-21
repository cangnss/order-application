import Joi from 'joi';

export const createProductSchema = Joi.object({
    imageUrl: Joi.string().required(),
    name: Joi.string().required()
});
