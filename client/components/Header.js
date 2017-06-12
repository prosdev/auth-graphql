import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import CurrentUserQuery from '../queries/CurrentUser';
import LogoutMutation from '../mutations/Logout';

import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    //Connect to logout mutation
    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{ query: CurrentUserQuery }]
        });
    }

    renderNavigationButtons() {
        const { loading, user } = this.props.data;

        //Check for query completion
        if (loading) { return <div/>; }

        //If user exists, display relevant
        if (user) {
            return (
                <li>
                    <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
                </li>
            )
        } else {
            return (
                <div>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            )
        }

    }

    render() {
        return (
            <nav className="blue-grey darken-4">
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo left">Home</Link>
                   <ul className="right">
                       {this.renderNavigationButtons()}
                   </ul>
                </div>
            </nav>
        );
    }
};

export default graphql(LogoutMutation)(
    graphql(CurrentUserQuery)(Header)
);