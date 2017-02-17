import React from 'react';
import Helper from '../../utils/helper';

const selector = {
    babyBrithDate: '#babyBrithDate'
};

export default class BabyBrithDatePicker extends React.Component {
    static getBabyBrithDateValue() {
        return $(selector.babyBrithDate).val();
    }

    componentDidMount(){
        //set default brith date
        $(selector.babyBrithDate).val(moment().format('MM/DD/YYYY'));
    }

    render() {
        const babyBrithDateId = Helper.getSelectorName(selector.babyBrithDate);

        return (
            <div className="input-group date" data-provide="datepicker">
                <input id={babyBrithDateId} type="text" className="form-control" />
                <div className="input-group-addon">
                    <span className="glyphicon glyphicon-th"></span>
                </div>
            </div>
        );
    }

}