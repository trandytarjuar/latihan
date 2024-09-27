import { Router } from 'express';

import v1Router from './v1';
// import cmsRouter from './cms';

const router = Router();

router.use('/v1', v1Router);

export default router;
