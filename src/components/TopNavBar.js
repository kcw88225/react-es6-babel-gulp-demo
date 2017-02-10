import React from 'react';

export default class TopNavBar extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <h1><a href="#" className="navbar-brand">Message Processor</a></h1>
                    </div>
                    <p className="navbar-text navbar-right">Welcome {this.props.user}!</p>
                </div>
            </nav>
        );
    }
}

TopNavBar.propTypes = {
  user: React.PropTypes.string.isRequired
};