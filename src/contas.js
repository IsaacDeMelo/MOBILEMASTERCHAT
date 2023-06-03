import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Conta = sequelize.define('Conta', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perfil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yen:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  });

export default Conta;