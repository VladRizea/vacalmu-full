const crypto = require('crypto');
const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    articlesNumber: {
      type: Number,
      default: 0,
    },
    articles: {
      type: [],
    },
  }
);

CategoriesSchema.plugin(mongoose_fuzzy_searching, { fields: [{name:'name', prefixOnly: true,}] });

CategoriesSchema.methods.addArticle = async function (id)
{
  this.articlesNumber++;
  this.articles.push(id);
};

CategoriesSchema.methods.deleteArticle = async function (id)
{
  this.articlesNumber--;
  this.articles.pop(id);
};

module.exports = mongoose.model('Categories', CategoriesSchema);
