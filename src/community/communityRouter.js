import express from "express";
import CommunityController from "../community/community.controller";
import * as JWT from "../middlewares/jwt"
const router = express.Router();

// 전체 다 불러오기
router.get("/", CommunityController.get_community);

router.get("/:id", CommunityController.get_community_id);

router.get("/main/:user_id", CommunityController.get_main)
// 메인화면 불러오기
router.post("/", JWT.check_access_token, CommunityController.post_community);


export default router;
