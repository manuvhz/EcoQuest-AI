import express from 'express';
import cors from 'cors';
import getRoutes from './api/get';
import postRoutes from './api/post';
import putRoutes from './api/put';
import deleteRoutes from './api/delete';

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
// FIX: Pass an empty options object to express.json() to resolve a TypeScript overload error.
app.use(express.json({}));

// API Routes
app.use('/api', getRoutes);
app.use('/api', postRoutes);
app.use('/api', putRoutes);
app.use('/api', deleteRoutes);

app.listen(port, () => {
  console.log(`Servidor EcoQuest funcionando en http://localhost:${port} 🌱`);
});