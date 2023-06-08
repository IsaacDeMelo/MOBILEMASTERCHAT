import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Produto = sequelize.define('Produto', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    preço: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

export default Produto;