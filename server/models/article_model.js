const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('dotenv').config()
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')

const articleSchema = mongoose.Schema({
  images: {
    type: Array,
    default: []
  },
  title: {
    type: String,
    maxLength: 100,
    required: [true, 'Write a title please.']

  },
  content: {
    type: String,
    required: [true, 'You need some content']
  },
  excerpt: {
    type: String,
    required: [
      true, 'Please add an excerpt'
    ],
    maxLength: 500
  },

  status: {
    type: String,
    required: true,
    enum: [
      'draft', 'public'
    ],
    default: 'public',
    index: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

articleSchema.plugin(aggregatePaginate)

const Article = mongoose.model('Article', articleSchema)
module.exports = {
  Article
}
