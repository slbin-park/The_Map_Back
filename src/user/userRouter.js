import express from "express";
import * as vali from './userValidation'
import UserController from './user.controller';
const router = express.Router();
import * as JWT from '../middlewares/jwt'

// 로그인 요청
router.post('/login', UserController.post_login)

// Access_token 발급받기
router.get('/auto-login', UserController.get_access_token)

// 유저 아이디 찾기
router.get("/:user_name/:email", UserController.get_user_id);

// 회원가입 요청
router.post("/", vali.check_req, UserController.post_user);

router.put("/profile", JWT.check_access_token, UserController.update_user_profile);




// --------테스트 요청--------

// 유저 정보 전체 가져오기
router.get("/", UserController.get_user);



export default router;
