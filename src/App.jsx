import reactLogo from './assets/react.svg'
import './App.css'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'

import { Notify } from './components/Notify'
import { usePersons } from './persons/customs-hooks'
import { useState } from 'react'
import { PhoneForm } from './components/PhoneForm'
import { LoginForm } from './components/LoginForm'
import { useApolloClient } from '@apollo/client'


function App() {
  const { data, loading, error } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('phonenumbers-user-token'))
  const client = useApolloClient() // Utilizamos el CUSTOM HOOK de APOLLO CLIENT


  if (error) return (<span style='color: red'>{error}</span>)

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(()=>setErrorMessage(null), 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear() // Limpiamos el localStorage del navegador
    client.resetStore() // Reseteamos la store del cliente APOLLO, para limpiar el CACHE
  }
  
  return (
    <>
      <div>
        <Notify  errorMessage={errorMessage}/>
        <header>
        <a href="https://graphql.org/" target="_blank" rel="noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2048px-GraphQL_Logo.svg.png" className="logo react" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        {loading?<p>Loading...</p>: (
          <>
          <h1>GraphQL + React</h1>
          <Persons persons={data?.allPersons}/> {/* Si "persons" es igual a "null" retorna "null" */}
          </>
        )
        }
        {/* Si tenemos TOKEN, mostramos el boton de LOGOUT, si no, mostramos el formulario de LOGIN */}
        {token ? <button onClick={logout}>Logout</button> :
        <LoginForm notifyError={notifyError} setToken={setToken}/>
        }
        <PhoneForm notifyError={notifyError}/>
        <PersonForm notifyError={notifyError}/>
        
        </header>
      </div>
      
      
    </>
  )
}

export default App
