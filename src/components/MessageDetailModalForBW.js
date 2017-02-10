import React from 'react';

export default class MessageDetailModalForBW extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.addGiftOption = this.addGiftOption.bind(this);
        this.getSelectedGiftOption = this.getSelectedGiftOption.bind(this);
        this.onGiftSeltect = this.onGiftSeltect.bind(this);
        this.openDialog = MessageDetailModalForBW.openDialog;
        this.closeDialog = MessageDetailModalForBW.closeDialog;
    }

    static openDialog(){
        $('#msg-detail-bw-dialog').modal('show');
    }

    static closeDialog(){
        $('#msg-detail-bw-dialog').modal('hide');
    }

    onSubmit(e) {
        let $selectedOption = this.getSelectedGiftOption(),
            updatedMsgItem = Object.assign({}, this.props.msgItem);

        updatedMsgItem.gift = $selectedOption.val();
        updatedMsgItem.image = $selectedOption.data('image');
        updatedMsgItem.description = $selectedOption.data('description');

        this.props.onMessageSubmission(updatedMsgItem);
        this.closeDialog();
    }

    onGiftSeltect(e) {
        let $selectedOption = this.getSelectedGiftOption();

        $(this.selectedGiftImage).attr('src', $selectedOption.data('image')).attr('alt', $selectedOption.val());
        $(this.selectedGiftDescription).text($selectedOption.data('description'));
    }

    getSelectedGiftOption(){
        let $giftDdl = $(this.giftDdl),
            giftValue = $giftDdl.val();

            return $giftDdl.find('option[value="'+ giftValue + '"]')
    }

    addGiftOption(gift){
        $(this.giftDdl).append($('<option></option>')
                        .attr('value', gift.value)
                        .attr('data-image', gift.image)
                        .attr('data-description', gift.description)
                        .text(gift.name))
    }
    
    componentDidMount(){
        const self = this;
        
        //add default gift options
        this.props.giftSet.map((gift) => this.addGiftOption(gift));

        //concat special gift from fake api
        $.ajax({
            method: 'GET',
            url: '/api/specials.js',
            dataType: 'json'
        })
        .done(function( result ) {
            result.map((gift) => self.addGiftOption(gift));
        });

        //set default gift image and description
        this.onGiftSeltect();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.msgItem !== null) {
            $(this.giftFor).text(' for ' + this.props.msgItem.name);
        }
    }

    render() {
        return (
            <div className="modal fade" id="msg-detail-bw-dialog" data-msg-id="-1" tabIndex="-1" role="dialog" aria-labelledby="message detail dialog for birthday wish" aria-hidden="true">
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
                            <div className="col-xs-12 margin-bottom"><select ref={(input) => this.giftDdl = input} className="custom-select form-control" onChange={this.onGiftSeltect}></select></div>
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
