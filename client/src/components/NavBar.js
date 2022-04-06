import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Bibliothèque de Pontault-Combault</a>
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
                    <a className="nav-link" href="#">Se connecter</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">S'identifier</a>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="text" placeholder="Rechercher un livre"/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Rechercher</button>
                </form>
                </div>
            </div>
        </nav>
  )
}
