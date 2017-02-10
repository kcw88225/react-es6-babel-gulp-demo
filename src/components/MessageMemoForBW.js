import React from 'react';

export default class MessageMemoForBW extends React.Component {
    constructor(props) {
        super(props);

        this.onModalOpen = this.onModalOpen.bind(this);
    }

    onModalOpen(e) {
        e.preventDefault();
        this.props.handleModalOpen(this.props.msgItem);
    }

    render() {
        return (
            <li className="list-group-item" onClick={this.onModalOpen}>
                <div className="msg-type">Birthday Wish</div>
                {!this.props.isProcessed ? (
                    <div>For <i>{this.props.msgItem.name}</i></div>
                ) : (
                    <div>
                        <div><i>{this.props.msgItem.name}</i></div>
                        <div>Mate, Happy Birthday. To celebrate this once a year occasion we have picked the following gift: <i>{this.props.msgItem.gift}</i>. Enjoy.</div>
                        <img src={this.props.msgItem.image} width="100" alt={this.props.msgItem.name} />
                        <div><i>{this.props.msgItem.description}</i></div>
                    </div>
                    
                )}
            </li>
        );
    }
}

MessageMemoForBW.propTypes = {
  msgItem: React.PropTypes.object.isRequired,
  isProcessed: React.PropTypes.bool.isRequired,
  handleModalOpen: React.PropTypes.func
};