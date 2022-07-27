import express, { Request, Response, NextFunction } from "express";
import * as user from '../controllers/user/user.controller';
import { check_req } from '../middlewares/userValidation';
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.get("/", (req, res) => {
    res.send(`${req.method} 가 요청되었습니다.`)
});

router.post("/", check_req, user.post_user)

router.put("/", (req, res) => {
    console.log(`${req.method} 가 요청되었습니다.`)
    res.send(`${req.method} 가 요청되었습니다.`)
})

export default router;
