import {useContext, useState, useRef} from 'react'
import {UserContext} from "../context/userContext"
import {useNavigate} from 'react-router-dom'

export default function SignUpModal() {

    const {modalState, toggleModals, signUp, currentUser} = useContext(UserContext)

    const navigate = useNavigate()

    //Message de validation
    const [validation, setValidation] = useState('')

    //Récupération des données renseignées dans les inputs
    const inputs = useRef([])

    //Récupération du formulaire
    const formRef = useRef()
    
    //Stockage des données renseignées dans les inputs sous forme d'un tableau
    const addInputs = el => {
          if (el && !inputs.current.includes(el)) {
              inputs.current.push(el)
          }
      }
    
    //Actions à la validation du formulaire
    const handleForm = async (e) => {
        e.preventDefault() 
    

        //Validation côté front :
        //Longueur mdp ok
        if((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
            setValidation("Minimum 6 caractères")
            return
        } //Mots de passe identiques
        else if (inputs.current[1].value !== inputs.current[2].value) {
            setValidation("Les mots de passe ne correspondent pas")
            return
        }

        //inscription d'un nouvel utilisateur :

        try {
            
            //Création d'un nouvel utilisateur avec les inputs
            const credential = await signUp(
                inputs.current[0].value, //email
                inputs.current[1].value //mdp
            )
            
            //Si inscription réussie : (sinon => catch)
            formRef.current.reset() //Remise à 0 des inputs
            setValidation("") //Remise à 0 du message de validation

            //Redirection vers la page privée :
            toggleModals("close")
            navigate("/private/private-home")


        } catch (err) {
            //Validation côté serveur : en cas d'erreur (ex deux fois le même user cherche à s'inscrire)

            if(err.code === "auth/invalid-email") {
                setValidation("Email invalide")
            }

            if(err.code === "auth/email-already-in-use") {
                setValidation("Cet email est déjà utilisé.")
            }
        }


    }

    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }


  return (
    <>
      {modalState.signUpModal && (

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
                              <h5 className="modal-title">S'identifier</h5>
                              <button 
                              onClick={closeModal}
                              className="btn-close"></button>
                          </div>
  
                          <div className="modal-body">
                              <form
                              ref={formRef}                      
                              className="sign-up-form"
                              onSubmit={handleForm}>
                                  <div className="mb-3">
                                      <label htmlFor="signUpEmail"
                                      className='form-label'>Adresse email</label>
                                      <input
                                      ref={addInputs} 
                                      type="email" 
                                      name="email"
                                      required 
                                      id="signUpEmail" 
                                      className="form-control" />
                                  </div>
  
                                  <div className="mb-3">
                                      <label htmlFor="signUpPwd"
                                      className='form-label'>Mot de passe</label>
                                      <input
                                      ref={addInputs} 
                                      type="password" 
                                      name="pwd"
                                      required 
                                      id="signUpPwd" 
                                      className="form-control" />
                                  </div>
  
                                  <div className="mb-3">
                                      <label htmlFor="repeatPwd"
                                      className='form-label'>Confirmez votre mot de passe</label>
                                      <input
                                      ref={addInputs} 
                                      type="password" 
                                      name="pwd"
                                      required 
                                      id="repeatPwd" 
                                      className="form-control" />
                                      <p className="text-danger mt-1">{validation}</p>
                                  </div>
  
                                  <button className="btn btn-primary">Valider</button>
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
