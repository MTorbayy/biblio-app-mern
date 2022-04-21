import express from 'express'
import { catchErrors } from '../helpers.js'
import {getUsers, getUser, addUser, updateUser} from '../controllers/userControllers.js'

//******Configuration du router******* */
const router = express.Router()

//**********Routes******************* */
router.get('/', catchErrors(getUsers))

router.get('/:id', catchErrors(getUser))

router.post('/', catchErrors(addUser))

// router.patch('/update/:id', catchErrors(updateUser) )

router.post('/update/:id', catchErrors(updateUser) )

//*********Définition de l'adresse de la page html du projet client *************** */

// Path avec ES Module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Redirection vers le projet client
router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

export default router