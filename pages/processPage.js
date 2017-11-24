
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },

  fields: {
    processName: 'input[formcontrolname=name]',
    tagsForProcess: 'input[formcontrolname=tags]',
    ownerForProcess: 'input[formcontrolname=owner]',
    descriptionForProcess: '[formcontrolname=description]',
    emailSubscribersForErrors: '[formcontrolname=emails]',
    user: '[formcontrolname=user]',
    password: '[formcontrolname=password]',
    port: '[formcontrolname=port]',
    host: '[formcontrolname=host]',
    dir: '[formcontrolname=dir]',
    localDir: '[formcontrolname=local_dir]',
    caseName: '[formcontrolname=local_dir]',
    satisfyRegex: 'input.ng-touched',
    followingActions: 'input.ng-untouched[placeholder=Value]'
  },

  buttons: {
    createProcess: 'button[id=add-point-button]',
    addPoint: '[aria-label="Add point"]'
  },

  selects: {
    partners: '[formcontrolname=partners]',
    protocol: '[formcontrolname=protocol]',
    direction: '[formcontrolname=direction]',
    encryptionForFtp: '[formgroupname=connection]',
    executeTaskEvery: '[formcontrolname=interval]',
    conectionTypeForFtp: '[formcontrolname=connection_method]',
    satisfy: '[formcontrolname=satisfy_type]',
    executeFollowingActions: 'mat-select.mat-select-invalid'
  },

  options: {
    firstOption: 'mat-option:first-of-type',
    lastOption: 'mat-option:last-of-type'
  },

  chooseDropDownOption(selector, option){
    I.click(selector);
    I.click(option);
  },

  addProcessingPoint(processName, tagsForProcess, ownerForProcess, descriptionForProcess, user, password, port, host, dir) {
    I.click(this.buttons.createProcess);
    I.fillField(this.fields.processName, processName);
    I.click(this.selects.partners);
    I.click(this.options.firstOption);
    I.click(this.options.lastOption);
    I.pressKey('ESCAPE');
    I.fillField(this.fields.descriptionForProcess, descriptionForProcess);
    this.chooseDropDownOption(this.selects.protocol, this.options.firstOption);
    I.fillField(this.fields.ownerForProcess, ownerForProcess);
    this.chooseDropDownOption(this.selects.direction, this.options.lastOption);
    I.fillField(this.fields.tagsForProcess, tagsForProcess);
    this.chooseDropDownOption(this.selects.encryptionForFtp, this.options.lastOption);
    I.fillField(this.fields.user, user);
    this.chooseDropDownOption(this.selects.conectionTypeForFtp, this.options.lastOption);
    I.fillField(this.fields.password, password);
    this.chooseDropDownOption(this.selects.executeTaskEvery, this.options.firstOption);
    I.fillField(this.fields.port, port);
    I.fillField(this.fields.port, host);
    I.fillField(this.fields.dir, dir);
    I.fillField(this.fields.localDir, dir);
  },

  addRulesForProcess(caseName, satisfyRegex, followingActions) {
    I.fillField(this.fields.caseName, caseName);
    this.chooseDropDownOption(this.selects.satisfy, this.options.firstOption);
    I.fillField(this.fields.satisfyRegex, satisfyRegex);
    this.chooseDropDownOption(this.selects.executeFollowingActions, this.options.lastOption);
    I.fillField(this.fields.followingActions, followingActions);
  },

  pushButtonAddPoint() {
    I.click(this.buttons.addPoint);
  }

  // insert your locators and methods here
}
