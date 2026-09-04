describe('Registration Form Tests', () => {
    let dynamicEmail;
    const validPassword = 'Password123';

    before(() => {
        dynamicEmail = `anya.kulya93+test${Date.now()}@gmail.com`;
    });

    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
        cy.get('.hero-descriptor_btn').click();
    });

    it('Should display registration modal header', () => {
        cy.get('.modal-title').should('have.text', 'Registration');
    });

    // --- Перевірка полів Name та Last name ---
    ['signupName', 'signupLastName'].forEach((fieldId) => {
        const fieldName = fieldId === 'signupName' ? 'Name' : 'Last name';

        it(`Validation error for empty ${fieldName}`, () => {
            cy.get(`#${fieldId}`).focus();
            cy.get(`#${fieldId}`).blur();
            cy.get(`#${fieldId}`)
                .next('.invalid-feedback')
                .should('have.text', `${fieldName} required`);
            cy.get(`#${fieldId}`).should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it(`Validation error for wrong data in ${fieldName}`, () => {
            cy.get(`#${fieldId}`).type('123');
            cy.get(`#${fieldId}`).blur();
            cy.get(`#${fieldId}`)
                .next('.invalid-feedback')
                .should('have.text', `${fieldName} is invalid`);
        });

        it(`Validation error for wrong length in ${fieldName}`, () => {
            cy.get(`#${fieldId}`).type('A');
            cy.get(`#${fieldId}`).blur();
            cy.get(`#${fieldId}`)
                .next('.invalid-feedback')
                .should('have.text', `${fieldName} has to be from 2 to 20 characters long`);
        });
    });

    // --- Перевірка поля Email ---
    it('Validation error for empty Email', () => {
        cy.get('#signupEmail').focus();
        cy.get('#signupEmail').blur();
        cy.get('#signupEmail')
            .next('.invalid-feedback')
            .should('have.text', 'Email required');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('Validation error for wrong Email format', () => {
        cy.get('#signupEmail').type('anya.kulya93@invalid');
        cy.get('#signupEmail').blur();
        cy.get('#signupEmail')
            .next('.invalid-feedback')
            .should('have.text', 'Email is incorrect');
    });

    // --- Перевірка полів Password та Re-enter password ---
    it('Validation error for empty Password', () => {
        cy.get('#signupPassword').focus();
        cy.get('#signupPassword').blur();
        cy.get('#signupPassword')
            .next('.invalid-feedback')
            .should('have.text', 'Password required');
    });

    it('Validation error for weak Password', () => {
        cy.get('#signupPassword').type('12345', { sensitive: true });
        cy.get('#signupPassword').blur();
        cy.get('#signupPassword')
            .next('.invalid-feedback')
            .should(
                'have.text',
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
            );
    });

    it('Validation error when Passwords do not match', () => {
        cy.get('#signupPassword').type(validPassword, { sensitive: true });
        cy.get('#signupRepeatPassword').type('Different123', { sensitive: true });
        cy.get('#signupRepeatPassword').blur();
        cy.get('#signupRepeatPassword')
            .next('.invalid-feedback')
            .should('have.text', 'Passwords do not match');
    });

    // --- Кнопка Register та Реєстрація ---
    it('Register button should be disabled when form is invalid', () => {
        cy.get('.modal-footer .btn-primary').should('be.disabled');
    });

    it('Should successfully register a new user with personal email', () => {
        cy.get('#signupName').type('Hanna');
        cy.get('#signupLastName').type('Kulya');
        cy.get('#signupEmail').type(dynamicEmail);
        cy.get('#signupPassword').type(validPassword, { sensitive: true });
        cy.get('#signupPassword').blur();
        cy.get('#signupRepeatPassword').type(validPassword, { sensitive: true });

        cy.get('.modal-footer .btn-primary').should('not.be.disabled').click();

        cy.url().should('include', '/panel/garage');
    });

    // --- Перевірка кастомної команди cy.login() ---
    it('Should log in using custom cy.login() command', () => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });

        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');

        cy.login(dynamicEmail, validPassword);
        cy.url().should('include', '/panel/garage');
    });
});