import Sequelize from 'sequelize';

const sequelize = new Sequelize('sql10623082', 'sql10623082', 'mQzcueIy2D', {
  host: 'sql10.freemysqlhosting.net',
  port: 3306,
  dialect: 'mysql',
});

export default sequelize;