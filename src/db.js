import Sequelize from 'sequelize';

const sequelize = new Sequelize('sql10626710', 'sql10626710', 'fAqTmLaFUH', {
  host: 'sql10.freemysqlhosting.net',
  port: 3306,
  dialect: 'mysql',
});

export default sequelize;