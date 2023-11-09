import { gql } from "@apollo/client"

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
        # Devolvemos todos estos campos
        name
        phone
        address {
            city
            street
        }
        id
    }
 }
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