describe('API & UI Testing with Cypress', () => {
    let createdCarId;

    const carData = {
        brand: 'Audi',
        model: 'TT',
        mileage: '12500'
    };

    const expenseData = {
        reportedAt: new Date().toISOString().split('T')[0],
        mileage: 13000,
        liters: 45,
        totalCost: 1500
    };

    it('Full cycle: car creation, API checks, expense addition, and UI validation', () => {
        // Встановлюємо перехоплювач (intercept) для POST-запиту створення авто.
        cy.intercept('POST', '/api/cars').as('createCar');

        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');

        // Виконуємо авторизацію користувача через модальне вікно Sign In.
        cy.get('.header_signin').click();
        cy.get('#signinEmail').type('anya.kulya93+01@gmail.com');
        cy.get('#signinPassword').type('Password!123');
        cy.get('.modal-footer').contains('button', 'Login').click();

        // Заповнюємо та відправляємо форму створення нового автомобіля через UI.
        cy.get('button').contains('Add car').click();
        cy.get('#addCarBrand').select(carData.brand);
        cy.get('#addCarModel').select(carData.model);
        cy.get('#addCarMileage').clear().type(carData.mileage);
        cy.get('.modal-footer').contains('button', 'Add').click();

        // Очікуємо завершення перехопленого запиту createCar, зберігаємо ID створеного авто.
        cy.wait('@createCar').its('response.body.data.id').then((id) => {
            createdCarId = id;
            expect(createdCarId).to.exist;
        });

        // Перевіряємо через API (GET /api/cars)
        cy.then(() => {
            cy.request('GET', 'https://qauto.forstudy.space/api/cars').then((response) => {
                expect(response.status).to.eq(200);
                const cars = response.body.data;
                const foundCar = cars.find((car) => car.id === createdCarId);
                expect(foundCar).to.exist;
            });
        });

        // Створюємо витрату для авто за допомогою кастомної команди
        cy.then(() => {
            cy.createExpenseViaApi(createdCarId, expenseData).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data.carId).to.eq(createdCarId);
            });
        });

        cy.contains(`${carData.brand} ${carData.model}`).should('be.visible');

        cy.get('a.btn-sidebar').contains('Fuel expenses').click();

        // Валідуємо на UI, що дані доданої через API витрати (пробіг, літри, сума) правильно відображаються.
        cy.contains(expenseData.mileage).should('be.visible');
        cy.contains(`${expenseData.liters}L`).should('be.visible');
        cy.contains(`${expenseData.totalCost}.00 USD`).should('be.visible');
    });
});