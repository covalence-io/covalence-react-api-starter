import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Link, BrowserRouterProps } from 'react-router-dom';

import Alert, { MessageTypes } from '../shared/Alert';
import json, { SetAccessToken } from '../../utils/api';

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginFailed: false
        }
    }

    private loggingIn = false; //Used to prevent double clicks on the login button

    Login = async () => {
        
        if(this.loggingIn) return; //Check if there is a login request alreaady happening

        try {
            this.loggingIn = true;
            this.setState({ loginFailed: false });
            let result = await json(
                '/auth/login', 
                'POST', 
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }));

            if(result) {
                SetAccessToken(await result.json());
                this.props.history.push('/admin');
            } else {
                this.setState({ loginFailed: true });
            }
        } catch(e) {
            this.setState({ loginFailed: true });
        } finally {
            this.loggingIn = false;
        }
    }

    render() {

        let alert;
        if(this.state.loginFailed) {
            alert = <Alert message="Login Failed" messageType={MessageTypes.Error}></Alert>;
        } else {
            alert = null;
        }

        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            {alert}
                        </div>
                    </div>
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

interface ILoginProps extends RouteComponentProps {

}
interface ILoginState {
    loginFailed: boolean;
    email: string;
    password: string;
}