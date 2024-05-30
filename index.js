const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');
const engine = require('ejs-mate');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');
const { config } = require('./config/config');

const app = express();
const port = config.port;

app.use(express.json());

const whitelist = [
  'http://localhost:3000',
  'http://localhost:8080',
  'https://myapp.co',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:5501',
<<<<<<< HEAD
=======
  'http://127.0.0.1:5500/templates/pages/recuperar.html',
  '/api/v1/customers',
>>>>>>> c8fcf6953ad109de80b43f2315a41c0fa41030f9
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

<<<<<<< HEAD
app.use(cors({
  origin: '*'
}));
=======
app.use(cors(options));
app.use(paymentRouter);
>>>>>>> c8fcf6953ad109de80b43f2315a41c0fa41030f9

app.engine('ejs', engine);
app.set('view engine', 'ejs');

require('./utils/auth');

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/templates/pages/inicio.html');
});

app.get('/pago', (req, res) => {
  res.sendFile(process.cwd() + '/templates/pages/pago.html');
});

app.get('/maps', (req, res) => {
  res.sendFile(process.cwd() + '/src/views/index.html');
});

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}`);
});
