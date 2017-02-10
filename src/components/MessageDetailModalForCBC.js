import React from 'react';

export default class MessageDetailModalForCBC extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.openDialog = MessageDetailModalForCBC.openDialog;
        this.closeDialog = MessageDetailModalForCBC.closeDialog;
    }

    static openDialog(){
        $('#msg-detail-cbc-dialog').modal('show');
    }

    static closeDialog(){
        $('#msg-detail-cbc-dialog').modal('hide');
    }

    onSubmit(e) {
        let updatedMsgItem = Object.assign({}, this.props.msgItem);
        updatedMsgItem.babyName = $(this.babyNameDdl).val();
        updatedMsgItem.birthdate = $(this.babyBrithDate).val();

        this.props.onMessageSubmission(updatedMsgItem);
        this.closeDialog();
    }

    componentDidMount(){
        //set default brith date
        $(this.babyBrithDate).val(moment().format('MM/DD/YYYY'));

        //add default name options
        this.props.babyNameSet.map((babyName) => $(this.babyNameDdl).append($("<option></option>").attr("value", babyName.value).text(babyName.name)));
    }

    render() {
        return (
            <div className="modal fade" id="msg-detail-cbc-dialog" data-msg-id="-1" tabIndex="-1" role="dialog" aria-labelledby="message detail dialog for baby birth" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title col-xs-8">Choose baby name and birth date</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-4">
                                <select ref={(input) => this.babyNameDdl = input} className="custom-select form-control"></select>
                            </div>
                            <div className="col-sm-8">
                                <div className="input-group date" data-provide="datepicker">
                                    <input ref={(input) => this.babyBrithDate = input} type="text" className="form-control" ref={(input) => this.babyBrithDate = input} />
                                    <div className="input-group-addon">
                                        <span className="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>
                            </div>
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

MessageDetailModalForCBC.propTypes = {
  babyNameSet: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  msgItem: React.PropTypes.object,
  onMessageSubmission: React.PropTypes.func.isRequired
};
