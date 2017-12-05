
Feature('Users');

var userName;
var userEmail;
var userPassword;
var userPhone;
var editUserName;
var unirest = require('unirest');
var token = '';

Before((I, loginPage) => {
    I.resizeWindow('maximize');
    I.amOnPage('/');
    I.sendPostRequest('http://localhost:8080/api/auth/login',
        {"email": "admin@admin.com", "password": "qweqwe"},
        {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}).then(function(resp) {
        token = resp.body.access_token;
        I.executeScript(`localStorage.setItem('access_token', '${token}')`);
        I.executeScript(`localStorage.setItem('user', '{"data":{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}}')`);
        I.refresh();
    });
    //loginPage.sendForm('admin@admin.com', 'qweqwe');
    userName = "user" + Math.floor(Math.random()*100);
    userEmail = "mail" + Math.floor(Math.random()*100) + "@mail.com";
    userPassword = "password" + Math.floor(Math.random()*100);
    userPhone = Math.floor(Math.random()*100) + "-" + Math.floor(Math.random()*100);
    editUserName = "Change " + userName;
});

Scenario('create user @users', (I, usersPage) => {
    usersPage.createNewUser(userName, userEmail, userPassword, userPhone);
    I.waitForText(userName, 5);
    I.see(userName);
});

Scenario('edit created user @users', (I, usersPage) => {
    usersPage.editCreatedUser(editUserName);
    I.waitForText(editUserName, 5);
    I.see(editUserName);
});

Scenario('delete created user @users', (I, usersPage) => {
    usersPage.deleteCreatedUser();
    I.dontSee(editUserName);
});
