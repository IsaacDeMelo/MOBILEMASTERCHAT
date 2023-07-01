import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Sequelize from 'sequelize';
import fs from 'fs';

// Obtém o caminho completo para o arquivo config.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const configPath = `${__dirname}/config.json`;

// Lê o conteúdo do arquivo JSON
const jsonData = fs.readFileSync(configPath, 'utf-8');
 
// Converte o conteúdo JSON em um objeto JavaScript
const config = JSON.parse(jsonData);

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect
});

export default sequelize;