const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(1).max(50);
const ruc = Joi.string().length(11);
const direccion = Joi.string().min(5).max(100);
const estado = Joi.boolean(); 

const createProviderSchema = Joi.object({
  name: name.required(),
  ruc: ruc.required(),
  direccion: direccion.required(),
  estado: estado.required()
});

const updateProviderSchema = Joi.object({
  name,
  ruc,
  direccion,
  estado
});

const getProviderSchema = Joi.object({
  id: id.required()
});

module.exports = { createProviderSchema, updateProviderSchema, getProviderSchema };
