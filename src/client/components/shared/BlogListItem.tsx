import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

export default class BlogListItem extends React.Component<IBlogListItemProps>{
    render() {
        return (
            <div className="col-md-4 mb-3">
                <div className="card">
                    <img className="card-img-top" src="/images/bloghero.jpg" alt={this.props.title} />
                    <div className="card-body">
                        <h2 className="card-title">{this.props.title}</h2>
                        <p className="card-text mb-0">{this.props.author}</p>
                        <p className="card-text">{moment(this.props.date).format('MMM DD YYYY')}</p>
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
    author: string;
}