module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: { // new
      type: DataTypes.STRING,
      unique: true,
    },
    bio: { // new
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headerImg: { // new
      type: DataTypes.STRING,
    },
    profileImg: {
      type: DataTypes.STRING,
    },
  });
  // Add the toJSON method to exclude the password field
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };
  return User;
};
