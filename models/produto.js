'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produto.belongsTo(models.Categoria, { foreignKey: 'categoriaId' });
    }
  }
  Produto.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    status: DataTypes.STRING,
    img: DataTypes.STRING,
    valor: DataTypes.DOUBLE,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Produto',
  });
  return Produto;
};