import React, {useContext} from 'react'
import { UserContext } from '../../context/userContext'
import {Outlet, useLocation, Navigate } from 'react-router-dom'
//Outlet permet de montrer des routes imbriquées
//useLocation permet d'avoir des infos sur la location

export default function Private() {

    const {currentUser} = useContext(UserContext)
    console.log("PRIVATE", currentUser)

    //Si pas de user, alors back to home :
    if(!currentUser) {
        return <Navigate to="/" />
    }
    
  return (
  <div>
      <Outlet />
      {/* Sortie de la route imbriquée, ici PrivateHome comme défini dans App.js */}
  </div>
  )
}