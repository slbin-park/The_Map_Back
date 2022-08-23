import express from "express";
import CommunityController from "../community/community.controller";
import * as JWT from "../middlewares/jwt"
const router = express.Router();

// 커뮤니티 불러오기
router.get("/:last_community_id", CommunityController.get_community);

// 메인화면 불러오기
router.get("/main/:user_id", CommunityController.get_main)

// 게시글 저장하기
router.post("/", JWT.check_access_token, CommunityController.post_community);


// 수정예정
// router.get("/:id", CommunityController.get_community_id);

export default router;
