import express from "express";
import * as vali from './userValidation'
import UserController from './user.controller';
const router = express.Router();


// 로그인 요청
router.post('/login', UserController.post_login)

// Access_token 발급받기
router.get('/auto-login', UserController.get_access_token)



// 회원가입 요청
router.post("/", vali.check_req, UserController.post_user);

router.put("/", (req, res) => {
  console.log(`${req.method} 가 요청되었습니다.`);
  res.send(`${req.method} 가 요청되었습니다.`);
});



// --------테스트 요청--------

// 유저 정보 전체 가져오기
router.get("/", UserController.get_user);

// 유저 정보 아이디로 가져오기
router.get("/:id", UserController.get_user_id);

export default router;
