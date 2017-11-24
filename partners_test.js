
Feature('Partners');

var partnerName;
var partnerEmail;
var partnerCompany;
var partnerPhone;
var note;
var operationNumber;
var institutionIdentifier;
var editPartnerName;
var editPartnerEmail;
var editPartnerPhone;

Before((I, loginPage) => {
    I.amOnPage('/');
    loginPage.sendForm('admin@admin.com', 'qweqwe');
    partnerName = "user" + Math.floor(Math.random()*100);
    partnerEmail = "mail" + Math.floor(Math.random()*100) + "@mail.com";;
    partnerCompany = "LTD" + Math.floor(Math.random()*100);
    partnerPhone = Math.floor(Math.random()*1000);
    note = "This information about " + partnerName + " is very impotent";
    operationNumber =  Math.floor(Math.random()*1000);
    institutionIdentifier = Math.floor(Math.random()*1000);
    I.click('[href="/partners"]');
    editPartnerName = "Change " + partnerName;
    editPartnerEmail = "new_" + partnerEmail;
    editPartnerPhone = Math.floor(Math.random()*100000);
});

Scenario('create partner @partners', (I, partnersPage) => {
    partnersPage.createNewPartner(partnerName, partnerEmail, partnerCompany, partnerPhone, note, operationNumber, institutionIdentifier);
    I.waitForText(partnerName, 5);
    I.see(partnerName);
});

Scenario('edit created partner @partners', (I, partnersPage) => {
    partnersPage.editCreatedPartner(editPartnerName, editPartnerEmail, editPartnerPhone);
    I.waitForText(editPartnerName, 5);
    I.see(editPartnerName);
    I.see(editPartnerEmail);
    I.see(editPartnerPhone);
});

Scenario('copy edited partner @partners', (I, partnersPage) => {
    partnersPage.copyEditedPartner();
    I.waitForElement('[name=form]');
});

Scenario('delete created partner @partners', (I, partnersPage) => {
    partnersPage.deleteCreatedPartner();
    I.dontSee(editPartnerName);
});
