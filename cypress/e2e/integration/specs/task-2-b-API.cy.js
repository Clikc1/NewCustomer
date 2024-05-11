
require('../../../support/basic-commands');

describe('Magento 2 API Testing', () => {
  const baseUrl = 'https://magento.softwaretestingboard.com/rest';
  const accessToken = 'cdxf96vcah8pbivc3zzrshd8t15ikua5';
  let customerId;

  it('Create a new customer with address using API', () => {
    cy.generateRandomEmail().then((randomEmail) => {
      const customerData = {
        customer: {
          email: randomEmail,
          firstname: 'Jane',
          lastname: 'Doe',
          addresses: [
            {
              defaultShipping: true,
              defaultBilling: true,
              firstname: 'Jane',
              lastname: 'Doe',
              region: {
                regionCode: 'NY',
                region: 'New York',
                regionId: 43
              },
              postcode: '10755',
              street: ['123 Oak Ave'],
              city: 'Purchase',
              telephone: '512-555-1111',
              countryId: 'US'
            }
          ]
        },
        password: 'Test1234!'
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/V1/customers`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: customerData,
        failOnStatusCode: false
      }).then(response => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.exist;
        customerId = response.body.id;
        cy.log('New customer created successfully. ID:', customerId);
      });
    });
  });

  it('Delete the created customer using API', () => {

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/V1/customers/${customerId}`,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then(deleteResponse => {
      expect(deleteResponse.status).to.equal(200);
      cy.log('Customer deleted successfully.');
    });
  });

});

