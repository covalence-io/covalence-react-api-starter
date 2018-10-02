import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import Alert, { MessageTypes } from '../shared/Alert';

export default class Login extends React.Component<ILoginProps, ILoginState> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginFailed: false
        }
    }

    private loggingIn = false;

    Login = async () => {
        
        if(this.loggingIn) return;

        try {
            this.loggingIn = true;
            this.setState({ loginFailed: false });
            let result = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            });

            if(result.ok) {
                alert(await result.json());
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

interface ILoginProps {}
interface ILoginState {
    loginFailed: boolean;
    email: string;
    password: string;
}