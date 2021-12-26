const passport = require("passport");
// Strategy 를  LocalStrategy 라는 이름으로 쓰겟다
const { Strategy: LocalStrategy } = require("passport-local");
const db = require("../models");
const bcrypt = require("bcrypt");

// 이렇게 시작
// module.exports = () => {
//   passport.use(new LocalStrategy({}));
// };

// 2번째

// module.exports = () => {
//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//       },
//       async (email, password, done) => {}
//     )
//   );
// };

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        // 처리할것
        try {
          // email로 사용자를 찾는다 회원가입이 아닌 로그인할때 쓰는거다
          const exUser = await db.User.findOne({ where: { email } });
          if (!exUser) {
            // return done(에러,성공, 에러메세지);
            return done(null, false, {
              reasion: "가입하지 않은 아이디입니다.",
            });
          }
          //   아이디가 있다면 비밀번호 해쉬로 처리한걸비교해보자
          const result = await bcrypt.compare(password, exUser.password);

          if (result) {
            //   성공
            return done(null, exUser);
          } else {
            return done(null, false, {
              reason: "비밀번호가 일치하지 않습니다.",
            });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
