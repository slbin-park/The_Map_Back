import express from "express";
import * as vali from './userValidation'
import UserController from './user.controller';
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
// 자동 로그인 요청
router.get('/auto-login', UserController.get_auto_login)


router.get("/", UserController.get_user);


router.get("/:id", UserController.get_user_id);

// 로그인 요청
router.post('/login', UserController.post_login)


// 회원가입 요청
router.post("/", vali.check_req, UserController.post_user);

router.put("/", (req, res) => {
  console.log(`${req.method} 가 요청되었습니다.`);
  res.send(`${req.method} 가 요청되었습니다.`);
});

export default router;
