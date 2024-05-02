const { models } = require('./../libs/sequelize');

class MapPointService {
  constructor() {}

  async findAll() {
    return await models.MapPoint.findAll();
  }

  async create(data) {
    return await models.MapPoint.create(data);
  }

  async update(id, changes) {
    const mapPoint = await this.findOne(id);
    return await mapPoint.update(changes);
  }

  async delete(id) {
    const mapPoint = await this.findOne(id);
    await mapPoint.destroy();
  }

  async findOne(id) {
    const mapPoint = await models.MapPoint.findByPk(id);
    if (!mapPoint) {
      throw new Error('Map point not found');
    }
    return mapPoint;
  }
}

module.exports = new MapPointService();
