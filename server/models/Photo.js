const crypto = require('crypto');
const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const PhotoSchema = new mongoose.Schema(
  {
    name: {
        type: String,
    },
    url: {
        type: String,
    },
    uploader: {
        type: String,
    },
  }
);

PhotoSchema.plugin(mongoose_fuzzy_searching, { fields: [{name:'name', prefixOnly: true,}] });

PhotoSchema.methods.addArticle = async function (id)
{
  this.articlesNumber++;
  this.articles.push(id);
};

PhotoSchema.methods.deleteArticle = async function (id)
{
  this.articlesNumber--;
  this.articles.pop(id);
};

module.exports = mongoose.model('Photo', PhotoSchema);
