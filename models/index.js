// 대문자로 sequelize 소환
const Sequelize = require("sequelize");
// config 호출하려고 설정
const env = process.env.NODE_ENV || "development";
// config 가져와야함 이걸로 db 만드니간요..
const config = require(__dirname + "/../config/config.js")[env];
// 저장할 객체 생성
const db = {};

// db 모델 가져옴
const User = require("./user");
const Book = require("./book");

// 생성자 함수로 인스턴스 생성해줄 함수 만들기
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
// 이거빼먹엇다..
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db 객체에 모델들 넣어주기
db.User = User;
db.Book = Book;

// init 함수로 실행시켜주기
User.init(sequelize);
Book.init(sequelize);

// associate로 실행시켜주기
User.associate(db);
Book.associate(db);

// db는 사용할거라 내보내줘라
module.exports = db;
