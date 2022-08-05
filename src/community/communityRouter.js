import express from "express";
import CommunityController from "../community/community.controller";
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.get("/", CommunityController.get_community);

router.get("/:id", CommunityController.get_community_id);

// 로그인
router.get("/login", CommunityController.get_community_id)

// 회원 가입
router.post("/", CommunityController.post_community);


export default router;
