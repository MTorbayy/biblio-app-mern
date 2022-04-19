import React, {useContext, useRef, useState} from 'react'
import {UserContext} from "../context/userContext"
import {useNavigate} from 'react-router-dom'

export default function SignInModal() {
  const {modalState, toggleModals, signIn} = useContext(UserContext)

    const navigate = useNavigate()

    const [validation, setValidation] = useState('')

    const inputs = useRef([])
    

    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const formRef = useRef()


    const handleForm = async (e) => {
        e.preventDefault()

        //inscription d'un nouvel utilisateur :

        try {
            const cred = await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
            
            //Quand inscription réussie :
            formRef.current.reset()
            setValidation("")

            //cred est un objet avec un nouvel utilisateur :
            //console.log(cred)
            toggleModals("close")
            navigate("/private/private-home")


        } catch {
            setValidation("Email et/ou mot de passe incorrect")
        }
    }

    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }

  return (
  <>
    {modalState.signInModal && (
    <div className="position-fixed top-0 vw-100 vh-100">
        <div 
        onClick={closeModal}
        className="w-100 h-100 bg-primary bg-opacity-75">
        </div>

            <div className="position-absolute top-50 start-50 translate-middle"
            style={{minWidth: "400px"}}
            >
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Se connecter</h5>
                            <button 
                            onClick={closeModal}
                            className="btn-close"></button>
                        </div>

                        <div className="modal-body">
                            <form 
                            ref={formRef}
                            onSubmit={handleForm}
                            className="sign-up-form">
                                <div className="mb-3">
                                    <label htmlFor="signInEmail"
                                    className='form-label'>Email address</label>
                                    <input 
                                    ref={addInputs}
                                    type="email" 
                                    name="email"
                                    required 
                                    id="signInEmail" 
                                    className="form-control" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="signInPwd"
                                    className='form-label'>Password</label>
                                    <input 
                                    ref={addInputs}
                                    type="password" 
                                    name="pwd"
                                    required 
                                    id="signInPwd" 
                                    className="form-control" />
                                    <p className="text-danger mt-1">{validation}</p>
                                </div>

                                <button className="btn btn-primary">Submit</button>

                            </form>
                        </div> 
                        
                    </div>

                </div>
            </div>
    </div>
        ) }
  </>
  )
}
