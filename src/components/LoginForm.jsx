import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import {LOGIN} from '../login/graphql-queries.js'

export const LoginForm = ({notifyError, setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    
    // utilizamos las mutaciones de GRAPHQL
    const [login, result] = useMutation(LOGIN, 
        {
            onError: error => {
                notifyError(error.graphQLErrors[0].message) // Tomamos el primer mensaje de error
            }
        })

    useEffect(()=>{
        if(result.data) {
            // Recuperamos el valor del TOKEN
            const {value: token} = result.data.login
            setToken(token) // Cambiamos el estado
            localStorage.setItem('phonenumbers-user-token',token)
        }
    },[result.data])    
        
    const handleSubmit=(e)=>{
      e.preventDefault()

      // Les pasamos los argumentos a la mutacion
      login({variables: {username, password}})
    }

    return(
        <div>
            <h2>Login User</h2>
            <form onSubmit={handleSubmit}>
                <div style={{display:'flex', flexDirection: 'column'}}>
                
                    
                    <input type="text"
                           value={username}
                           onChange={({ target })=> setUsername(target.value)}
                           placeholder="Username"
                    />
                   
                    <input type="password"
                           value={password}
                           onChange={({ target })=> setPassword(target.value)}
                           placeholder="Password"
                    />
                
                <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}
