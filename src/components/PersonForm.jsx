import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_PERSONS } from '../persons/graphql-queries'
import { CREATE_PERSON } from '../persons/graphql-mutations'



export const PersonForm = ({ notifyError }) => {
    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState('')

    // Es LAZY, nosotros le decimos cuando utilizarlo
    // en este caso es un metodo para que nosotros hagamos la mutacion
    const [ createPerson ] = useMutation(CREATE_PERSON,{ 
        
        onError: (error) => {
           notifyError(error.graphQLErrors[0].message) // Tomamos el primer mansaje de ERROR
        },
        // Esto evitará el "reFecth" (que puede ser una opcion valida ocasionalmente)
        // La "store" es donde tenemos la CHACHE
        // La "response" es la respuesta de la mutacion
        update: (store, response) => {
            const dataInStore = store.readQuery({ query: ALL_PERSONS })
            // "EScribimos" en la QUERY ALL_PERSONS
            store.writeQuery({
                query: ALL_PERSONS,
                data: {
                    ...dataInStore,// Esta la informacion q ya tenia
                    allPersons: [ 
                        ...dataInStore.allPersons, // Lo que ya tenia
                        response.data.addPerson // Añadimos la mutacion
                    ]
                }
            })
        }

         })

    const handleSubmit = (e) => {
        e.preventDefault()
        
        createPerson({ variables: { name, phone, street, city} }) // Le pasamos las variables para crear una nueva persona

        setName('')
        setStreet('')
        setPhone('')
        setCity('')

    }

    return (
        <div>
            <h2>Create new Person</h2>
            <form onSubmit={handleSubmit}>
              <div style={{display:'flex', flexDirection: 'column'}}>
                <input type="text" onChange={evt => setName(evt.target.value)} value={name} placeholder='Name'/>
                <input type="text" onChange={evt => setStreet(evt.target.value) } value={street} placeholder='Street'/>
                <input type="text" onChange={evt => setPhone(evt.target.value) } value={phone} placeholder='Phone'/>
                <input type="text" onChange={evt => setCity(evt.target.value) } value={city} placeholder='City'/>
                <button style={{borderStyle: 'solid 1px white'}}>Save Person</button>
              </div>
            </form>
        </div>
    )
}