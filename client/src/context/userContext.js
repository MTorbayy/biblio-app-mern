import { createContext, useState, useEffect } from "react"


export const UserContext = createContext()

export function UserContextProvider(props) { //Composant d'ordre supérieur permettant de transmettre les données au reste de l'application



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

    return (
        <UserContext.Provider value={{modalState, toggleModals}}>
            {props.children} 
        {/* Ici props.children correspond à App */}
        </UserContext.Provider>
    )
    //, signUp, currentUser, signIn
    //!loadingData && 
}