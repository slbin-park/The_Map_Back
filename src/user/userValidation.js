const check_req = (req, res, next) => {
  const body = req.body;
  console.log("middleware");
  console.log(body)
  if (body.user_name == "") {
    console.log("이름이 공백입니다.");
    res.send("이름이 공백");
    return;
  }
  else {
    next();
  }
};

export { check_req };