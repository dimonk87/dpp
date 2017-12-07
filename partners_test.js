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
var unirest = require('unirest');
var token = '';

BeforeSuite((I) => {
    I.resizeWindow('maximize');
    I.amOnPage('/');
    I.sendPostRequest('/api/auth/login',
        {"email": "admin@admin.com", "password": "qweqwe"},
        {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}).then(function(resp) {
        token = resp.body.access_token;
        I.executeScript(`localStorage.setItem('access_token', '${token}')`);
        I.executeScript(`localStorage.setItem('user', '{"data":{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}}')`);
        I.haveRequestHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    });
});

Before((I, loginPage) => {
    I.executeScript(`localStorage.setItem('access_token', '${token}')`);
    I.executeScript(`localStorage.setItem('user', '{"data":{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}}')`);
    partnerName = "user" + Math.floor(Math.random()*100);
    partnerEmail = "mail" + Math.floor(Math.random()*100) + "@mail.com";;
    partnerCompany = "LTD" + Math.floor(Math.random()*100);
    partnerPhone = Math.floor(Math.random()*1000);
    note = "This information about " + partnerName + " is very impotent";
    operationNumber =  Math.floor(Math.random()*1000);
    institutionIdentifier = Math.floor(Math.random()*1000);
    editPartnerName = "Change " + partnerName;
    editPartnerEmail = "new_" + partnerEmail;
    editPartnerPhone = Math.floor(Math.random()*100000);
});

Scenario('As admin I should be able to create new partner @partners', (I, partnersPage) => {
    I.refresh();
    I.click('[href="/partners"]');
    partnersPage.createNewPartner(partnerName, partnerEmail, partnerCompany, partnerPhone, note, operationNumber, institutionIdentifier);
    I.waitForText(partnerName, 5);
    I.see(partnerName);
    I.sendGetRequest('/api/partners?page=1').then(function (resp) {
        const partnersList = resp.body.data;
        const lastPartnerId = partnersList[partnersList.length-1].id;
        I.sendDeleteRequest('/api/partners/' + lastPartnerId);
    });
});

Scenario('As admin I should be able to edit created partner @partners', (I, partnersPage) => {
    I.sendPostRequest('/api/partners', JSON.stringify({
        "name": partnerName,
        "email": partnerEmail,
        "company": partnerCompany,
        "phone": partnerPhone,
        "note": note,
        "bn": operationNumber,
        "ik": institutionIdentifier
    })).then(function(resp) {
        partnerId = resp.body.data.id;
        I.refresh();
        I.waitForElement('[href="/partners"]');
        I.click('[href="/partners"]');
        I.waitForText(partnerName);
        partnersPage.editCreatedPartner(editPartnerName, editPartnerEmail, editPartnerPhone);
        I.waitForText(editPartnerName, 5);
        I.see(editPartnerName);
        I.see(editPartnerEmail);
        I.see(editPartnerPhone);
        I.sendDeleteRequest('/api/partners/' + partnerId);
    });
});

Scenario('As admin I should be able to copy edited partner @partners', (I, partnersPage) => {
    I.sendPostRequest('/api/partners', JSON.stringify({
        "name": editPartnerName,
        "email": editPartnerEmail,
        "company": partnerCompany,
        "phone": editPartnerPhone,
        "note": note,
        "bn": operationNumber,
        "ik": institutionIdentifier
    })).then(function(resp) {
        partnerId = resp.body.data.id;
        I.refresh();
        I.waitForElement('[href="/partners"]');
        I.click('[href="/partners"]');
        I.waitForText(editPartnerName);
        partnersPage.copyEditedPartner();
        I.waitForElement('[name=form]');
        I.sendDeleteRequest('/api/partners/' + partnerId);
        I.sendGetRequest('/api/partners?page=1').then(function (resp) {
            const partnersList = resp.body.data;
            const lastPartnerId = partnersList[partnersList.length-1].id;
            I.sendDeleteRequest('/api/partners/' + lastPartnerId);
        });
    });
});

Scenario('As admin I should be able to delete created partner @partners', (I, partnersPage) => {
    I.sendPostRequest('/api/partners', JSON.stringify({
        "name": partnerName,
        "email": partnerEmail,
        "company": partnerCompany,
        "phone": partnerPhone,
        "note": note,
        "bn": operationNumber,
        "ik": institutionIdentifier
    })).then(function(resp) {
        partnerId = resp.body.data.id;
        I.refresh();
        I.waitForElement('[href="/partners"]');
        I.click('[href="/partners"]');
        I.waitForText(partnerName);
        partnersPage.deleteCreatedPartner();
        I.wait(1);
        I.dontSee(partnerName);
    });
});
