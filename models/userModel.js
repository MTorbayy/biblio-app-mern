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

const userModel = mongoose.model('users', userSchema) //Nom de la bdd

export default userModel