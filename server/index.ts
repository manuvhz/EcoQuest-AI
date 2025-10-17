import express from 'express';
import cors from 'cors';
import getRoutes from './api/get';
import postRoutes from './api/post';

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', getRoutes);
app.use('/api', postRoutes);

app.listen(port, () => {
  console.log(`Servidor EcoQuest funcionando en http://localhost:${port} 🌱`);
});
