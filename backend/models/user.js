const { Model } = require("sequelize");

class User extends Model {
    // define relationships here
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profileImg: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
