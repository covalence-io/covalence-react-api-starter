import * as React from 'react';
import BlogListItem from './BlogListItem';
import * as fetch from 'isomorphic-fetch';

export default class Home extends React.Component<any, IHomeState>{

    constructor(props: any) {
        super(props);
        this.state = {
            blogs: []
        };
    }

    async componentWillMount() {
        let result = await fetch('/api/blogs');
        let blogs = await result.json();
        this.setState({
            blogs
        });
    }

    render() {
        return (
            <main>
                <div className="container">
                    <div className="row">
                        {this.state.blogs.map((blog, i) => {
                            return <BlogListItem date={blog.publishedts} title={blog.title} key={i}></BlogListItem>
                        })}
                    </div>
                </div>
            </main>
        );
    }
}

interface IHomeState {
    blogs: { title: string, publishedts: Date }[]
}