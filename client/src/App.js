import {useState, useEffect} from 'react'
import NavBar from './components/NavBar'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignInModal from './components/SignInModal'
import SignUpModal from './components/SignUpModal'
import SearchBook from './pages/SearchBook'
import CurrentLoans from './pages/CurrentLoans'
import Contact from './pages/Contact'


function App() {
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/rechercher' element={<SearchBook/>}/>
        <Route path="/prets-en-cours" element={<CurrentLoans/>} />
        <Route path='/*' element={<h1 className='mt-4'>Not Found 404</h1>}/>
      </Routes>
      <SignUpModal/>
      <SignInModal/>
    </>
  );
}

export default App;
