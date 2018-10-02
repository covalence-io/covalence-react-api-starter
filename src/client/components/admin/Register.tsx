import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';

export default class Register extends React.Component<IRegisterProps, IRegisterState>{

    constructor(props: IRegisterProps) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        };
    }

    private registering = false;

    RegisterUser = async () => {
        
        if(this.registering) return;
        this.registering = true;
        try {
            let result = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state)
            });
            let token = await result.json();
        } catch(e) {
            console.log(e);
        } finally {
            this.registering = false;
        }
    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <form className="row" onSubmit={this.RegisterUser}>
                        <div className="col-md-4 offset-md-4">
                            <div className="form-row">
                                <div className="col form-group">
                                    <input type="text" className="form-control" placeholder="First Name" onChange={ (e) => { this.setState({firstname: e.target.value } )} } required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <input type="text" className="form-control" placeholder="Last Name" onChange={ (e) => { this.setState({lastname: e.target.value } )} } required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <input type="text" className="form-control" placeholder="Email" onChange={ (e) => { this.setState({email: e.target.value } )} } required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <input type="password" className="form-control" placeholder="Password" onChange={ (e) => { this.setState({password: e.target.value } )} } required />
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col">
                                    <button className="btn btn-primary btn-lg w-100">Register</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        );
    }
}

interface IRegisterProps {}
interface IRegisterState {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
