import React from 'react';

class AuthorizationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    onSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.onSubmit({email, password});
    }

    render() {
        return (
            <div className="row" style={{paddingTop: 16}}>
                <form className="col s12 m8" onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s12">
                            <label className="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="validate"
                                onChange={e => this.setState({email: e.target.value})}
                                value={this.state.email}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label className="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="validate"
                                onChange={e => this.setState({password: e.target.value})}
                                value={this.state.password}
                            />
                        </div>
                    </div>
                    <div style={{color: 'red'}}>
                        {this.props.errors && this.props.errors.map(err => <div key={err}>{err}</div>)}
                    </div>
                    <button className="waves-effect waves-light btn">Submit</button>
                </form>
            </div>
        )
    }
}

export default AuthorizationForm;