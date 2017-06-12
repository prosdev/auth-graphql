import React from 'react';
import { graphql } from 'react-apollo';
import LoginMutation from '../mutations/Login';
import AuthorizationForm from './AuthorizationForm';
import CurrentUserQuery from '../queries/CurrentUser';
import axios from 'axios';
window.axios = axios;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: []
        };
    }

    componentWillUpdate(nextProps) {
        if(!this.props.data.user && nextProps.data.user) {
            this.props.history.push("/dashboard");
        }
    }

    handleSubmit({email, password}) {
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{ query: CurrentUserQuery }]
        }).catch( res => {
            const errors = res.graphQLErrors.map(err => err.message);
            this.setState({ errors});
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Login</h3>
                <AuthorizationForm
                    errors={this.state.errors}
                    onSubmit={this.handleSubmit.bind(this)}
                />
            </div>
        )
    }
}

export default graphql(CurrentUserQuery)(
    graphql(LoginMutation)(LoginForm)
);