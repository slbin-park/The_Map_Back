import express from "express";
import user from "./userRouter";
import community from './communityRouter'

const router = express();

router.use("/v1/user", user);
router.use("/v1/community", community);


export default router;
