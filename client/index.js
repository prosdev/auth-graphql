import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import LoginForm from './components/LoginForm';
import App from './components/App'


const customHistory = createBrowserHistory();
const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin'
    }
});

const Client = new ApolloClient({
    networkInterface,
    dataIdFromObject: obj => obj.id
});
const Root = () => {
    return (
        <ApolloProvider client={Client}>
            <Router history={customHistory}>
                <Route path="/" component={App}>

                </Route>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
