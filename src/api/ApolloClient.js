import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graph',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = (JSON.parse(localStorage.getItem('persist:auth'))&&JSON.parse(localStorage.getItem('persist:auth')).token)?JSON.parse(localStorage.getItem('persist:auth')).token.replace(/\"/g,''):null;
  // return the headers to the context so httpLink can read them
  console.log(token);
  return {
    headers: {
      ...headers,
      'access-token': token ? `${token}` : "",
    }
  }
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// const httpLink = new HttpLink({ uri: 'http://localhost:5000/graph' });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: (JSON.parse(localStorage.getItem('persist:auth'))&&JSON.parse(localStorage.getItem('persist:auth')).token)?JSON.parse(localStorage.getItem('persist:auth')).token.replace(/\"/g,''):null,
//     }
//   }));

//   return forward(operation);
// })

// console.log(JSON.parse(localStorage.getItem('persist:auth')).token)


// export default new ApolloClient({
//   cache: new InMemoryCache(),
//   link: concat(authMiddleware, httpLink),
// });



// export default new ApolloClient({
//   uri: "http://localhost:5000/graph",
// });