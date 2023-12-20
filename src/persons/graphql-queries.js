import { gql } from "@apollo/client"

// FRAGMENTO
export const PERSON_ALL_DETAILS_FRAGMENT = gql`
  fragment PersonDetails on Person { # Este Fragmento es sobre "Persona"
      id
      name 
      phone
      address {
        street
        city
      }
      
  }
`

// Hacemos una QUERY utilizando el TEMPLATE STRING
export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails # Esparcimos el FRAGMENTO, algo similar al SPREAD OPERATOR
    }
  }
# Disponemos del FRAGMENTO  
${PERSON_ALL_DETAILS_FRAGMENT} 
`
export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) { # Esta QUERY va a recibir un parametro
    findPerson(name: $nameToSearch) { # utilizamos ese parametro
      name
      phone
      id
      address {
        street
        city
      }

    }
  }
`

