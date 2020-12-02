import { LightningElement, api, track } from 'lwc';
import { FlowNavigationNextEvent, FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class seriesLexDemo extends LightningElement {
    @api records = [];
    @track _txtOUTVal = '';
    @track selectR = '';
    @api fieldColumns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Title', fieldName: 'Title' },
        { label: 'Department', fieldName: 'Department' }
    ];
    @api
    get txtOUTVal() {
        return this._txtOUTVal;
    }

    set txtOUTVal(val) {
        this._txtOUTVal = val;
    }

    getSelectedName(event) {
        const selectedRows = event.detail.selectedRows;
        for (let i = 0; i < selectedRows.length; i++) {
            selectR = selectR + ' ' + selectedRows[i].Name;
        }
        const attributeChangeEvent = new FlowAttributeChangeEvent('txtOUTVal', selectR);
        this.dispatchEvent(attributeChangeEvent);
    }

    handleNext(event) {
        const nextNavigationEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(nextNavigationEvent);
    }
}