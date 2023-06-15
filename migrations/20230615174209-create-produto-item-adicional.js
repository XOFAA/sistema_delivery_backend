'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProdutoItemAdicional', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      produtoId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'Produtos',
          key: 'id',
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        },
      },
      itemAdicionalId: {
        type: Sequelize.INTEGER,
        allowNull:true,
        references: {
          model: 'ItemAdicionais',
          key: 'id',
          onUpdate:'CASCADE',
          onDelete:'CASCADE'
        }
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
    await queryInterface.dropTable('ProdutoItemAdicional');
  }
};