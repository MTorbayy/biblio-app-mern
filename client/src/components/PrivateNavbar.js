import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase-config'

export default function PrivateNavBar() { 

  const navigate = useNavigate()

  //Déconnection de l'utilisateur
  const logOut = async () => {
      try {
        await signOut(auth)
        navigate("/")
      } catch {
        alert("Une erreur s'est produite lors de la tentative de déconnexion. Veuillez vérifier votre connexion internet et ré-essayer.")
      }
  }

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

                    <Link className="btn btn-secondary my-2 my-sm-0 me-2" to="/rechercher">Prêts en cours</Link>

                    <Link className="btn btn-secondary my-2 my-sm-0 me-2" to="/rechercher">Rechercher un livre</Link>

                    <button
                    onClick={logOut}
                    className="btn btn-light my-2 my-sm-0 " 
                    >Se déconnecter</button>
                </div>
                </div>
        </nav>
        </>
  )
}