
Feature('Processing points');

var processName, tagsForProcess, ownerForProcess, descriptionForProcess, emailSubscribersForErrors, user, password, port, host;
var caseName, satisfyRegex, followingActions;

Before((I, loginPage) => {
    I.resizeWindow('maximize');
    I.amOnPage('/');
    loginPage.sendForm('admin@admin.com', 'qweqwe');
    I.click('[href="/points"]');
    processName = "Proccess" + Math.floor(Math.random()*1000);
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
});

Scenario('As admin I should be able to create new process @process', (I, processPage) => {
    processPage.addProcessingPoint(processName, tagsForProcess, ownerForProcess, descriptionForProcess, user, password, port, host, dir);
    processPage.addRulesForProcess(caseName, satisfyRegex, followingActions);
    processPage.pushButtonAddPoint();
    I.waitForText(processName, 5);
});
