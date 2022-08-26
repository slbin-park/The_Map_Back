const check_req = (req, res, next) => {
  const body = req.body;
  if (body.user_name == "") {
    res.send("이름이 공백");
    return;
  }
  else {
    next();
  }
};

export { check_req };