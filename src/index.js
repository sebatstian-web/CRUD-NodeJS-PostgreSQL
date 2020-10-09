const express = require('express');
const morgan = require('morgan');

const app = express();

// MIDDLEWARES
// Procesar la información que llega en formato json (body-parser)
app.use(express.json());
// urlencoded para procesar los datos de los formularios
// extended en false solo procesa un formulario de forma básica
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// RUTAS
app.use(require('./routes/index'));

app.listen(3000, () => console.log('Servidor en puerto 3000'));
