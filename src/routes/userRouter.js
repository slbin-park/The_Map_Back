import express from "express";
import UserRouter from "../user/user.controller";
import { check_req } from "../middlewares/userValidation";
const router = express.Router();

// 스케쥴 관련 요청을 scrouter로 이동
router.get("/", UserRouter.get_user);

router.get("/:id", UserRouter.get_user_id);


router.post("/", check_req, UserRouter.post_user);

router.put("/", (req, res) => {
  console.log(`${req.method} 가 요청되었습니다.`);
  res.send(`${req.method} 가 요청되었습니다.`);
});

export default router;
