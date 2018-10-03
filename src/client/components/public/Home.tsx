import * as React from 'react';
import json from '../../utils/api';

import BlogListItem from '../shared/BlogListItem';

export default class Home extends React.Component<any, IHomeState>{

    constructor(props: any) {
        super(props);
        this.state = {
            blogs: []
        };
    }

    async componentWillMount() {
        let blogs = await json('/api/q/blogsauthors');
        this.setState({
            blogs
        });
    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        {this.state.blogs.map((blog, i) => {
                            return <BlogListItem blogid={blog.id} date={blog.publishedts} title={blog.title} author={`${blog.firstname} ${blog.lastname}` } key={i}></BlogListItem>
                        })}
                    </div>
                </div>
            </main>
        );
    }
}

interface IHomeState {
    blogs: { id: number, title: string, publishedts: Date, firstname: string, lastname: string }[]
}