import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        constructor(props) {
            super(props);
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.data.loading && !nextProps.data.user) {
                this.props.history.push('/login');
            }
        }

        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }

    //Return a graphql infused component
    return graphql(CurrentUserQuery)(RequireAuth);
}


