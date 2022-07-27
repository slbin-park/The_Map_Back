

const check_req = (req) => {
    const body = req.body
    console.log('middleware')
    if (body.user_name == '') {
        console.log('이름이 공백입니다.')
        res.send('이름이 공백')
        return
    }
    next();
}

export { check_req }