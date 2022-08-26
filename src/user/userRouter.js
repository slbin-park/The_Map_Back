import express from "express";
import * as vali from './userValidation'
import UserController from './user.controller';
const router = express.Router();
import * as JWT from '../middlewares/jwt'

// 로그인
router.post('/login', UserController.post_login)

// Access_token 발급받기
router.get('/auto-login', UserController.get_access_token)

// 유저 아이디 찾기
router.get("/user-id/:user_name/:email", UserController.get_user_id);

// 회원가입
router.post("/", vali.check_req, UserController.post_user);

// 프로필 수정하기
router.put("/profile", JWT.check_access_token, UserController.update_user_profile);

// 비밀번호 변경 전 체크 
router.get("/password/:user_id/:user_name", UserController.check_user_password);

// 비밀번호 변경
router.put("/password", JWT.check_access_token, UserController.update_user_password);

// 팔로우
router.post("/follow/:following_user_id", JWT.check_access_token, UserController.save_follow);

// --------테스트 요청--------

// 유저 정보 전체 가져오기
router.get("/", UserController.get_user);



export default router;
