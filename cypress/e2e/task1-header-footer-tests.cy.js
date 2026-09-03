describe('Header and Footer elements tests', () => {
    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    });

    it('Should find all header buttons and links', () => {
        cy.get('header').find('a.header_logo').should('be.visible');
        cy.get('header').contains('Home').should('be.visible');
        cy.get('header').contains('About').should('be.visible');
        cy.get('header').contains('Contacts').should('be.visible');
        cy.get('header').contains('Guest log in').should('be.visible');
        cy.get('header').contains('Sign In').should('be.visible');
    });

    it('Should find all footer buttons, links and icons', () => {
        cy.get('.icon-facebook').should('be.visible');
        cy.get('.icon-telegram').should('be.visible');
        cy.get('.icon-youtube').should('be.visible');
        cy.get('.icon-instagram').should('be.visible');
        cy.get('.icon-linkedin').should('be.visible');
        cy.contains('a', 'ithillel.ua').should('be.visible');
        cy.contains('a', 'support@ithillel.ua').should('be.visible');
    });
});