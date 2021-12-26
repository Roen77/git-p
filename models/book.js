const Sequelize = require("sequelize");

module.exports = class Book extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utr8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Book.belongsTo(db.User);
  }
};
