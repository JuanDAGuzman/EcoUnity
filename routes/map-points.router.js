const express = require('express');
const MapPointService = require('./../services/map-point.service');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mapPoints = await MapPointService.findAll();
    res.json(mapPoints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newMapPoint = await MapPointService.create(body);
    res.status(201).json(newMapPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedMapPoint = await MapPointService.update(id, body);
    res.json(updatedMapPoint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await MapPointService.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
