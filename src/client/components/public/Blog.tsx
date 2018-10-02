import * as React from 'react';

import json from '../../utils/api';
import { RouteComponentProps } from 'react-router';

export default class Blog extends React.Component<IBlogProps, IBlogState> {

    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }

    async componentWillMount() {
        let blog = await json(`/api/blogs/${this.props.match.params.blogId}`);
        this.setState({
            title: blog.title,
            body: blog.body
        });
    }

    render() {
        return (
            <main className="py-5">
                <article className="container pt-5">
                    <div className="row">
                        <div className="col">
                            <h1>{this.state.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.state.body}
                        </div>
                    </div>
                </article>
            </main>
        );
    }
}

interface IBlogProps extends RouteComponentProps<{ blogId: string}> {}
interface IBlogState {
    title?: string;
    body?: string;
}