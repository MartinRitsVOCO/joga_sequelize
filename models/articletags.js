'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ArticleTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Article, { foreignKey: 'articleId' });
      this.belongsTo(models.Tag, { foreignKey: 'tagId' });
    }
  }
  ArticleTags.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    articleId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleTags',
  });
  return ArticleTags;
};