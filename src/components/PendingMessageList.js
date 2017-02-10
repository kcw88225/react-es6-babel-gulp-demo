import React from 'react';
import MessageMemoForBW from './MessageMemoForBW';
import MessageMemoForCBC from './MessageMemoForCBC';

export default class PendingMessageList extends React.Component {
    render() {
        //show 5 msg only
        const msgItems = this.props.msgItems.slice(0, 5).map((item) => {
            switch(item.type) {
                case 'bw':
                    return <MessageMemoForBW 
                                key={item.id} 
                                msgItem={item} 
                                isProcessed={false} 
                                handleModalOpen={this.props.onModalOpenForBW} />;
                case 'cbc':
                default:
                    return <MessageMemoForCBC 
                                key={item.id} 
                                msgItem={item} 
                                isProcessed={false} 
                                handleModalOpen={this.props.onModalOpenForCBC}  />;
            }
        });
        
        return (
            <ul id="pending-msg-list" className="list-group">
                {msgItems}
            </ul>
        );
    }
}

PendingMessageList.propTypes = {
  msgItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onModalOpenForBW: React.PropTypes.func.isRequired,
  onModalOpenForCBC: React.PropTypes.func.isRequired
};