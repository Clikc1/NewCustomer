
Cypress.Commands.add('openSignUp', () => {
  cy.visit('https://magento.softwaretestingboard.com/customer/account/create/');
  cy.get('[data-ui-id="page-title-wrapper"]')
    .should('include.text', 'Create New Customer Account');
});

Cypress.Commands.add('getTextContainer', () => {
  cy.get('[data-bind="html: $parent.prepareMessageForHtml(message.text)"]');
});

Cypress.Commands.add('clickCreateAccount', () => {
  cy.get('[title="Create an Account"]')
    .click();
});

Cypress.Commands.add('verifyRequiredErrorText', (id) => {
  cy.get(`[id=${id}]`)
    .contains('This is a required field.');
});

Cypress.Commands.add('verifyIncorrectPasswordErrorText', () => {
  cy.get('[id="password-error"]')
    .contains('Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.');
});

Cypress.Commands.add('verifyIncorrectEmailErrorText', () => {
  cy.get('[id="email_address-error"]')
    .contains('Please enter a valid email address (Ex: johndoe@domain.com).');
});
