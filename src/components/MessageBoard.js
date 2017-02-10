import React from 'react';

export default class MessageBoard extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <h2 className="panel-heading">{this.props.title} <span className="badge">{this.props.msgCount}</span></h2>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

MessageBoard.propTypes = {
  title: React.PropTypes.string.isRequired,
  msgCount: React.PropTypes.number.isRequired,
  children: React.PropTypes.element.isRequired
};