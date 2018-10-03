import * as React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="bg-primary">
                <div className="container">
                    <div className="row py-3">
                        <p className="text-white m-auto">Powered by <a className="text-white" href="https://covalence.io">Covalence</a></p>
                    </div>
                </div>
            </footer>
        );
    }
}
