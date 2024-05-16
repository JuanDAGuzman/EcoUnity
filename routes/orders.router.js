const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/delete-item', async (req, res, next) => {
  try {
    const body = req.body;
    const deletedItem = await service.deleteItem(body);
    res.status(200).json(deletedItem);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id;
    await service.deleteOrder(orderId);
    res.status(200).json({ message: 'Orden eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
});



router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.get('delete-item', async (req, res, next) => {
  validatorHandler(addItemSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newItem = await service.deleteItem(body);
        res.status(201).json(newItem);
      } catch (error) {
        next(error);
      }
    };
});

module.exports = router;
