import { gql } from "@apollo/client"
import { PERSON_ALL_DETAILS_FRAGMENT } from "./graphql-queries"

export const CREATE_PERSON  = gql`
 mutation createPerson (# Nombramos a esta mutacion como "createPerson"
   $name: String!,
   $street: String!,
   $city: String!,
   $phone: String
 ) 
 { 
    addPerson(
        name: $name
        phone: $phone
        street: $street
        city: $city
    ) {
        ...PersonDetails
    }
 }
# Disponemos del FRAGMENTO
${PERSON_ALL_DETAILS_FRAGMENT}
`

export const EDIT_NUMBER = gql`
 mutation editNumber(
    $name: String!, 
    $phone: String! 
    ) {
    editNumber(name: $name, phone: $phone) {
        name
        phone
        address {
            street
            city
        }
    }
 }
`