const { Given, Then, When } = require('@cucumber/cucumber')

Given('I open the ultimateqa website link', async () => {
    await browser
        .url('https://ultimateqa.com/automation')
        .waitForElementVisible('body', 5000);
});

When('I navigate to the {string}', async (linkText) => {
    await browser.element
        .findByText(linkText)
        .click()
    browser.pause(2000)
});

Then('I get the page title', async () => {
    console.log("Page Title", await browser.getTitle())
    await browser.pause(2000)
});

Then('From the button group I Click on button {string}', async (number) => {
    if (number == 'random') {
        number = Math.floor(Math.random() * 12) + 1
    }
    browser.element.findAll('.et_pb_button').nth(Number(number) - 1).click()
    await browser.pause(2000)
    browser.element.findAllByText('Button').nth(Number(number) - 1).click()
    await browser.pause(2000)
});