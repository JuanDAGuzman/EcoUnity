const express = require('express');
const passport = require('passport');

const MapPointService = require('./../services/map-point.service');

const router = express.Router();

const authenticateJWT = passport.authenticate('jwt', { session: false });

const checkRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

router.get('/', async (req, res) => {
  try {
    const mapPoints = await MapPointService.findAll();
    res.json(mapPoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateJWT, checkRoles(['admin']), async (req, res) => {
  try {
    const body = req.body;
    const newMapPoint = await MapPointService.create(body);
    res.status(201).json(newMapPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch(
  '/:id',
  authenticateJWT,
  checkRoles(['admin']),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedMapPoint = await MapPointService.update(id, body);
      res.json(updatedMapPoint);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  '/:id',
  authenticateJWT,
  checkRoles(['admin']),
  async (req, res) => {
    try {
      const { id } = req.params;
      await MapPointService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
