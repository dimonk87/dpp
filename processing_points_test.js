
Feature('Processing points');

var tagsForProcess, ownerForProcess, descriptionForProcess, emailSubscribersForErrors, user, password, port, host;
var caseName, satisfyRegex, followingActions;
var editProcessName;
var processName = "Proccess" + Math.floor(Math.random()*1000);

Before((I, loginPage) => {
    I.resizeWindow('maximize');
    I.amOnPage('/');
    loginPage.sendForm('admin@admin.com', 'qweqwe');
    I.click('[href="/points"]');
    //processName = "Proccess" + Math.floor(Math.random()*1000);
    tagsForProcess = Math.floor(Math.random()*10000);
    ownerForProcess = "Owner" + Math.floor(Math.random()*100);
    descriptionForProcess = "This information about " + processName + " with this " + tagsForProcess + " and this " + ownerForProcess + " is very impotent";
    user = "User" + Math.floor(Math.random()*1000);
    password =  Date.now();
    port = Math.floor(Math.random()*100);
    host = port;
    dir = "localDir " + port;
    caseName = "Rule" + Math.floor(Math.random()*100);
    satisfyRegex = '/(.*)\.txt/';
    followingActions = "mail" + port + "@mail.com";
    editProcessName = "New " + processName;
});

Scenario('As admin I should be able to create new process @process', (I, processPage) => {
    processPage.addProcessingPoint(processName, tagsForProcess, ownerForProcess, descriptionForProcess, user, password, port, host, dir);
    processPage.addRulesForProcess(caseName, satisfyRegex, followingActions);
    I.waitForText(processName, 5);
});

Scenario('As admin I should be able to edit created process @process', (I, processPage) => {
    processPage.editProcess(editProcessName, host);
    I.waitForText(editProcessName, 5);
});

Scenario('As admin I should be able to copy created process @process', (I, processPage) => {
    processPage.copyEditedProcess();
    I.waitForElement('[name=form]');
    I.see('Edit Processing Point');
});

Scenario('As admin I should be able to delete created process @process @deleteProcess', (I, processPage) => {
    processPage.deleteEditProcess();
    I.dontSee(editProcessName);
});
