import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Comentario = sequelize.define('Comentario', {
    
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
      allowNull: false,
    },
    coment: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

export default Comentario;