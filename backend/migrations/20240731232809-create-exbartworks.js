'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExbArtworks', {
      ExbId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Exhibitions', // name of Target model
          key: 'id', // key in Target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      ArtPieceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ArtPieces', // name of Target model
          key: 'id', // key in Target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExbArtworks');
  }
};