import { LightningElement, api, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

export default class SeriesLexLWC extends LightningElement {
    @api objectApiName;
    @api recordIdtxt;
    @api title;
    @api columns;
    @api relatedRecordFieldName;
    @api object;
    @api dynamicFields;
    @api densityMode;
    @api displayMode;
    @track lookupField;
    @track relatedObjectIcon;
    @track idRelatedRecord;
    @track record;
    @track error;
    @track errorObjectInfo;

    @wire(getRecord, { recordId: '$recordIdtxt', fields: '$lookupField' })
    wiredRecord({ error, data }) {
        if (data) {
            this.record = data;
            this.error = undefined;
            this.idRelatedRecord = getFieldValue(this.record, this.relatedRecordFieldName);
        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
    }
    @wire(getObjectInfo, { objectApiName: '$object' })
    wiredRelatedObject({ error, data }) {
        if (data) {
            this.errorObjectInfo = undefined;
            let iconCustomSelector = this.template.querySelector('.iconCustomRelatedRecord');
            if (iconCustomSelector != undefined) {
                this.relatedObjectIcon = data.themeInfo.iconUrl;
                iconCustomSelector.style.backgroundColor = '#' + data.themeInfo.color;
            }
        } else if (error) {
            this.errorObjectInfo = error;
        }
    }

    get recFields() {
        var fieldsList = this.dynamicFields.replace(/\s/g, '').split(',');
        fieldsList = fieldsList.filter(function(el) {
            return el != null && el != '';
        });
        return fieldsList;
    }
}