import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import Alert, { MessageTypes } from '../shared/Alert';
import json, { SetAccessToken } from '../../utils/api';

export default class Compose extends React.Component<IComposeProps, IComposeState> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    SaveBlog = () => {
        
    }

    render() {

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
                                    <button className="btn btn-primary btn-lg w-100" onClick={ this.SaveBlog }>Login</button>
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

interface IComposeProps extends RouteComponentProps { }
interface IComposeState {

}