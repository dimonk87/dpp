
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  fields: {
    userName: 'input[formcontrolname=name]',
    userEmail: 'input[formcontrolname=email]',
    userPassword: 'input[formcontrolname=password]',
    userPhone: 'input[formcontrolname=phone]',
  },
  createUserButton: 'button[id=add-user-button]',
  addUserButton: '.submit-button.mat-raised-button.mat-accent',
  editUserButton: 'button[aria-label="Edit user"]',
  selectUserRole: 'mat-select.mat-select',
  selecktRoleManager: 'mat-option[role=option]:nth-of-type(2)',
  selektList: '.mat-select-content',
  editUser: 'mat-row:last-of-type [tabindex="0"]',
  deleteUser: 'mat-row:last-of-type button:last-of-type',
  deleteUserFirstConfirm: 'fuse-delete-dialog .mat-dialog-actions button:first-of-type',
  deleteUserSecondConfirm: 'fuse-delete-dialog-confirm .mat-dialog-actions .mat-button:first-of-type',

  createNewUser(userName, userEmail, userPassword, userPhone) {
    I.click(this.createUserButton);
    I.fillField(this.fields.userName, userName);
    I.fillField(this.fields.userEmail, userEmail);
    I.fillField(this.fields.userPassword, userPassword);
    I.click(this.selectUserRole);
    I.click(this.selecktRoleManager);
    I.fillField(this.fields.userPhone, userPhone);
    I.click(this.addUserButton);
  },

  editCreatedUser(editUserName) {
    I.click(this.editUser);
    I.fillField(this.fields.userName, editUserName);
    I.click(this.editUserButton);
  },

  deleteCreatedUser() {
    I.click(this.deleteUser);
    I.click(this.deleteUserFirstConfirm);
    I.waitForElement(this.deleteUserSecondConfirm, 5);
    I.click(this.deleteUserSecondConfirm);
  }

  // insert your locators and methods here
}
