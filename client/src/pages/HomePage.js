import {useState} from 'react'
import SignInModal from '../components/SignInModal'
import SignUpModal from '../components/SignUpModal'
import NavBar from '../components/NavBar'

export default function HomePage() {


  return (
    <>
      <SignUpModal/>
      <SignInModal/>
      <NavBar/>
      <div className="container p-5">

        <h1 className="mt-4 display-2 text-center">Bienvenue sur le site de la bibliothèque de Pontault-Combault.</h1>
        <h2 className='mt-1 text-center'>Inscrivez-vous ou connectez vous pour gérer vos emprunts de livres.</h2>

      </div>
    </>
  )
}
