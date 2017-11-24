
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  fields: {
    partnerName: 'input[formcontrolname=name]',
    partnerEmail: 'input[formcontrolname=email]',
    partnerCompany: 'input[formcontrolname=company]',
    partnerPhone: 'input[formcontrolname=phone]',
    note: 'textarea[formcontrolname=note]',
    operationNumber: 'input[formcontrolname="bn"]',
    institutionIdentifier: 'input[formcontrolname=ik]'
  },
  createPartnersButton: 'button[id=add-partner-button]',
  addPartnerButton: '[aria-label="Add partner"]',
  editPartnerButton: '[aria-label="Edit partner"]',
  editPartner: 'mat-row:last-of-type [tabindex="0"]',
  copyPartner: 'mat-row:last-of-type button:first-of-type',
  deletePartner: 'mat-row:nth-last-of-type(2) button:last-of-type',
  deletePartnerFirstConfirm: 'fuse-delete-dialog button:first-of-type',
  deletePartnerSecondConfirm: 'fuse-delete-dialog-confirm .mat-button:first-of-type',

  createNewPartner(partnerName, partnerEmail, partnerCompany, partnerPhone, note, operationNumber, institutionIdentifier) {
    I.click(this.createPartnersButton);
    I.fillField(this.fields.partnerName, partnerName);
    I.fillField(this.fields.partnerEmail, partnerEmail);
    I.fillField(this.fields.partnerCompany, partnerCompany);
    I.fillField(this.fields.partnerPhone, partnerPhone);
    I.fillField(this.fields.note, note);
    I.fillField(this.fields.operationNumber, operationNumber);
    I.fillField(this.fields.institutionIdentifier, institutionIdentifier);
    I.click(this.addPartnerButton);
  },

  editCreatedPartner(editPartnerName, editPartnerEmail, editPartnerPhone) {
    I.click(this.editPartner);
    I.fillField(this.fields.partnerName, editPartnerName);
    I.fillField(this.fields.partnerEmail, editPartnerEmail);
    I.fillField(this.fields.partnerPhone, editPartnerPhone);
    I.click(this.editPartnerButton);
  },

  copyEditedPartner() {
    I.click(this.copyPartner);
  },

  deleteCreatedPartner() {
    I.click(this.deletePartner);
    I.click(this.deletePartnerFirstConfirm);
    I.waitForElement(this.deletePartnerSecondConfirm, 5);
    I.click(this.deletePartnerSecondConfirm);
  }
}
