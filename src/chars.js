import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Chars = sequelize.define('Chars', {
    
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    charName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    charImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    charDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    attributeJSON: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skillsOwned: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    
  });

export default Chars;