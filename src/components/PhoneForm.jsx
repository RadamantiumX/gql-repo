import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../persons/graphql-mutations'
import { ALL_PERSONS } from '../persons/graphql-queries'

export const PhoneForm = ({notifyError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

// Utilizamos el segundo parametro "null" para verificar si se guardaron los datos    
const [changeNumber, result] = useMutation(EDIT_NUMBER, { refetchQueries: [{
    query: ALL_PERSONS}]}// Hacemos REFETCH (pedir los datos nuevamente) de esa QUERY que es ALL_PERSONS
    // Esto pasara solo cuando hagamos la mutacion
     )

     useEffect(()=>{
        // Si es NULL, entonces enviara un mensaje de ERROR
        if(result.data && result.data.editNumber === null){
            console.error('Person not found') // Lo vemos en la consola
            notifyError('Person not found')
        }
     },[result.data])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        changeNumber({ variables: { name, phone } }) // Le pasamos las variables para crear una nueva persona

        setName('')
       
        setPhone('')
        

    }

    return (
        <div>
            <h2>Edit phone number</h2>
            <form onSubmit={handleSubmit}>
              <div style={{display:'flex', flexDirection: 'column'}}>
                <input type="text" onChange={evt => setName(evt.target.value)} value={name} placeholder='Name'/>
                
                <input type="text" onChange={evt => setPhone(evt.target.value) } value={phone} placeholder='Phone'/>
                
                <button style={{borderStyle: 'solid 1px white'}}>Change Phone</button>
              </div>
            </form>
        </div>
    )
}