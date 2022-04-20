import {useState, useEffect, useRef, useContext} from 'react'
import { UserContext } from '../context/userContext'

export default function SearchBook() {
  
  const [titleSearchResult, setTitleSearchResult] = useState([])  
  const {currentUser, infoUser} = useContext(UserContext)
  const [newInfoUser, setNewInfoUser] = useState({})

  console.log(currentUser.uid, infoUser)
  
  
  //Recherche livre par titre
  const searchBookByTitle = (title) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&langRestrict=fr`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        setTitleSearchResult(data.items)
    }) 
  } 

  //Recherche livre par auteur
  const searchBookByAuthor = (author) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=search+inauthor:${author}&langRestrict=fr`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        setTitleSearchResult(data.items)
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

  const updateUser = async () => {
    await fetch((`/users/update/${infoUser._id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(infoUser)
      }))
  }

  const fetchData = async () => {
        const data = await fetch(`/users/${currentUser.uid}`)
        const json = await data.json()
        console.log(json)
      }

  const addToLoans = (book) => {
    
    //Mise à jour des emprunts
    const newLoans = [...infoUser.userLoans]

    newLoans.push({
        googleID : book.id,
        loanDate: new Date(),
        endLoanDate: new Date(),
        loanRenewed: false
    })

    //Mise à jour de l'utilisateur
    const newUser = { ...infoUser, userLoans: newLoans}

    setNewInfoUser(newUser)

    console.log(newUser)
    console.log(infoUser._id)

    // updateUser()
    fetchData()

    
    }
  
  return (
    <div className="container mt-4">
        
            <form onSubmit={handleTitleSearch} className="w-50">
                
                <div className="form-group d-flex mb-3">
                    <input 
                    type="search" 
                    ref={titleRef} 
                    className="form-control" 
                    placeholder="Recherche par titre" id="titleSearch" />
                    <button className="btn btn-primary ms-3" type="submit" id="search">Valider</button>
                </div>
                
            </form>

            <form onSubmit={handleAuthorSearch} className="w-50">

                <div className="form-group d-flex mb-3">
                    <input 
                    type="search" 
                    ref={authorRef} 
                    className="form-control" 
                    placeholder="Recherche par auteur" id="authorSearch" />
                    <button className="btn btn-primary ms-3" type="submit" id="search">Valider</button>
                </div>

            </form>
        

        {titleSearchResult.map(book => {
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
                                    <img src={book.volumeInfo.imageLinks.smallThumbnail} />
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
        })}

    </div>
    
  )
}


