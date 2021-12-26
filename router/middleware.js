// 그냥 하나만 내보낼땐 module.exports ={}

// 여러개 내보낼땐 exports.이름 = 함수나..뭐 데이터
// 이게 미들웨어니 다음꺼그냥 실행시킴됨
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    msg: "로그인필요",
  });
};
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    msg: "로그인 불필요",
  });
};
