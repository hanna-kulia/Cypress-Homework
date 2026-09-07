class ExpensesPage {
  get addExpenseButton() {
    return cy.get('button').contains('Add an expense');
  }

  get mileageInput() {
    return cy.get('#addExpenseMileage');
  }

  get numberLitersInput() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostInput() {
    return cy.get('#addExpenseTotalCost');
  }

  get submitAddExpenseButton() {
    return cy.get('.modal-footer button').contains('Add');
  }

  get expensesTable() {
    return cy.get('.expenses_table, table');
  }

  addExpense(mileage, liters, totalCost) {
    this.addExpenseButton.click();

    // Стираємо початковий пробіг і вводимо новий
    this.mileageInput.clear().type(mileage);
    this.numberLitersInput.type(liters);
    this.totalCostInput.type(totalCost);

    this.submitAddExpenseButton.click();
  }
}

export default new ExpensesPage();
