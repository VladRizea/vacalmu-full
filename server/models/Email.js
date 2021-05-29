const crypto = require('crypto');
const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const EmailSchema = new mongoose.Schema(
  {
    email: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },

  }
);

EmailSchema.plugin(mongoose_fuzzy_searching, { fields: [{name:'email', prefixOnly: true,}] });


module.exports = mongoose.model('Email', EmailSchema);
