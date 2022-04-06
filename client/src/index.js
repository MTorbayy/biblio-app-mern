import React from 'react'
import "bootswatch/dist/minty/bootstrap.min.css"
import App from './App';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {UserContextProvider} from "./context/userContext"

const root = createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
  <UserContextProvider>
    <App />
  </UserContextProvider>
  </BrowserRouter>
)
