import { gql } from "@apollo/client"

// Hacemos una QUERY utilizando el TEMPLATE STRING
export const ALL_PERSONS = gql`
  query {
    allPersons {
      id
      name 
      phone
      address {
        street
        city
      }
    }
  }
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