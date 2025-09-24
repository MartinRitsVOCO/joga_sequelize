import loadModels from "../models/index.js";
const models = await loadModels();
await models.Article.sync();

class ArticleController {
    async getAll(_req, res) {
        try {
            const articles = await models.Article.findAll();
            res.json(articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
            res.status(500).json({ error: 'An error occurred while fetching articles.' });
        }
    }

    async getBySlug(req, res) {
        const { slug } = req.params;
        try {
            const article = await models.Article.findOne({
                where: { slug },
                include: [
                    { model: models.Author },
                    {
                        model: models.Tag,
                        through: {
                            model: models.ArticleTags
                        }
                    }
                ]
            });
            if (article) {
                res.json(article);
            } else {
                res.status(404).json({ error: 'Article not found.' });
            }
        } catch (error) {
            console.error('Error fetching article:', error);
            res.status(500).json({ error: 'An error occurred while fetching the article.' });
        }
    }
}

export default new ArticleController();