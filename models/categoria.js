'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categoria.hasMany(models.Produto,{
        foreignKey:'categoriaId'
      })
      Categoria.belongsToMany(models.ItemAdicional, {
        through: 'produtoitemadicional', // Nome da tabela intermediária
        foreignKey: 'produtoId',
        otherKey: 'itemAdicionalId',
        as: 'itensAdicionais', // Nome da associação
      });
    }
  }
  Categoria.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName:'Categorias'
  });
  return Categoria;
};