import {useState, useEffect, useRef} from 'react'

export default function SearchBook() {
  
  const [titleSearchResult, setTitleSearchResult] = useState([])  

  
  
  
  const searchBookByTitle = (title) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&langRestrict=fr`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        setTitleSearchResult(data.items)
    }) 
  } 

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
  
  return (
    <div className="container mt-4">

            <form onSubmit={handleTitleSearch} className="w-50">
            <div className="input-group mb-3">
                <input 
                type="search"
                ref={titleRef} 
                className="form-control" 
                placeholder="Recherche par titre" aria-label="titleSearch" aria-describedby="button-addon2"
                required />
                <button className="btn btn-primary" type="submit" id="search">Valider</button>
            </div>
            </form>

            <form onSubmit={handleAuthorSearch} className="w-50">
            <div className="input-group mb-3">
                <input 
                type="search"
                ref={authorRef} 
                className="form-control" 
                placeholder="Recherche par auteur" aria-label="titleSearch" aria-describedby="button-addon2"
                required />
                <button className="btn btn-primary" type="submit" id="search">Valider</button>
            </div>
            </form>
    
        {titleSearchResult.map(book => {
            return (
                <div key={book.id} className="card text-white bg-primary mb-3">
                    <div className="card-header">
                        <h3> Titre : {book.volumeInfo.title} </h3>
                        <h4> {book.volumeInfo.subtitle} </h4>
                    </div>
                    
                    <div className="card-body">

                    <div key={book.id} className="row m-2">
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
                </div>
            )
        })}

    </div>
    
  )
}

