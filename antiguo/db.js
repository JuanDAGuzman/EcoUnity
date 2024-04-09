const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Tu usuario de PostgreSQL
  host: 'localhost', // Host de la base de datos
  database: 'EcoUnity', // Nombre de tu base de datos
  password: 'b4s3datos*', // Tu contraseña de PostgreSQL
  port: 5432, // El puerto en el que corre tu instancia de PostgreSQL (5432 es el predeterminado)
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};


