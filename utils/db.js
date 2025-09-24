import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('joga_sequelize', 'root', 'qwerty', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;