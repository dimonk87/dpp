
Feature('Users');

var userName;
var userEmail;
var userPassword;
var userPhone;
var editUserName;
var userId;
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

Before((I) => {
    I.executeScript(`localStorage.setItem('access_token', '${token}')`);
    I.executeScript(`localStorage.setItem('user', '{"data":{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}}')`);
    userName = "user" + Math.floor(Math.random()*1000);
    userEmail = "mail" + Math.floor(Math.random()*1000) + "@mail.com";
    userPassword = "password" + Math.floor(Math.random()*100);
    userPhone = Math.floor(Math.random()*1000) + "-" + Math.floor(Math.random()*1000);
    editUserName = "Change " + userName;
});

Scenario('As admin I should be able to create new user @users @api', (I, usersPage) => {
    I.refresh();
    I.waitForElement('[href="/partners"]');
    usersPage.createNewUser(userName, userEmail, userPassword, userPhone);
    I.waitForText(userName, 5);
    I.see(userName);
    I.sendGetRequest('/api/users').then(function(resp) {
        const usersList = resp.body.data;
        const lastUserId = usersList[usersList.length-1].id;
        I.sendDeleteRequest('/api/users/' + lastUserId);
    });
});

Scenario('As admin I should be able to edit created user @users @api', (I, usersPage) => {
    I.sendPostRequest('/api/users', JSON.stringify({'email': userEmail, "name": userName, "password": userPassword, "role": 2, "phone": userPhone, "isBlocked": false}))
        .then(function(resp) {
            userId = resp.body.data.id;
            I.refresh();
            I.waitForText(userName);
            usersPage.editCreatedUser(editUserName);
            I.waitForText(editUserName, 5);
            I.see(editUserName);
            I.sendDeleteRequest('/api/users/' + userId);
        });

});

Scenario('As admin I should be able to delete created user @users @api', (I, usersPage) => {
    I.sendPostRequest('/api/users', JSON.stringify({'email': userEmail, "name": userName, "password": userPassword, "role": 2, "phone": userPhone, "isBlocked": false}))
        .then(function(resp) {
            userId = resp.body.data.id;
            I.refresh();
            I.waitForText(userName);
            usersPage.deleteCreatedUser();
            I.wait(1);
            I.dontSee(userName);
        });
});
