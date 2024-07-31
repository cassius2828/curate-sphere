// set up art-piece model with sequelize - this model is a many-to-many relationship with exhibition
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class ArtPiece extends Model {
        // define relationships here
    }
    ArtPiece.init({
        objectId: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'ArtPiece',
    });
    return ArtPiece;
}