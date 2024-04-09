const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const service = new OrderService();


const router = express.Router();

router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);
//Para agregar productos a un usuario debemos ir a mirar el customerId en la base de datos pgadmin
//luego de revisar y tener el customerId podemos ir a insomnia para poner el customerId correcto
module.exports = router;
