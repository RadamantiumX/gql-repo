import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

// Iniciamos el cliente de APOLLO CLIENT
const client = new ApolloClient({
  connectToDevTools: true, // Conectar con las herramientas del desarrollador en el navegador
  cache: new InMemoryCache(), // Es una CACHE muy tipica
  link: new HttpLink({
    // Likeamos el recurso de GRAPHQL
    uri: 'http://localhost:4000'
  })
})
// Necesitamos una propiedad CHACHE para que pueda funcionar APOLLO CLIENT
// En esa CACHE guarda la informacion q se peticiona, para que no haya necesidad de perdirlos al servidor
// Con la CACHE no hace el REQUEST por duplicado de una misma consulta, a menos que actualicemos la pagina



// A "query" le tenemos que pasar un objeto con el mismo nombre como propiedad
/*client.query({
  query
})
.then(res => {
  console.log(res.data)
})*/
// Utilizamos el CONTEXTO de ApolloProvider para que este disponible en 
// toda la aplicacion, o los componente que envuelve.
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
