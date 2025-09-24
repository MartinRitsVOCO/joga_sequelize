import { Sequelize } from "sequelize";
import sequelize from "../utils/db.js";

import Article from "../models/article.js";
const ArticleModel = Article(sequelize, Sequelize.DataTypes);
await ArticleModel.sync();

class ArticleController {
    async getAll(_req, res) {
        try {
            const articles = await ArticleModel.findAll();
            res.json(articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
            res.status(500).json({ error: 'An error occurred while fetching articles.' });
        }
    }
}

export default new ArticleController();