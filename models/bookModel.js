import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({

    userName: {
        type : String,
        required : true
    },
    userSurname: {
        type : String,
        required : true
    },
    userLoans: [
        {
            googleId: {
                type : String,
                required : true
            },
            loanDate: Date,
            endLoanDate: Date,
            loanRenewed: Boolean
        }
    ]
    
})

const bookModel = mongoose.model('books', bookSchema) //Nom de la bdd

export default bookModel