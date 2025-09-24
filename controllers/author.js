import loadModels from "../models/index.js";
const models = await loadModels();
await models.Author.sync();

class AuthorController {
    async getAllByPK(req, res) {
        const { id } = req.params;
        try {
            const author = await models.Author.findByPk(id, {
                include: [{ model: models.Article }]
            });
            if (author) {
                res.json(author);
            } else {
                res.status(404).json({ error: 'Author not found.' });
            }
        } catch (error) {
            console.error('Error fetching author:', error);
            res.status(500).json({ error: 'An error occurred while fetching the author.' });
        }
    }
}

export default new AuthorController();