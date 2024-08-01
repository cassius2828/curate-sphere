'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtPiece extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArtPiece.belongsToMany(models.Exhibition, { through: 'ExbArtworks', foreignKey: 'ArtPieceId' })
    }
  }
  ArtPiece.init({
    objectId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ArtPiece',
  });
  return ArtPiece;
};