class GaragePage {
  get addCarButton() {
    return cy.get('button').contains('Add car');
  }

  get brandSelect() {
    return cy.get('#addCarBrand');
  }

  get modelSelect() {
    return cy.get('#addCarModel');
  }

  get mileageInput() {
    return cy.get('#addCarMileage');
  }

  get submitAddCarButton() {
    return cy.get('.modal-footer button').contains('Add');
  }

  get lastCreatedCarName() {
    return cy.get('p.car_name').first();
  }

  addCar(brand, model, mileage) {
    this.addCarButton.click();
    this.brandSelect.select(brand);
    this.modelSelect.select(model);
    this.mileageInput.type(mileage);
    this.submitAddCarButton.click();
  }
}

export default new GaragePage();
