import express from 'express';
import morgan from 'morgan';
import paymentRoutes from './routes/payment.routes.js';
import { PORT } from './config.js';

const app = express();

// Middleware para registrar las solicitudes en la consola
app.use(morgan('dev'));

// Middleware para manejar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Ruta para la integración con Mercado Pago
app.use(paymentRoutes);

// Manejo de errores (middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Hubo un error en el servidor');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log('Servidor en ejecución en el puerto', PORT);
});
