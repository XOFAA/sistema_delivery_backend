'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bairros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bairros.init({
    bairro: DataTypes.STRING,
    taxa: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Bairros',
  });
  return Bairros;
};