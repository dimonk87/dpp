
Feature('Users');

var userName;
var userEmail;
var userPassword;
var userPhone;
var editUserName;
var userId;
var unirest = require('unirest');
var token = '';

Before((I, loginPage) => {
    I.resizeWindow('maximize');
    I.amOnPage('/');
    I.sendPostRequest('/api/auth/login',
        {"email": "admin@admin.com", "password": "qweqwe"},
        {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}).then(function(resp) {
        token = resp.body.access_token;
        I.executeScript(`localStorage.setItem('access_token', '${token}')`);
        I.executeScript(`localStorage.setItem('user', '{"data":{"id":1,"name":"admin","email":"admin@admin.com","phone":null,"isBlocked":false,"role":{"data":{"id":1,"name":"admin"}}}}')`);
        //I.refresh();
        I.haveRequestHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    });
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

Scenario('edit created user @usersedit', (I, usersPage) => {
    I.sendPostRequest('/api/users',
        JSON.stringify({'email': userEmail, "name": userName, "password": userPassword, "role": 2, "phone": userPhone, "isBlocked": false})).then(function(resp) {
        userId = resp.body.data.id;
        console.log(userId);
    });
    I.refresh();
    usersPage.editCreatedUser(editUserName);
    I.waitForText(editUserName, 5);
    I.see(editUserName);
});

Scenario('delete created user @users', (I, usersPage) => {
    usersPage.deleteCreatedUser();
    I.dontSee(editUserName);
});
