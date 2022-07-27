import * as express from 'express';


// datamanager 에서 데이틀 가져와
// 컨트롤러로 반환해주는 역할
const save = (req, res) => {
    console.log(req.body)
    res.json(req.body)
}

export { save }