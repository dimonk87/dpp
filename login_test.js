
Feature('Test login');

Before((I) => {
    I.resizeWindow('maximize');
    I.amOnPage('/');
});

Scenario('test visible @login', (I) => {
    I.seeInTitle('Data processing point');
    I.waitForText('LOGIN TO YOUR ACCOUNT');
});

Scenario('login positive @login', (I, loginPage) => {
    loginPage.sendForm('admin@admin.com', 'qweqwe');
    I.seeInCurrentUrl('/users');
});

Scenario('login with empty fields @login', (I, loginPage) => {
  loginPage.sendForm('', '');
  I.seeElement('button[disabled]');
});

Scenario('login with incorrect data @login', (I, loginPage) => {
  let emailIncorrect = "mail" + Math.floor(Math.random()*100) + "@mail.com";
  let passwordIncorrect = Math.floor(Math.random()*100);
  loginPage.sendForm(emailIncorrect, passwordIncorrect);
  I.see('Incorrect password or e-mail entered. Please try again.');
});
