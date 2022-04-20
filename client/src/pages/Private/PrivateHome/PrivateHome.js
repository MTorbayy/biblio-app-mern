import {useState, useContext, useEffect} from 'react'
import { UserContext } from '../../../context/userContext'


export default function PrivateHome() {

  // const [name, setName] = useState("")
  // const {currentUser} = useContext(UserContext)

  // useEffect( () => {
  //   const fetchData = async () => {
  //     const data = await fetch(`/users/${currentUser.uid}`)
  //     const json = await data.json()
  //     setName(json.userName)
  //   }

  //   fetchData()
  // }, [])

  return (
    <>
        <div className="container p-5">
            <h1 className="display-3 text-center mb-4">Bienvenue dans votre espace personnel.</h1>
        </div>
    </>
  )
}