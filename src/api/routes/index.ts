import { Router } from 'express';

import developerRoutes from '../v1/developer';

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Developer api is live!' });
});

apiRouter.use('/developer', developerRoutes);

export default apiRouter;
