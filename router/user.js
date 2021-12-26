const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const db = require("../models");
const passport = require("passport");
router.get("/", isLoggedIn, (req, res, next) => {
  return res.json({
    data: "test uer",
    query: req.query,
    size: req.query.size,
  });
});
router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  return res.json({
    data: "test uer ididid",
    id: req.params.userId,
    query: req.query,
  });
});

router.post("/register", isNotLoggedIn, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 비밀번호 해시처리
    const hash = await bcrypt.hash(password, 12);
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      return res.status(403).json({
        success: false,
        msg: "이미 회원가입됨",
      });
    }
    // 회원가입한 사용자가 없다면 사용자 생성
    await db.User.create({ email, password: hash });

    // return res.json({
    //   msg: "회원가입됨",
    // });

    // 바로 로그인처리
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (info) {
        return res.status(401).json({
          success: false,
          msg: info.reason,
        });
      }
      return req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        // 사용자정보찾기
        const userInfo = await db.User.findOne({ where: { id: user.id } });

        return res.json(userInfo);
      });
    })(req, res, next);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

// 주소는 그대로 친다.
/*
 */
