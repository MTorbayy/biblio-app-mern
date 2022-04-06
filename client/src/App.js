import {useState, useEffect} from 'react'
import './bootstrap.min.css'
import NavBar from './components/NavBar'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'


function App() {

  // const [books, setBooks] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch('/books/')
  //     const json = await data.json()
  //     setBooks(json)
  //   }

  //   fetchData()
  // }, [])

  // console.log(books)
  
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/contact' element={<h1 className='mt-4'>Contact</h1>}/>
        <Route path='/*' element={<h1 className='mt-4'>Not Found 404</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
