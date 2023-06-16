import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Cena = sequelize.define('Cena', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perfil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fala:{
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

export default Cena; 