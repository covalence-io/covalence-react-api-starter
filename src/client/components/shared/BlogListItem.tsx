import * as React from 'react';
import { Link } from 'react-router-dom';

export default class BlogListItem extends React.Component<IBlogListItemProps>{
    render() {
        return (
            <div className="col-md-4 mb-3">
                <div className="card">
                    <img className="card-img-top" src="/images/bloghero.jpg" alt={this.props.title} />
                    <div className="card-body">
                        <h2 className="card-title">{this.props.title}</h2>
                        <p className="card-text">{this.props.date}</p>
                        <Link to={`/blog/${this.props.blogid}`} className="btn btn-primary">View</Link>
                    </div>
                </div>
            </div>
        );
    }
}

interface IBlogListItemProps {
    blogid: number;
    title: string;
    date: Date;
}