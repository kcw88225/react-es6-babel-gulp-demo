import React from 'react';
import TopNavBar from './TopNavBar';
import Dashboard from './Dashboard';

export default class Layout extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    
    render() {
        return (
            <div>
                <TopNavBar user="Kelvin" />
                <Dashboard />
            </div>
        );
    }
}
