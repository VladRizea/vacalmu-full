const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'please add some content'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  unlikes: {
    type: Number,
    default: 0,
  },
  likers: {
    type: [],
  },
  unlikers: {
    type: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  articleId: {
    type: String,
  },
  user: {
    name: String,
    _id: String,
  },
});

ReviewSchema.methods.like = async function (userId) {
  if (!this.likers.includes(userId) && !this.unlikers.includes(userId)) {
    console.log('1');
    this.likes++;
    this.likers.push(userId);
  } else if (!this.likers.includes(userId) && this.unlikers.includes(userId)) {
    console.log('2');
    this.likes++;
    this.unlikes--;
    this.likers.push(userId);

    const index = this.unlikers.indexOf(userId);
    if (index > -1) {
      this.unlikers.splice(index, 1);
    }
  } else if (this.likers.includes(userId) && !this.unlikers.includes(userId)) {
    console.log('3');
    this.likes--;
    this.unlikes++;
    this.unlikers.push(userId);
    const index = this.likers.indexOf(userId);
    if (index > -1) {
      this.likers.splice(index, 1);
    }
  }
};

module.exports = mongoose.model('Review', ReviewSchema);
