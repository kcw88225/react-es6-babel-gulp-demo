import React from 'react';
import SelectGiftDdl from './form/SelectGiftDdl'
import Helper from '../utils/helper'

const selector = {
    detailDialog: '#msg-detail-bw-dialog'
}

export default class MessageDetailModalForBW extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleGiftSelect = this.handleGiftSelect.bind(this);

        this.openDialog = MessageDetailModalForBW.openDialog;
        this.closeDialog = MessageDetailModalForBW.closeDialog;
    }

    static openDialog(){
        $(selector.detailDialog).modal('show');
    }

    static closeDialog(){
        $(selector.detailDialog).modal('hide');
    }

    onSubmit(e) {
        let $selectedOption = SelectGiftDdl.getSelectedGiftOption(),
            updatedMsgItem = Object.assign({}, this.props.msgItem);

        updatedMsgItem.gift = $selectedOption.val();
        updatedMsgItem.image = $selectedOption.data('image');
        updatedMsgItem.description = $selectedOption.data('description');

        this.props.onMessageSubmission(updatedMsgItem);
        this.closeDialog();
    }
    
    handleGiftSelect() {
        let $selectedOption = SelectGiftDdl.getSelectedGiftOption(),
            giftValue = $selectedOption.val(),
            giftImageSrc = $selectedOption.data('image'),
            giftDesc = $selectedOption.data('description');

        $(this.selectedGiftImage).attr('src', giftImageSrc).attr('alt', giftValue);
        $(this.selectedGiftDescription).text(giftDesc);
    }

    componentDidMount(){
        //set default gift image and description
        this.handleGiftSelect();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.msgItem !== null) {
            $(this.giftFor).text(' for ' + this.props.msgItem.name);
        }
    }

    render() {
        var dialogSelector = Helper.getSelectorName(selector.detailDialog);

        return (
            <div className="modal fade" id={dialogSelector} data-msg-id="-1" tabIndex="-1" role="dialog" aria-labelledby="message detail dialog for birthday wish" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title col-xs-8">Choose a gift<span ref={(span) => this.giftFor = span}></span></div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12 margin-bottom">
                                <SelectGiftDdl giftSet={this.props.giftSet} onGiftSeltect={this.handleGiftSelect} />
                            </div>
                            <img ref={(input) => this.selectedGiftImage = input} className="col-xs-4" width="100" alt="" />
                            <div ref={(input) => this.selectedGiftDescription = input} className="col-xs-8"></div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onSubmit}>Process</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

MessageDetailModalForBW.propTypes = {
  giftSet: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  msgItem: React.PropTypes.object,
  onMessageSubmission: React.PropTypes.func.isRequired
};
