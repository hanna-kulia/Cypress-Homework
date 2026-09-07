import garagePage from '../pageObjects/GaragePage';
import expensesPage from '../pageObjects/ExpensesPage';

const user = {
  email: Cypress.config('userEmail'),
  password: Cypress.config('userPassword'),
};

describe('Garage and Fuel Expenses Flow', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('button').contains('Sign In').click();
    cy.get('#signinEmail').type(user.email);
    cy.get('#signinPassword').type(user.password, { log: false });
    cy.get('.modal-footer button').contains('Login').click();

    cy.url().should('include', '/panel/garage');
  });

  it('should add a new car and add fuel expenses for it', () => {
    const carBrand = 'Audi';
    const carModel = 'TT';
    const initialMileage = '120';
    const newMileage = '150';

    garagePage.addCar(carBrand, carModel, initialMileage);
    garagePage.lastCreatedCarName.should('contain', `${carBrand} ${carModel}`);

    cy.get('.sidebar a[href="/panel/expenses"]').click({ force: true });
    cy.url().should('include', '/panel/expenses');

    expensesPage.addExpense(newMileage, '20', '1000');

    expensesPage.expensesTable.should('contain', newMileage).and('contain', '1000.00 USD');
  });
});
