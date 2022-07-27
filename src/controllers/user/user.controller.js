import * as express from 'express';
import { check_req } from '../../middlewares/userValidation';


// 컨트롤러에는 유효성 검사 , 데이터 컨버팅 후 
// 서비스 레이어와 상호작용만 하도록
const post_user = (req, res) => {
    console.log(req.body);
    res.json(req.body);
}

export { post_user }