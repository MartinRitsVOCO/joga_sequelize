import loadModels from "../../models/index.js";
const models = await loadModels();
await models.Article.sync();

class AdminArticleController {
    async create(req, res) {
        try {
            const { name, slug, image, body, published, authorId } = req.body;
            const newArticle = await models.Article.create({ name, slug, image, body, published, authorId });
            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create article', details: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await models.Article.destroy({ where: { id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete article', details: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, slug, image, body, published, authorId } = req.body;
            const [updated] = await models.Article.update(
                { name, slug, image, body, published, authorId },
                { where: { id } }
            );
            if (updated) {
                const updatedArticle = await models.Article.findByPk(id);
                res.status(200).json(updatedArticle);
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to update article', details: error.message });
        }
    }
}

export default new AdminArticleController();