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

// FIX: Apply express.json() middleware at the app level to handle JSON payloads.
// This resolves the TypeScript overload issue that was occurring with router.use().
app.use(express.json());

const apiRouter = express.Router();

// Register all API routes on the apiRouter.
apiRouter.use(getRoutes);
apiRouter.use(postRoutes);
apiRouter.use(putRoutes);
apiRouter.use(deleteRoutes);
apiRouter.use(getChallengeRoutes);
apiRouter.use(getAchievementRoutes);
apiRouter.use(getEcoTipRoutes);
apiRouter.use(getUserRoutes);

// Mount the single API router.
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Servidor EcoQuest funcionando en http://localhost:${port} 🌱`);
});