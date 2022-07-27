import express from 'express';
import user from './userRouter'

const router = express();

router.use('/user', user);


export default router;