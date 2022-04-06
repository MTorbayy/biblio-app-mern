import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    description: String,
    nbCopiesAvailable: Number
})

const bookModel = mongoose.model('books', bookSchema)

export default bookModel