import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const User = sequelize.define('User', {
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  perfil: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default User; 

