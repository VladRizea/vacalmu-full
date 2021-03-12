const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserGenerateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    generatorToken: {
      type: String,
      select: false,
    },
    generatorTokenExpire: Date,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//! Encript token using bcrypt
UserGenerateSchema.pre('save', async function (next) {
  //* Hash token and set to reset password token field
  this.generatorToken = crypto
    .createHash('sha256')
    .update(this.generatorToken)
    .digest('hex');

  //* Set token expire
  this.generatorTokenExpire = Date.now() + 10 * 60 * 1000;
});

module.exports = mongoose.model('UserGenerateTokens', UserGenerateSchema);
