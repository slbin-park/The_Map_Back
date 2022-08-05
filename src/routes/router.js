import express from "express";
import user from "../user/userRouter";
import community from '../community/communityRouter'

const router = express();

router.use("/v1/user", user);
router.use("/v1/community", community);


export default router;
