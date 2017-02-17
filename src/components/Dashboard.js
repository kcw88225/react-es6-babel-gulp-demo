import React from 'react';
import MessageBoard from './MessageBoard';
import PendingMessageList from './PendingMessageList';
import ProcessedMessageList from './ProcessedMessageList';
import MessageDetailModalForBW from './MessageDetailModalForBW';
import MessageDetailModalForCBC from './MessageDetailModalForCBC';
import {pendingMessage} from '../data/pending-message';
import {processedMessage} from '../data/processed-message';
import {giftSet} from '../data/gift-set';
import {babyNameSet} from '../data/baby-name-set';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingMessage: pendingMessage,
            processedMessage: processedMessage,
            seletedMsgOnModalForBW: null,
            selectedMsgOnModalForCBC: null
        };
        this.handleMessageSubmission = this.handleMessageSubmission.bind(this);
        this.handleModalOpenForBW = this.handleModalOpenForBW.bind(this);
        this.handleModalOpenForCBC = this.handleModalOpenForCBC.bind(this);
    }

    handleMessageSubmission(updatedMsgItem) {
        //should do ajax api call to perform update operation on server side under normal situation,
        //for this demo, only perform array operation here.
        this.setState(function(prevState, props) {
            let updatedPendingMessage = prevState.pendingMessage.filter((msgItem) => msgItem.id !== updatedMsgItem.id);
            let updatedProcessedMessage = [updatedMsgItem].concat(prevState.processedMessage);

            return {
                pendingMessage: updatedPendingMessage,
                processedMessage: updatedProcessedMessage
            };
        });
    }

    handleModalOpenForBW(msgItem) {
        this.setState(function(prevState, props) {
            return {
                seletedMsgOnModalForBW: msgItem
            };
        });
        
        MessageDetailModalForBW.openDialog();
    }

    handleModalOpenForCBC(msgItem) {
        this.setState(function(prevState, props) {
            return {
                seletedMsgOnModalForCBC: msgItem
            };
        });

        MessageDetailModalForCBC.openDialog();
    }

    render() {
        return (
            <div>
                <div className="col-xs-12 col-sm-6">
                    <MessageBoard title="Pending Message" msgCount={this.state.pendingMessage.length}>
                        <PendingMessageList 
                            msgItems={this.state.pendingMessage} 
                            onModalOpenForBW={this.handleModalOpenForBW}
                            onModalOpenForCBC={this.handleModalOpenForCBC} />
                    </MessageBoard>
                </div>
                <div className="col-xs-12 col-sm-6">
                   <MessageBoard title="Processed Message" msgCount={this.state.processedMessage.length}>
                        <ProcessedMessageList msgItems={this.state.processedMessage} />
                    </MessageBoard>
                </div>
                <MessageDetailModalForBW 
                    giftSet={giftSet}
                    msgItem={this.state.seletedMsgOnModalForBW} 
                    onMessageSubmission={this.handleMessageSubmission} />
                <MessageDetailModalForCBC 
                    babyNameSet={babyNameSet}
                    msgItem={this.state.seletedMsgOnModalForCBC} 
                    onMessageSubmission={this.handleMessageSubmission} />
            </div>
        );
    }
}
