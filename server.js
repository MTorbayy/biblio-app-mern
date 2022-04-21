import express from "express"
import mongoose from 'mongoose'
import router from './routes/routes.js'
import dotenv from 'dotenv'

//*******Configuration du doc .env pour utilisation avec mongoDB************* */
dotenv.config()

//********* Configuration express*********************** */
const app = express()

app.use(express.json())

app.use(express.static('client/build'))


//***********Configuration mongoose*************** */
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false
  })

//***********Configuration des routes*************** */
app.use('/users/', router)

//***********Configuration du port*************** */
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})