'use strict';

import { readdirSync, readFileSync } from 'fs';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Sequelize, { DataTypes } from 'sequelize';
import { env } from 'process';

// Since ES modules don't have __dirname, we derive it from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const base = basename(__filename);

/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize').Model} Model
 * * @typedef {object} Models
 * @property {Model} Article
 * @property {Model} Author
 * @property {Sequelize} sequelize
 * @property {object} Sequelize
 */

/**
 * Asynchronously loads and initializes all Sequelize models.
 * @returns {Promise<Models>} A promise that resolves to the db object.
 */
const loadModels = async () => {
  const db = {};
  const envConfig = env.NODE_ENV || 'development';

  // Read the JSON config file and parse it.
  const configPath = join(__dirname, '..', 'config', 'config.json');
  const config = JSON.parse(readFileSync(configPath))[envConfig];

  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  const modelFiles = readdirSync(__dirname).filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== base &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

  for (const file of modelFiles) {
    // Dynamically import each model file. This is the asynchronous equivalent of `require()`.
    const module = await import(join('file://', __dirname, file));
    const model = module.default(sequelize, DataTypes);
    db[model.name] = model;
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};

// Export the asynchronous function that loads the models
export default loadModels;