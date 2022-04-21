import {useState, useEffect} from 'react'
import NavBar from './components/NavBar'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Private from "./pages/Private/Private"
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome"
import SignInModal from './components/SignInModal'
import SignUpModal from './components/SignUpModal'
import SearchBook from './pages/SearchBook'
import CurrentLoans from './pages/Private/CurrentLoans/CurrentLoans'
import Contact from './pages/Contact'


function App() {
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/rechercher' element={<SearchBook/>}/>
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
          <Route path="/private/prets-en-cours" element={<CurrentLoans/>} />
        </Route>
        <Route path='/*' element={<h1 className='mt-4'>Not Found 404</h1>}/>
      </Routes>
      <SignUpModal/>
      <SignInModal/>
    </>
  );
}

export default App;
