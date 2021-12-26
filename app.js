const express = require("express");
const app = express();
const cors = require("cors");
const prod = process.env.NODE_ENV === "production";
const PORT = 5000;
// 쿠키와 세션 가져오기
const session = require("express-session");
const cookie = require("cookie-parser");
// db를 내보냈으니 그안에있는 sequelize를 가져온건뿐...
const { sequelize } = require("./models");
// passport 실행할거가져오기
const passportConifg = require("./passport");
const passport = require("passport");

// 라우터 가져오기
const userRouter = require("./router/user");

// sequelize 연결
sequelize
  .sync()
  .then(() => {
    console.log("db 연결성공");
  })
  .catch((err) => {
    console.log(err);
  });
// db연결하고나서 걍 passport 해주기
passportConifg();

//   cors 에러 바지
app.use(cors());

// json 인식등 처리
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passport 세션 처리를해주기전에 세션과 쿠키 내가 해줘야함
app.use(cookie("123"));
const sesstionOption = {
  resave: false,
  saveUninitialized: false,
  secret: "123",
  cookie: {
    httpOnly: false,
    secure: false,
  },
};
app.use(session(sesstionOption));
// 패스포트는 초기화먼저시켜주고 세션처리해주어야함
app.use(passport.initialize());
app.use(passport.session());

// 라우터 연결
app.use("/user", userRouter);

app.get("/", (req, res, next) => {
  return res.json({
    url: "hi",
  });
});

// app.listen(포트번호, 콜백함수);
app.listen(prod ? process.env.PORT : PORT, () => {
  console.log(`${prod ? process.env.PORT : PORT}번에서 실행중`);
});
