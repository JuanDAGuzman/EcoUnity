const {Sequelize} = require('sequelize');
const {config} = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI= `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;//alt+96 comillas invertidas

const sequelize = new Sequelize(URI,{
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);//recibe la conexion

//sequelize.sync();//no es recomendado en produccion


module.exports = sequelize;

