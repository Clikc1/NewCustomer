
Cypress.Commands.add('getElementByXpath', (attribute, value) => {
  cy.get(`[${attribute}=${value}]`);
});

Cypress.Commands.add('clickElementByhref', (hrefChunk) => {
  cy.get('a')
    .filter((index, element) => {
      const href = element.href || '';
      return href.includes(hrefChunk);
    })
    .first()
    .click();
});

Cypress.Commands.add('enterValueById', (id, value) => {
  cy.get(`[id=${id}]`)
    .clear()
    .type(value);
});

Cypress.Commands.add('verifyErrorText', (attribute, value, errorText) => {
  cy.get(`[${attribute}=${value}]`)
    .contains(errorText);
});

Cypress.Commands.add('generateRandomEmail', () => {
  const username = Math.random().toString(36).substring(2, 10);
  const domain = 'gmail.com';
  const email = `${username}@${domain}`;
  return email;
});

Cypress.Commands.add('generateRandomString', (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    result += randomChar;
  }

  return result;
});

Cypress.Commands.add('clickSignIn', () => {
  cy.get('button')
    .should('have.class', 'action login primary')
    .find('span')
    .contains('Sign In')
    .click();
});
