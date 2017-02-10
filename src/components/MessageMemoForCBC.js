import React from 'react';

export default class MessageMemoForCBC extends React.Component {
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
                <div className="msg-type">Congrats on the birth of your child</div>
                {!this.props.isProcessed ? (
                    <div>For <i>{this.props.msgItem.name}</i></div>
                ) : (
                   <div>
                        <div><i>{this.props.msgItem.name}</i></div>
                        <div>Whooa well done and congratulations on the birth of <i>{this.props.msgItem.babyName}</i> on <i>{this.props.msgItem.birthdate}</i>.</div>
                    </div>
                )}
            </li>
        );
    }
}

MessageMemoForCBC.propTypes = {
  msgItem: React.PropTypes.object.isRequired,
  isProcessed: React.PropTypes.bool.isRequired,
  handleModalOpen: React.PropTypes.func
};