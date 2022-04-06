import {useContext, useState, useRef} from 'react'
import {UserContext} from "../context/userContext"

export default function SignUpModal() {

  const {modalState, toggleModals, signUp} = useContext(UserContext)


  return (
    <>
      {modalState.signUpModal && (

      <div className="position-fixed top-0 vw-100 vh-100">
          <div 
          onClick={() => toggleModals("close")}
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
                              onClick={() => toggleModals("close")}
                              className="btn-close"></button>
                          </div>
  
                          <div className="modal-body">
                              <form                      className="sign-up-form">
                                  <div className="mb-3">
                                      <label htmlFor="signUpEmail"
                                      className='form-label'>Adresse email</label>
                                      <input 
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
                                      type="password" 
                                      name="pwd"
                                      required 
                                      id="repeatPwd" 
                                      className="form-control" />
                                      <p className="text-danger mt-1">Validation</p>
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
