import { useState, useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Link } from 'react-router-dom'
import SignUpModal from './SignUpModal'

export default function NavBar() { 

  const {toggleModals} = useContext(UserContext)

  return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Bibliothèque de Pontault-Combault</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <Link className="nav-link active" to="/">Accueil
                        <span className="visually-hidden">(current)</span>
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                </ul>


                <div className="d-flex">
                    <button
                    onClick={() => toggleModals("signIn")} 
                    className="btn btn-light my-2 my-sm-0 me-2"
                    >Se connecter</button>

                    <button 
                    onClick={() => toggleModals("signUp")}
                    className="btn btn-light my-2 my-sm-0 me-2" 
                    >S'identifier</button>

                    <Link className="btn btn-secondary my-2 my-sm-0" to="/rechercher">Rechercher un livre</Link>
                </div>
                </div>
            </div>
        </nav>
        </>
  )
}
