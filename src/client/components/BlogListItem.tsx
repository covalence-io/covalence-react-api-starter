import * as React from 'react';

export default class BlogListItem extends React.Component<IBlogListItemProps>{
    render() {
        return (
            <div className="col-md-6 mb-3">
                <div className="card">
                    <img className="card-img-top" src="/images/bloghero.jpg" alt={this.props.title} />
                    <div className="card-body">
                        <h1 className="card-title">{this.props.title}</h1>
                        <p className="card-text">{this.props.date}</p>
                    </div>
                </div>
            </div>
        );
    }
}

interface IBlogListItemProps {
    title: string;
    date: Date;
}