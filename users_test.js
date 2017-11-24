
Feature('Users');

var userName;
var userEmail;
var userPassword;
var userPhone;
var editUserName;

Before((I, loginPage) => {
    I.resizeWindow('maximize');
    I.amOnPage('/');
    loginPage.sendForm('admin@admin.com', 'qweqwe');
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
