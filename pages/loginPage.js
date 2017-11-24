
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  fields: {
    email: 'input[placeholder=Email]',
    password: 'input[placeholder=Password]'
  },
  submitButton: '.submit-button',
  profileButton: '.username',

  sendForm(email, password) {
    I.fillField(this.fields.email, email);
    I.fillField(this.fields.password, password);
    I.click(this.submitButton);
  },

  logOut() {
    I.click(this.profileButton);
    
  }

  // insert your locators and methods here
}
