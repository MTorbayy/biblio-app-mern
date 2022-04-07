import {useContext, useState} from 'react'
import { UserContext } from '../context/userContext'


export default function HomePage() {

  const {currentUser} = useContext(UserContext)

  return (
    <>
      <div className="container p-5">

        <h1 className="mt-4 display-2 text-center">Bienvenue sur le site de la bibliothèque de Pontault-Combault.</h1>

        {!currentUser ? (
          <h2 className='mt-1 text-center'>Inscrivez-vous ou connectez-vous pour gérer vos emprunts de livres.</h2>
        ) : (
          <h2 className='mt-1 text-center'>Vous êtes connecté.e à votre espace personnel.</h2>
        )}
        

      </div>
    </>
  )
}
