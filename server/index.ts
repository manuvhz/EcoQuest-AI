import express from 'express';
import cors from 'cors';
import getRoutes from './api/get';
import postRoutes from './api/post';
import putRoutes from './api/put';
import deleteRoutes from './api/delete';
import getChallengeRoutes from './api/getChallenge';
import getAchievementRoutes from './api/getAchievement';
import getEcoTipRoutes from './api/getEcoTip';
import getUserRoutes from './api/getUser';

const app = express();
const port = 3001;

// Middlewares
// Use a more explicit CORS configuration to ensure cross-origin requests are allowed.
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// FIX: Using express.json() without an explicit path resolves the TypeScript overload issue.
app.use(express.json());

// API Routes
app.use('/api', getRoutes);
app.use('/api', postRoutes);
app.use('/api', putRoutes);
app.use('/api', deleteRoutes);
app.use('/api', getChallengeRoutes);
app.use('/api', getAchievementRoutes);
app.use('/api', getEcoTipRoutes);
app.use('/api', getUserRoutes);

app.listen(port, () => {
  console.log(`Servidor EcoQuest funcionando en http://localhost:${port} 🌱`);
});