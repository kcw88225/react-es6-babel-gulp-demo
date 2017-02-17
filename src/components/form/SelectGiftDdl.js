import React from 'react';
import Helper from '../../utils/helper';
import {url} from '../../config/url';

const selector = {
    giftDdl: '#gift-ddl'
};

export default class SelectGiftDdl extends React.Component{
    constructor(props) {
        super(props);

        this.addGiftOption = this.addGiftOption.bind(this);
        this.onGiftChange = this.onGiftChange.bind(this);

        this.getSelectedGiftOption = SelectGiftDdl.getSelectedGiftOption;
    }

    static getSelectedGiftOption(){
        let $giftDdl = $(selector.giftDdl),
            giftValue = $giftDdl.val();
            return $giftDdl.find(`option[value="${giftValue}"]`);
    }

    componentDidMount(){
        const self = this;
        
        //add default gift options
        this.props.giftSet.map((gift) => this.addGiftOption(gift));

        //concat special gift from fake api
        $.ajax({
            method: 'GET',
            url: url.getSpecialGift,
            dataType: 'json'
        })
        .done(function( result ) {
            result.map((gift) => self.addGiftOption(gift));
        });
    }

    addGiftOption(gift){
        $(this.giftDdl).append($('<option></option>')
                       .attr('value', gift.value)
                       .attr('data-image', gift.image)
                       .attr('data-description', gift.description)
                       .text(gift.name));
    }

    onGiftChange(e) {
        this.props.onGiftSeltect();
    }

    render() {
        var giftDdlId = Helper.getSelectorName(selector.giftDdl);

        return (
            <select id={giftDdlId} ref={(input) => this.giftDdl = input} className="custom-select form-control" onChange={this.onGiftChange}></select>
        );
    }
}

 SelectGiftDdl.propTypes = {
  giftSet: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onGiftSeltect: React.PropTypes.func.isRequired
};
