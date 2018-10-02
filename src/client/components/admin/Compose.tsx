import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import json, { User } from '../../utils/api';
import Alert, { MessageTypes } from '../shared/Alert';

const ALERT_SUCCESS = <Alert message="Post saved successfully!" messageType={MessageTypes.Success}></Alert>
const ALERT_ERROR = <Alert message="There was an error saving your post :(" messageType={MessageTypes.Error}></Alert>

export default class Compose extends React.Component<IComposeProps, IComposeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            body: '',
            authorid: User.userid
        }
    }

    private alert: JSX.Element = null;

    SaveBlog = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault(); //don't do a form submission since we call an api

        try {
            let result = await json('/api/blogs', 'POST', {
                authorid: User.userid,
                title: this.state.title,
                body: this.state.body,
            });
            if(result) {
                this.alert = ALERT_SUCCESS;
            } else {
                this.alert = ALERT_ERROR;
            }
        } catch(e) {
            console.log(e);
            this.alert = ALERT_ERROR;
        }
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
                        <form className="col-md-4 offset-md-4" onSubmit={ this.SaveBlog }>
                            <div className="form-row">
                                <div className="col form-group">
                                    <input className="form-control" type="text" placeholder="Title" onChange={ (e) => { this.setState({title: e.target.value } )} } required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col form-group">
                                    <textarea className="form-control" onChange={ (e) => { this.setState({body: e.target.value } )} } required />
                                </div>
                            </div>
                            <div className="form-row form-group">
                                <div className="col">
                                    <button className="btn btn-primary btn-lg w-100">Publish</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}

interface IComposeProps extends RouteComponentProps { }
interface IComposeState {
    authorid?: number;
    title?: string;
    body?: string;
}