import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './public/Home';
import Navbar from './shared/Navbar';
import Blog from './public/Blog';
import Login from './admin/Login';
import Register from './admin/Register';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <>
                <Navbar></Navbar>
                <Route exact path="/" component={Home} />
                <Route path="/blog/:blogId" component={Blog} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                </>
            </Router>
        );
    }
}