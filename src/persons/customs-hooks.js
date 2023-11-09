import { ALL_PERSONS } from "./graphql-queries"
import { useQuery } from "@apollo/client" // Custom HOOK de APOLLO

export const usePersons = () => {
    // Estamos recuperando el "data" y el "loading" en este HOOK
    // Hay mucha mas informacion que podemos recuperar de este FETCH
    // solo tenemos que ver que nos devuelve el "result" para ver esas opciones
    // Dentro podemos encontrar el "reFetch" donde realiza el fetch nuevamente
    const result = useQuery(ALL_PERSONS) // Con { pollInterval: 2000 } (como segundo parametro), cada 2000 ms vuelve a hacer la QUERY y recupera todos los datos
    return result
  }