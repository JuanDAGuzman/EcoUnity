const express = require('express');
const passport = require('passport');

const UserService = require('./../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
  getUserMailSchema,
} = require('./../schemas/user.schema');

const authenticateJWT = passport.authenticate('jwt', { session: false });

const router = express.Router();
const service = new UserService();

const checkRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

router.get(
  '/',
  authenticateJWT,
  checkRoles(['admin']),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  authenticateJWT,
  checkRoles(['admin']),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/email/:email',
  validatorHandler(getUserMailSchema, 'params'),
  async (req, res, next) => {
    try {
      const { email } = req.params;
      const category = await service.findByEmail(email);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const newUser = await service.create({ email, password });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
