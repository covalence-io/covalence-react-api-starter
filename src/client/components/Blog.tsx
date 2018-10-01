import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import BlogListItem from './BlogListItem';

export default class Blog extends React.Component<any, IBlogState> {

    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }

    async componentWillMount() {
        let result = await fetch(`/api/blogs/${this.props.match.params.blogId}`);
        let blog = await result.json();
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

interface IBlogState {
    title?: string;
    body?: string;
}