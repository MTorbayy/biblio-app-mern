import {useState, useEffect, useRef, useContext} from 'react'
import { UserContext } from '../../../context/userContext'

export default function CurrentLoans() {

    const {currentUser} = useContext(UserContext)
    const [userLoans, setUserLoans] = useState([])
    const [bookList, setBookList] = useState([])
    const [user, setUser] = useState({})
    const [loadingData, setloadingData] = useState(true)



    //Initialisation de l'utilisateur courrant
    const userLoansTitles = []
    const bookListArray = []

    
    const getInfoUser = async () => {
        
        // fetch(`/users/${currentUser.uid}`)
        // .then(response => {
        //     return response.json()
        // })
        // .then(data => {
        //     data.userLoans.forEach(item => {
        //         // userLoansId.push(item.googleId)
        //         fetch(`https://www.googleapis.com/books/v1/volumes/${item.googleId}`)
        //         .then(response => {
        //             return response.json()
        //         })
        //         .then(data => {
        //             bookListArray.push(data)
        //         })
        //         })
        //     })

        //     setBookList(bookListArray)
        // }
        
        const data = await fetch(`/users/${currentUser.uid}`)
        const json = await data.json()
        setUserLoans(json.userLoans)
        setUser({name : json.userName, surname : json.userSurname})
    }

    //Récupération des livres correspondant à la liste des ID sur Google Books
    // const bookListArray = []

    // const searchBook = (array) => {

    //     array.forEach(id => {
    //         fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             bookListArray.push(data)
    //         })
    //         })

    //     setBookList(bookListArray)
    // }

    useEffect(() => {
        // const userLoansId = []
        // const bookListArray = []

            
        // fetch(`/users/${currentUser.uid}`)
        // .then(response => {
        //     return response.json()
        // })
        // .then(data => {
        //     data.userLoans.forEach(item => {
        //         // userLoansId.push(item.googleId)
        //         fetch(`https://www.googleapis.com/books/v1/volumes/${item.googleId}`)
        //         .then(response => {
        //             return response.json()
        //         })
        //         .then(data => {
        //             bookListArray.push(data)
        //         })
        //         })
        //         // setBookList(bookListArray)
        //         console.log(bookListArray)
        // })
        
        // setBookList(bookListArray)
        getInfoUser()
        // setloadingData(false)
    }, [])

    
    //Récupération des livres correspondant à la liste des ID sur Google Books
    // useEffect(() => {
    //      if(firstCall) return

        // if(userLoans.length > 0) {
        //     const bookListArray = []

            // const searchBook = (id) => {
            //     fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            //     .then(response => {
            //         return response.json()
            //     })
            //     .then(data => {
            //         bookListArray.push(data)
            //     })
            // }

            // userLoans.forEach(id => {
            //     searchBook(id)
            // })

            // setBookList(bookListArray)
        // }


    // }, [userLoans])

    
    
    // useEffect(() => {
    //     console.log("useEffect")
    //     const userLoansId = []
    //     const bookListArray = []

    //     if(currentUser) {
    //         const getInfoUser = async () => {
            
    //             const data = await fetch(`/users/${currentUser.uid}`)
    //             const json = await data.json()
    //             json.userLoans.forEach(id => {
    //                 userLoansId.push(item.googleId)
    //             })
    //             setUserLoans(userLoansId)
    //         }

    //         getInfoUser()
    //     }

    //     console.log("useEffect", userLoans)

    //     //Récupération des données des livres empruntés sur l'API Google Books
    //     // const bookListArray = []

    //     const searchBook = (id) => {
    //         fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             bookListArray.push(data)
    //         })
    //     }

    //     console.log(userLoans)
    //     userLoans.forEach(id => {
    //         searchBook(id)
    //     })

    //     setBookList(bookListArray)
        

    // }, [])

    
    // //Récupération des données des livres empruntés sur l'API Google Books
    // const bookListArray = []

    // const searchBook = (id) => {
    //     fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
    //     .then(response => {
    //         return response.json()
    //     })
    //     .then(data => {
    //         setBook(data)
    //     })
    // }

    // userLoans.forEach(id => {
    //     console.log(id)
    //     searchBook(id)
    // })

    // setBookList(bookListArray)
    // console.log(bookListArray)
    
    // console.log(userLoans)

    // useEffect(() => {
        // //Récupération des données des livres empruntés sur l'API Google Books
        // const bookListArray = []

        // const searchBook = (id) => {
        //     fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        //     .then(response => {
        //         return response.json()
        //     })
        //     .then(data => {
        //         bookListArray.push(data)
        //     })
        // }

        // console.log(userLoans)
        // userLoans.forEach(id => {
        //     searchBook(id)
        // })

        // setBookList(bookListArray)
    // }, [userLoans])
    
    console.log(userLoans)

  return (
    <>
      {user.name && <h1 className='mt-4'>{user.name} {user.surname}, voici votre liste de prêts en cours.</h1>} 

       {user.name && userLoans.map(item => {
           return (
           <div key={item._id}>
           
           <div>{item.title}</div>
           <div>{item.author}</div>
           <div>{item.endLoanDate}</div>
           <button type="button" className="btn btn-primary">Prolonger l'emprunt de deux semaines</button>
           <button type="button" className="btn btn-secondary">Supprimer de ma liste d'emprunts</button>
           </div>)
       })}
        
    </>  
  )
  
}