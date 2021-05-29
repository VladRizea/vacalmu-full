const mongoose = require('mongoose');
const slugify = require('slugify');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  sanitizedHTML: {
    type: String,
  },
  state: {
    type: String,
    enum: ['draft', 'ready', 'public'],
    default: 'draft',
  },
  thumbnail: {
    type: String,
  },
  user: {
    profilePicture: String,
    name: String,
    _id: String,
  },
  publisher:{
    type: String,
  },
  tags: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  unlikes: {
    type: Number,
    default: 0,
  },
  recomandedArticles: {
    type: [],
  },
  likers: {
    type: [],
  },
  unlikers: {
    type: [],
  },
  reviews: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


ArticleSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    { name: 'title', weight: 5, },
    { name: 'description', weight: 2, prefixOnly: true, },
    { name: 'tags', weight: 3, },
  ]
});

// Create bootcamp slug from the name

ArticleSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.sanitizedHTML = dompurify.sanitize(marked(this.content), {ADD_TAGS: ["iframe", "blockquote"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']});
  next();
});

ArticleSchema.methods.resetSlugAndContent = async function ()
{

  this.slug = slugify(this.title, { lower: true });
  this.sanitizedHTML = dompurify.sanitize(marked(this.content), {ADD_TAGS: ["iframe", "blockquote"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']});
};

ArticleSchema.methods.toggleReviews = async function () {
  this.reviews = !this.reviews;
};

ArticleSchema.methods.toggleVisibility = async function () {
  this.visible = !this.visible;
};

ArticleSchema.methods.like = async function (userId) {
  if (!this.likers.includes(userId) && !this.unlikers.includes(userId)) {
    this.likes++;
    this.likers.push(userId);
  } else if (!this.likers.includes(userId) && this.unlikers.includes(userId)) {
    this.likes++;
    this.unlikes--;
    this.likers.push(userId);

    const index = this.unlikers.indexOf(userId);
    if (index > -1) {
      this.unlikers.splice(index, 1);
    }
  } else if (this.likers.includes(userId) && !this.unlikers.includes(userId)) {
    this.likes--;
    this.unlikes++;
    this.unlikers.push(userId);
    const index = this.likers.indexOf(userId);
    if (index > -1) {
      this.likers.splice(index, 1);
    }
  }
};

module.exports = mongoose.model('Article', ArticleSchema);
