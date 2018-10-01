import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Navbar from './Navbar';
import Blog from './Blog';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <>
                <Navbar></Navbar>
                <Route exact path="/" component={Home} />
                <Route path="/blog/:blogId" component={Blog} />
                </>
            </Router>
        );
    }
}