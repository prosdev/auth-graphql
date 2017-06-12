import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthorizationForm from './AuthorizationForm';
import RegisterMutation from '../mutations/Register';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        }
    }

    handleSubmit({email, password}) {
        this.props.mutate({
            variables: {email, password}
        }).catch( res => {
            const errors = res.graphQLErrors.map(err => err.message);
            this.setState({ errors });
        });
    }
    render() {
        return (
            <div className="container">
                <h3>Register</h3>
                <AuthorizationForm
                    errors={this.state.errors}
                    onSubmit={this.handleSubmit.bind(this)}
                />
            </div>
        )
    }
}

export default graphql(RegisterMutation)(RegistrationForm);
