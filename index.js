import express, { json, urlencoded } from 'express';
import { Sequelize } from 'sequelize';
const app = express();
const sequelize = new Sequelize('joga_sequelize', 'root', 'qwerty', {
    host: 'localhost',
    dialect: 'mysql'
});
const _PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to sequelize application' });
});

app.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}`);
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}