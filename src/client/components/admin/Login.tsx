import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    Login = () => {

    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <div className="form-row">
                                <div className="col form-group">
                                    <input className="form-control" type="text" onChange={ (e) => { this.setState({email: e.target.value } )} } />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                <input className="form-control" type="password" onChange={ (e) => { this.setState({password: e.target.value } )} } />
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col">
                                    <button className="btn btn-primary btn-lg w-100" onClick={ this.Login }>Login</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <Link to="/register">Create Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

interface ILoginProps {}
interface ILoginState {
    email: string;
    password: string;
}