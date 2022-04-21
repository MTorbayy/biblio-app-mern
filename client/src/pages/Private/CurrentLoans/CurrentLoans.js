import {useState, useEffect, useRef, useContext} from 'react'
import { UserContext } from '../../../context/userContext'

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


    const deleteBook = (book) => {

            const newLoans = []

        userLoans.forEach(item => {
            if(item._id != book._id) {
                newLoans.push(item)
            }
        })

        console.log(newLoans)

        const newUser = {...user, userLoans : newLoans}

        console.log(newUser)
        console.log(user)

        const updateUser = async () => {
            await fetch(`/users/update/${user._id}`, {
                headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(newUser)
            })
        }

        updateUser()
        setUser(newUser)
        window.location.reload()
        
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
                            <td className="align-middle"><button type="button" className="btn btn-primary">Prolonger</button></td>
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

