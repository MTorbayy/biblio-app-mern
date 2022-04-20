import bookModel from '../models/bookModel.js'

export const getHomePage = async (req, res) => {
    
    console.log('Homepage')
    
    const books = await bookModel.find({})
    res.send(books)
    console.log(books) 
}

export const addBook = async (req, res) => {
    console.log('coucou')
    const book = new bookModel(req.body)

    await book.save()
    res.send(book)
}