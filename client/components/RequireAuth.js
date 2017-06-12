import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';

class RequireAuth extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.data.loading && !this.props.data.user) {
            this.props.history.push('/login');
        }
    }
}

export default graphql(CurrentUserQuery)(RequireAuth);
