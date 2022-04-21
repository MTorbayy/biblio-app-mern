import { createContext, useState, useEffect } from "react"
import {
    signInWithEmailAndPassword, //s'identifier
    createUserWithEmailAndPassword, //s'inscrire
    onAuthStateChanged // Observer : prise en compte des changements (connexion, deconnexion etc)
} from "firebase/auth"
import {auth} from "../firebase-config" //Pour obtenir une autorisation de connexion


export const UserContext = createContext()

export function UserContextProvider(props) { //Composant d'ordre supérieur permettant de transmettre les données au reste de l'application

    //Création nouvel utilisateur
    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)

    //Connexion
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)
    
    //Gestion utilisateur
    const [currentUser, setCurrentUser] = useState()
    const [loadingData, setLoadingData] = useState(true)

    //Identificatione et stockage dans une variable de l'utilisateur connecté
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadingData(false)
            // console.log(currentUser.uid)
        })

        //Déconnexion lors de la destruction du composant (cleanup function)
        return unsubscribe


    }, [])

    //Gestion des modales
    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false
    })

    const toggleModals = modal => {
        if(modal === "signIn") {
            setModalState({
                signUpModal: false,
                signInModal: true
            })
        }
        if(modal === "signUp") {
            setModalState({
                signUpModal: true,
                signInModal: false
            })
        }
        if(modal === "close") {
            setModalState({
                signUpModal: false,
                signInModal: false
            })
        }
    }

    //Gestion de l'utilisateur - BDD utilisateurs MongoDB
    const [infoUser, setInfoUser] = useState({})
    
    // useEffect(() => {
        
    //     if(currentUser) {
    //         const getInfoUser = async () => {
            
    //             const data = await fetch(`/users/${currentUser.uid}`)
    //             const json = await data.json()
    //             setInfoUser(json)
                
    //         }

    //         getInfoUser()
    //     }

    // }, [])

    return (
        <UserContext.Provider value={{modalState, toggleModals, signUp, signIn, currentUser, infoUser}}>
            {!loadingData && props.children} 
        {/* Ici props.children correspond à App */}
        {/* On envoie le props.children seulement quand les données sont chargées grâce à loadingData */}
        </UserContext.Provider>
    )
}