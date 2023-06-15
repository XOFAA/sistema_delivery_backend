'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemAdicional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemAdicional.belongsToMany(models.Produto, {
        through: 'produtoitemadicional', // Nome da tabela intermediária
        foreignKey: 'itemAdicionalId',
        otherKey: 'produtoId',
        as: 'produtos', // Nome da associação
      });
    }
  }
  ItemAdicional.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    valor: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'ItemAdicional',
    tableName:'itemadicionais'
  });
  return ItemAdicional;
};