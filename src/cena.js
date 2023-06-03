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
      defaultValue: function (){
        return "https://images2.alphacoders.com/100/1008472.png"
      }
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

export default Cena; 