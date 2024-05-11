
require('../../../support/basic-commands');
require('../../../support/create-customer-commands');

describe('Test task 2 - cases', () => {

  beforeEach(() => {
    cy.openSignUp();
});

  const baseUrl = 'https://magento.softwaretestingboard.com/rest';
  const accessToken = 'cdxf96vcah8pbivc3zzrshd8t15ikua5';

  it('Verify that all fields are required', () => {
    cy.clickCreateAccount();
    cy.verifyRequiredErrorText('firstname-error');
    cy.verifyRequiredErrorText('lastname-error');
    cy.verifyRequiredErrorText('email_address-error');
    cy.verifyRequiredErrorText('password-error');
    cy.verifyRequiredErrorText('password-confirmation-error');
})

  it('Verify that invalid First Name cannot be saved - with Spaces only', () => {
    cy.enterValueById('firstname', '   ');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');
    cy.clickCreateAccount();

    cy.verifyRequiredErrorText('firstname-error');
})

  it('Verify that invalid Last Name cannot be saved - with Spaces only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', '   ');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');
    cy.clickCreateAccount();

    cy.verifyRequiredErrorText('lastname-error');
})

  it('Verify that invalid First Name cannot be saved - with 300 characters', () => {
    cy.generateRandomString(300).then((randomString) => {
    cy.enterValueById('firstname', randomString);
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'unique123@gmail.com');
    cy.enterValueById('password-confirmation', 'Test1234!');

    cy.enterValueById('password', 'Test1234!');
    cy.clickCreateAccount();
    cy.wait(2000);
    cy.getTextContainer()
       .contains('First Name is not valid!');
  });
})

  it('Verify that invalid Last Name cannot be saved - with 300 characters', () => {
    cy.generateRandomString(300).then((randomString) => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', randomString);
    cy.enterValueById('email_address', 'unique123@gmail.com');
    cy.enterValueById('password-confirmation', 'Test1234!');

    cy.enterValueById('password', 'Test1234!');
    cy.clickCreateAccount();
    cy.wait(2000);
    cy.getTextContainer()
       .contains('Last Name is not valid!');
  });
})

  it('Verify that invalid email cannot be saved - without @ and . (dot)', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');
    cy.clickCreateAccount();

    cy.verifyIncorrectEmailErrorText();
})

  it('Verify that invalid email cannot be saved - without @', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example123.com');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');
    cy.clickCreateAccount();

    cy.verifyIncorrectEmailErrorText();
})

  it('Verify that invalid email cannot be saved - without . (dot)', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example123@com');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');
    cy.clickCreateAccount();

    cy.verifyIncorrectEmailErrorText();
})

  it('Verify that invalid email cannot be saved - without local part', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', '@example.com');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');
    cy.clickCreateAccount();

    cy.verifyIncorrectEmailErrorText();
})

  it('Verify that invalid email cannot be saved - without domain part', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example@.com');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');
    cy.clickCreateAccount();

    cy.verifyIncorrectEmailErrorText();
})

  it('Verify that invalid email cannot be saved - without top level domain part', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example@example.');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');
    cy.clickCreateAccount();

    cy.verifyIncorrectEmailErrorText();
})

  it('Verify that invalid password cannot be saved - less than 8 characters', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.clickCreateAccount();
    cy.verifyErrorText('id','password-error',
    'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');
})

  it('Verify that invalid password cannot be saved - lower case only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', 'exampleexample');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - upper case only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', 'EXAMPLEEXAMPLE');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - digits only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', '123456789');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - special characters only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', '!@#$%^&*()');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - lower + upper case only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', 'exampleEXAMPLE');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - lower case + digits only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', 'example1234');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - lower case + special characters only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', 'example!@#$%');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - upper case + digits only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', 'EXAMPLE12345');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - upper case + special characters only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', 'EXAMPLE!@#$%');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that invalid password cannot be saved - digits + special characters only', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', '12345!@#$%');
    cy.clickCreateAccount();
    cy.verifyIncorrectPasswordErrorText();
})

  it('Verify that passwords entered should be equal', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'example');
    cy.enterValueById('password-confirmation', 'example');

    cy.enterValueById('password', 'example!@#$%');
    cy.clickCreateAccount();
    cy.verifyErrorText('id','password-confirmation-error',
    'Please enter the same value again.');
})

  it('Verify that Password Strength: No Password - indicated', () => {
    cy.verifyErrorText('id','password-strength-meter-label',' No Password ');
})

  it('Verify that Password Strength: Weak - indicated', () => {
    cy.enterValueById('password', '1');
    cy.verifyErrorText('id','password-strength-meter-label','Weak');
})

  it('Verify that Password Strength: Medium - indicated', () => {
    cy.enterValueById('password', 'AAAAAAb123');
    cy.verifyErrorText('id','password-strength-meter-label','Medium');
})

  it('Verify that Password Strength: Strong - indicated', () => {
    cy.enterValueById('password', 'AAAAAAb12311');
    cy.verifyErrorText('id','password-strength-meter-label','Strong');
})

  it('Verify that Password Strength: Very Strong - indicated', () => {
    cy.enterValueById('password', 'AAAAAAb12311!!');
    cy.verifyErrorText('id','password-strength-meter-label','Very Strong');
})

  it('Verify that user with the same email cannot be created twice', () => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', 'ravikernst@gmail.com');
    cy.enterValueById('password-confirmation', 'Test1234!');

    cy.enterValueById('password', 'Test1234!');
    cy.clickCreateAccount();
    cy.getTextContainer()
       .contains('There is already an account with this email address. If you are sure that it is your email address, ');
})

  it('Ensure that the account created successfully', () => {
    cy.generateRandomEmail().then((randomEmail) => {
    cy.enterValueById('firstname', 'example');
    cy.enterValueById('lastname', 'example');
    cy.enterValueById('email_address', randomEmail);
    cy.enterValueById('password-confirmation', 'Test1234!');

    cy.enterValueById('password', 'Test1234!');
    cy.clickCreateAccount();
    cy.wait(3000)
    cy.getTextContainer()
      .contains('Thank you for registering with Main Website Store.');

    Cypress.env('randomEmail', randomEmail);
     });
})

  it('Ensure that created account is usable', () => {
    const randomEmail = Cypress.env('randomEmail');
    cy.clickElementByhref('8%2C');
    cy.enterValueById('email', randomEmail);
    cy.getElementByXpath('title','Password')
      .type('Test1234!')
    cy.clickSignIn();
    cy.verifyErrorText('data-ui-id','page-title-wrapper',
    'My Account');
})

  it('Ensure that "Create New Customer Account" page is achievable by clicking on the header link', () => {
    cy.clickElementByhref('8%2C');
    cy.clickElementByhref('/create');
    cy.verifyErrorText('data-ui-id','page-title-wrapper',
    'Create New Customer Account');
})

  it('Clean up - delete the customer using Magento 2 API', () => {
   const customerEmail = Cypress.env('randomEmail');

   if (customerEmail) {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/V1/customers/search`,
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
      },
          qs: {
            'searchCriteria[filterGroups][0][filters][0][field]': 'email',
            'searchCriteria[filterGroups][0][filters][0][value]': customerEmail
          },
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.equal(200);

          const customers = response.body.items;
          if (customers.length > 0) {
            const customerId = customers[0].id;
            cy.log(`Customer ID found for ${customerEmail}: ${customerId}`);

            cy.request({
              method: 'DELETE',
              url: `${baseUrl}/V1/customers/${customerId}`,
              headers: {
                'Authorization': `Bearer ${accessToken}`
              },
              failOnStatusCode: false
            }).then(deleteResponse => {
              expect(deleteResponse.status).to.equal(200);
              cy.log(`Customer with email ${customerEmail} deleted successfully.`);
            });
          } else {
            cy.log(`No customer found with email: ${customerEmail}`);
          }
        });
      } else {
        cy.log('No random email stored in Cypress environment variable.');
      }
});

})
