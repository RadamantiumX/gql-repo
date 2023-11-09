import reactLogo from './assets/react.svg'
import './App.css'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'

import { Notify } from './components/Notify'
import { usePersons } from './persons/customs-hooks'
import { useState } from 'react'
import { PhoneForm } from './components/PhoneForm'



function App() {
  const { data, loading, error } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)
  
  if (error) return (<span style='color: red'>{error}</span>)

  const notifyError = message => {
    setErrorMessage(message)
    setTimeout(()=>setErrorMessage(null), 5000)
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
        <PhoneForm notifyError={notifyError}/>
        <PersonForm notifyError={notifyError}/>
        
        </header>
      </div>
      
      
    </>
  )
}

export default App
