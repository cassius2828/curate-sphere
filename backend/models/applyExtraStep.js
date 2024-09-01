function applyExtraSetup(sequelize) {

  const { Exhibition, Artwork, User } = sequelize.models;

  Exhibition.belongsTo(User, { foreignKey: "userId" });
  Exhibition.belongsToMany(Artwork, { through: "ExhibitionArtworks" });
  Artwork.belongsToMany(Exhibition, { through: "ExhibitionArtworks" });
  User.hasMany(Exhibition, { foreignKey: "userId" });
}

module.exports =  applyExtraSetup ;


