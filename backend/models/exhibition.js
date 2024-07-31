// set up exhibition model with sequelize - this model belongs to user
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Exhibition extends Model {
        //define relationships here
    }
    Exhibition.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        startDate: {
            type: DataTypes.DATE,
        },
        endDate: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Exhibition',
    });
    return Exhibition;
}