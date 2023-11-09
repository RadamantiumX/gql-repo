import {  useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { FIND_PERSON } from "../persons/graphql-queries"


export const Persons = ({ persons }) => {
    // Es un ARRAY de 2 posiciones, la primera es la llamada y la segunda el resultado
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    const [person, setPerson] = useState(null)
     
    const showPerson = name => {
        // Llamamos a "getPerson" y le pasamos las variables
        getPerson({ variables: { nameToSearch: name } })
    }
    useEffect(() => {
        if (result.data){
           setPerson(result.data.findPerson) 
        }    
    },[result]) // Le pasamos el "result" para que se ejecute el HOOK cada vez q cambie
    
    // Si nuestro estado nos trae datos
    if (person) {
       return( <div>
            <h2>{person.name}</h2>
            <div>{person.address.street}, {person.address.city}</div>
            <div>{person.phone}</div>
            <button onClick={() => setPerson(null)}>close</button>
        </div>)
    }

    if(persons === null) return null
    return (
        <div>
            <h2>Persons</h2>
            {persons.map(person => 
             <div style={{ cursor: 'pointer' }} key={person.id} onClick={() => { showPerson(person.name) }}>
                {person.name} {person.phone}
            </div>)}
        </div>
    )
}