import {useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../context/userContext'

export default function SearchBook() {
  
  const [searchResult, setSearcResult] = useState([])  
  const {currentUser} = useContext(UserContext)
  const [user, setUser] = useState({})
  const [message, setMessage] = useState("")
  let navigate = useNavigate()
  
  
  
  //Initialisation de l'utilisateur courrant
    useEffect(() => {
        
        if(currentUser) {
            const getInfoUser = async () => {
            
                const data = await fetch(`/users/${currentUser.uid}`)
                const json = await data.json()
                setUser(json)
            }

            getInfoUser()
        }

    }, [])

  //Recherche livre par titre
  const searchBookByTitle = (title) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&langRestrict=fr`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        if(!data.items) {
            setSearcResult([])
            setMessage("Aucun résultat ne correspond à votre recherche.")
        } else {
            setSearcResult(data.items)
            setMessage("")
        }
    })
    .catch(err => {
        alert("Oups, nous avons rencontré une erreur. Veuillez vérifier votre connexion et réessayer.")
        
        navigate('/rechercher')
    }) 
  } 

  //Recherche livre par auteur
  const searchBookByAuthor = (author) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=search+inauthor:${author}&langRestrict=fr`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        if(!data.items) {
            setSearcResult([])
            setMessage("Aucun résultat ne correspond à votre recherche.")
        } else {
            setSearcResult(data.items)
            setMessage("")
        }
    })
    .catch(err => {
        alert("Oups, nous avons rencontré une erreur. Veuillez vérifier votre connexion et réessayer.")
        
        navigate('/rechercher')
    }) 
  } 

  
   const handleTitleSearch = e => {
      e.preventDefault()
      
      authorRef.current.value = ""  
      searchBookByTitle(titleRef.current.value)  
    }

    const handleAuthorSearch = e => {
        e.preventDefault()
        
        titleRef.current.value = ""
        searchBookByAuthor(authorRef.current.value)  
    }

  const titleRef = useRef()
  const authorRef = useRef()

  const addToLoans = (book) => {
    
    const userLoansId = []

    user.userLoans.forEach(item => {
        userLoansId.push(item.googleId)
    })
    
    if(!userLoansId.includes(book.id) && userLoansId.length < 10) {
        //Mise à jour des emprunts
        const newLoans = [...user.userLoans]
        let author = ""
        const date = Date.now()
        const date2 = new Date(date + (604800000*2))
        const date2Format = date2.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        

        if (Array.isArray(book.volumeInfo.authors)) {
            author = book.volumeInfo.authors[0]
        } else {
            author = book.volumeInfo.authors
        }

        newLoans.push({
            googleId : book.id,
            title: book.volumeInfo.title,
            author : author,
            loanDate: Date.now(),
            endLoanDate: date2Format,
            loanRenewed: false
        })
        
        //Mise à jour de l'utilisateur
        const newUser = { ...user, userLoans: newLoans}

        const updateUser = async () => {
            await fetch(`/users/update/${user._id}`, {
                headers: {
                Accept: 'application/json',
                'Content-Type' : 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(newUser)
            })
            .then(alert("Le livre a bien été rajouté à votre liste d'emprunts"))
        }

        updateUser()
        setUser(newUser)
        
    } else {
        alert("Vous avez déjà emprunté ce livre, ou bien vous avez déjà atteint votre limite maximale de livres empruntés (10)")
    } 
    

    
    }
  
  return (
    <div className="container mt-4">
        
            <form onSubmit={handleTitleSearch} className="w-50">
                
                <div className="form-group d-flex mb-3">
                    <input 
                    type="search" 
                    ref={titleRef} 
                    className="form-control" 
                    placeholder="Recherche par titre" 
                    id="titleSearch"
                    required />
                    <button className="btn btn-primary ms-3" type="submit" id="search">Valider</button>
                </div>
                
            </form>

            <form onSubmit={handleAuthorSearch} className="w-50">

                <div className="form-group d-flex mb-3">
                    <input 
                    type="search" 
                    ref={authorRef} 
                    className="form-control" 
                    placeholder="Recherche par auteur" id="authorSearch"
                    required />
                    <button className="btn btn-primary ms-3" type="submit" id="search">Valider</button>
                </div>

            </form>
        

        {searchResult.length > 0 ? searchResult.map(book => {
            return (
                <div key={book.id} className="card text-white bg-primary mb-3 ">
                    <div className="card-header ">
                        <h3 className='ms-3 mt-2'> Titre : {book.volumeInfo.title} </h3>
                        <h5 className='ms-3'> {book.volumeInfo.subtitle} </h5>
                    </div>
                    
                    <div className="card-body">

                    <div className="row m-2">
                            <div className="col-6">
                                    <h3> Auteur : {book.volumeInfo.authors}</h3>
                                    <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt="" />
                                    <p className='mt-2'>Nombre d'exemplaires disponibles : 2</p>
                                    
                            </div>


                            <div className="col-6">
                                    <h2>Résumé : </h2>
                                    <p>{book.volumeInfo.description}</p>
                                    
                            </div>
                        </div>
                        
                    </div>

                    {currentUser && (
                        <button 
                        onClick={() => addToLoans(book)}
                        type="button" 
                        className="btn btn-secondary w-25 mb-4 ms-4"

                        >Ajouter à ma liste d'emprunts</button>
                    )}
                    
                </div>
            )
        }) : <div> {message} </div>}

    </div>
    
  )
}


