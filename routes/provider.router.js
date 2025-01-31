const express = require('express');
const ProviderService = require('../services/provider.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProviderSchema, updateProviderSchema, getProviderSchema } = require('../schemas/provider.schema');

const router = express.Router();
const service = new ProviderService();

router.get('/', async (req, res, next) => {
  try {
    const providers = await service.find();
    res.json(providers);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const provider = await service.findOne(id);
      res.json(provider);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProvider = await service.create(body);
      res.status(201).json(newProvider);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  validatorHandler(updateProviderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const provider = await service.update(id, body);
      res.json(provider);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getProviderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
