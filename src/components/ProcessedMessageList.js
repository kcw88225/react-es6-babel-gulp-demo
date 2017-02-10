import React from 'react';
import MessageMemoForBW from './MessageMemoForBW';
import MessageMemoForCBC from './MessageMemoForCBC';

export default class ProcessedMessageList extends React.Component {
    render() {
        const msgItems = this.props.msgItems.map((item) => {
            switch(item.type) {
                case 'bw':
                    return <MessageMemoForBW key={item.id} msgItem={item} isProcessed={true} />;
                case 'cbc':
                default:
                    return <MessageMemoForCBC key={item.id} msgItem={item} isProcessed={true} />;
            }
        });
        
        return (
            <ul id="processed-msg-list" className="list-group">
                {msgItems}
            </ul>
        );
    }
}

ProcessedMessageList.propTypes = {
  msgItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};