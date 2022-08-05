import express from "express";
import UserRouter from "../user/user.controller";
import * as vali from './userValidation'
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.get("/", UserRouter.get_user);


router.get("/:id", UserRouter.get_user_id);

// 로그인 요청
router.post('/login', UserRouter.post_login)

// 회원가입 요청
router.post("/", vali.check_req, UserRouter.post_user);

router.put("/", (req, res) => {
  console.log(`${req.method} 가 요청되었습니다.`);
  res.send(`${req.method} 가 요청되었습니다.`);
});

export default router;
