import express from "express";
import UserRouter from "../user/user.controller";
import { check_req } from "../middlewares/userValidation";
import CommunityController from "../community/community.controller";
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.get("/", CommunityController.get_community);

router.get("/:id", CommunityController.get_community_id);

router.post("/", check_req, CommunityController.post_community);


export default router;
