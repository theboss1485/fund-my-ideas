import { Outlet } from 'react-router-dom';
import Nav from './components/NavTabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Footer from './components/Footer';
import { setContext } from '@apollo/client/link/context';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';

// On this page, we initailize everything for the main application.

const httpLink = createHttpLink({

    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('id_token');

    return {

        headers: {

            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Here, we initialize the ApolloClient.
const client = new ApolloClient({

    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (

        <ApolloProvider client={client}>
            <div className="custom-main">
                <Nav/>
                <main className="">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </ApolloProvider>
    )
}

export default App;