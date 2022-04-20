import {useState, useEffect} from 'react'
import NavBar from './components/NavBar'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Private from "./pages/Private/Private"
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome"
import SignInModal from './components/SignInModal'
import SignUpModal from './components/SignUpModal'
import SearchBook from './pages/SearchBook'


function App() {

  const [books, setBooks] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch('/users/')
  //     const json = await data.json()
  //     setBooks(json)
  //   }

  //   fetchData()

  //   const addBook = async () => {
  //     await fetch('/users/', {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type' : 'application/json'
  //       },
  //       method: 'POST',
  //       body: JSON.stringify({   
  //         userName: "Stéphane",
  //         userSurname: "Torbay",
  //         userLoans: [
  //             {
  //                 googleId: "livre1",
  //                 loanDate: "2012-04-21T18:25:43-05:00",
  //                 endLoanDate: "2022-04-21T18:25:43-05:00",
  //                 loanRenewed: false
  //             },
  //             {
  //                 googleId: "livre1",
  //                 loanDate: "2002-04-21T18:25:43-05:00",
  //                 endLoanDate: "2012-04-21T18:25:43-05:00",
  //                 loanRenewed: false
  //             }
  //         ]
  //     })
  //     })
  //   }

  //   addBook()
  // }, [])

  // console.log(books)
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/contact' element={<h1 className='mt-4'>Contact</h1>}/>
        <Route path='/rechercher' element={<SearchBook/>}/>
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
          <Route path="/private/prets-en-cours" element={<h1 className='mt-4'>Prêts en cours</h1>} />
        </Route>
        <Route path='/*' element={<h1 className='mt-4'>Not Found 404</h1>}/>
      </Routes>
      <SignUpModal/>
      <SignInModal/>
    </>
  );
}

export default App;
