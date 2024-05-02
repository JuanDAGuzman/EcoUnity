const { Model, DataTypes, Sequelize } = require('sequelize');

const MAP_POINT_TABLE = 'map_points';

const MapPointSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  latitude: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  longitude: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class MapPoint extends Model {
  static associate(models) {
    // Agrega aquí las asociaciones si las necesitas
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MAP_POINT_TABLE,
      modelName: 'MapPoint',
      timestamps: false
    }
  }
}

module.exports = { MapPoint, MapPointSchema };
