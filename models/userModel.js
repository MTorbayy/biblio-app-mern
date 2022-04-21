import mongoose from 'mongoose'

const userSchema = mongoose.Schema({

    userName: {
        type : String,
        required : true
    },
    userSurname: {
        type : String,
        required : true
    },
    userFirebaseID: {
        type : String,
        required : true
    },
    userLoans: [
        {
            googleId: String,
            title: String,
            author: String,
            loanDate: Date,
            endLoanDate: String,
            loanRenewed: Boolean
        }
    ]
    
})

const userModel = mongoose.model('users', userSchema) //Nom de la bdd

export default userModel