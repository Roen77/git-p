// passport 사용의 공통점은 module.exports =()=>{}
// 바로안내보내고 함수형식으로 내보낸다는것..
// 세션 직렬화 역직렬화
// 내가 다 함수로 내보내서 쓰는곳에서는 함수를 호출하면 된다

const passport = require("passport");
const local = require("./local");
const db = require("../models");

module.exports = () => {
  passport.serializeUser(function (user, done) {
    return done(null, user.id);
  });
  passport.deserializeUser(async function (id, done) {
    try {
      const exUser = await db.User.findOne({ where: { id } });
      return done(null, exUser);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  });

  //   여기서 다실행
  local();
};
