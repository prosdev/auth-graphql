import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';

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
                <App>
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegistrationForm} />
                        <Route path="/dashboard" component={Dashboard} />
                    </Switch>
                </App>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
