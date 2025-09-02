const express = require('express');
const app = express();
const _PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to sequelize application' });
});

app.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}`);
});