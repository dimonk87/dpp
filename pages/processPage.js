
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
    caseName: '[formarrayname=rule_sets] [formcontrolname=name]',
    satisfyRegex: '[formarrayname=validation_rules] [formcontrolname=value]',
    followingActions: '[formarrayname=processing_rules] [formcontrolname=value]'
  },

  buttons: {
    createProcess: 'button[id=add-point-button]',
    addPoint: 'mat-card:last-of-type [aria-label="Add point"]',
    editProcess: 'mat-row:last-of-type button[tabindex]',
    editPoint: 'mat-card:last-of-type [aria-label="Edit point"]',
    copyProcess: 'mat-row:last-of-type button:first-of-type',
    deleteProcess: 'mat-row:nth-last-of-type(2) button:last-of-type',
    deletePartnerFirstConfirm: 'fuse-delete-dialog button:first-of-type',
    deletePartnerSecondConfirm: 'fuse-delete-dialog-confirm .mat-button:first-of-type'
  },

  selects: {
    partners: '[formcontrolname=partners]',
    protocol: '[formcontrolname=protocol]',
    direction: '[formcontrolname=direction]',
    encryptionForFtp: '[formcontrolname=encryption]',
    executeTaskEvery: '[formcontrolname=interval]',
    conectionTypeForFtp: '[formcontrolname=connection_method]',
    satisfy: '[formcontrolname="satisfy_type"]',
    satisfyRegexSelect: '[formarrayname=validation_rules] [formcontrolname=type_id]',
    executeFollowingActions: '[formarrayname=processing_rules] [formcontrolname=type_id]'
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
    I.fillField(this.fields.host, host);
    I.fillField(this.fields.dir, dir);
    I.fillField(this.fields.localDir, dir);
  },

  addRulesForProcess(caseName, satisfyRegex, followingActions) {
    I.click('[name=form]');
    I.fillField(this.fields.caseName, caseName);
    I.waitForClickable(this.selects.satisfy, 5);
    this.chooseDropDownOption(this.selects.satisfy, this.options.firstOption);
    I.fillField(this.fields.satisfyRegex, satisfyRegex);
    this.chooseDropDownOption(this.selects.satisfyRegexSelect, this.options.firstOption);
    I.waitForClickable(this.selects.executeFollowingActions, 5);
    I.fillField(this.fields.followingActions, followingActions);
    this.chooseDropDownOption(this.selects.executeFollowingActions, this.options.lastOption);
    I.click('[name=form]');
    this.pushButtonAddPoint(this.buttons.addPoint);
  },

  pushButtonAddPoint(option) {
    I.pressKey('END');
    I.waitForClickable(option, 5);
    I.click(option);
  },

  editProcess(editProcessName, host) {
    I.click(this.buttons.editProcess);
    I.fillField(this.fields.processName, editProcessName);
    this.chooseDropDownOption(this.selects.conectionTypeForFtp, this.options.firstOption);
    I.fillField(this.fields.host, host);
    I.click('[name=form]');
    this.chooseDropDownOption(this.selects.satisfy, this.options.lastOption);
    I.click('[name=form]');
    this.pushButtonAddPoint(this.buttons.editPoint);
  },

  copyEditedProcess() {
    I.click(this.buttons.copyProcess);
  },

  deleteEditProcess() {
    I.click(this.buttons.deleteProcess);
    I.click(this.buttons.deletePartnerFirstConfirm);
    I.waitForElement(this.buttons.deletePartnerSecondConfirm, 5);
    I.click(this.buttons.deletePartnerSecondConfirm);
  }

  // insert your locators and methods here
}
