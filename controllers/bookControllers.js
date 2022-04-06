import bookModel from '../models/bookModel.js'

export const getHomePage = async (req, res) => {
    
    console.log('Homepage')
    
    const books = await bookModel.find({})
    res.send(books)
    console.log(books)
}