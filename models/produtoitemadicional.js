'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProdutoItemAdicional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      }
  }
  ProdutoItemAdicional.init({
    produtoId: DataTypes.INTEGER,
    itemAdicionalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProdutoItemAdicional',
    tableName:'produtoitemadicional'
  });
  return ProdutoItemAdicional;
};