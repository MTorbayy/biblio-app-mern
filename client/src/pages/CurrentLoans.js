import {useState, useEffect, useRef, useContext} from 'react'
import { UserContext } from '../context/userContext'

export default function CurrentLoans() {

    const {currentUser} = useContext(UserContext)
    const [userLoans, setUserLoans] = useState([])
    const [user, setUser] = useState({})



    //Initialisation de l'utilisateur courrant
    const getInfoUser = async () => {
        const data = await fetch(`/users/${currentUser.uid}`)
        const json = await data.json()
        setUserLoans(json.userLoans)
        setUser(json)
    }

    useEffect(() => {
        getInfoUser()
    }, [])


    //Supprimer un livre
    const deleteBook = (book) => {

        const newLoans = []

        userLoans.forEach(item => {
            if(item._id != book._id) {
                newLoans.push(item)
            }
        })

        const newUser = {...user, userLoans : newLoans}

        const updateUser = async () => {
            await fetch(`/users/update/${user._id}`, {
                headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(newUser)
            })
            .then(alert("Le livre a bien été supprimé."))
        }

        updateUser()
        setUser(newUser)
        window.location.reload()
        
    }

    //Prolonger l'emprunt
    const changeDate = (book) => {

        if (!book.loanRenewed) {
            const newEndLoanDate = new Date(book.loanDate + (604800000*4))
            const newEndLoadDateFormat = newEndLoanDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

            const newBook = {...book, endLoanDate: newEndLoadDateFormat, loanRenewed : true}
            const newLoans = []

            userLoans.forEach((item) => {
                if(item._id != book._id) {
                    newLoans.push(item)
                } else {
                    newLoans.push(newBook)
                }
            })

            const newUser = {...user, userLoans : newLoans }

            const updateUser = async () => {
                await fetch(`/users/update/${user._id}`, {
                    headers: {
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(newUser)
                })
                .then(alert("La durée de l'emprunt a été prolongée de deux semaines"))
            }
    
            updateUser()
            setUser(newUser)

            window.location.reload()
        } else {
            alert("Vous avez déjà prolongé la durée de l'emprunt.")
        }
        
    }

  return (
    <>
        <div className="container">   
        {user.userName && <h1 className='mt-5'>{user.userName} {user.userSurname}, voici votre liste de prêts en cours.</h1>} 

        <table className="table table-hover mt-5">
                <thead>
                    <tr>
                    <th scope="col">Livres empruntés</th>
                    <th scope="col">Auteur</th>
                    <th scope="col">Date limite d'emprunt</th>
                    <th scope="col">Prolonger d'une semaines</th>
                    <th scope="col">Supprimer de ma liste</th>
                    </tr>
                </thead>
                <tbody>
                    {user.userName && userLoans.map(item => { 
                        return( 
                            <tr key={item._id}>
                            <th scope="row">{item.title}</th>
                            <td>{item.author}</td>
                            <td>
                                {item.endLoanDate}
                            </td>
                            <td className="align-middle">
                                <button 
                                onClick={() => changeDate(item)}
                                type="button" 
                                className="btn btn-primary">Prolonger</button>
                            </td>
                            <td className="align-middle">
                                <button 
                                onClick={() => deleteBook(item)}
                                type="button" 
                                className="btn btn-secondary">Supprimer</button>
                            </td>
                            </tr>)
                        })
                    }
                </tbody>
        </table>
        </div>     
    </>  
  )
  
}

