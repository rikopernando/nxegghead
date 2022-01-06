describe('store-ui-shared: Header component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=header--primary&args=title:Welcome to Header;'));
    
    it('should render the component', () => {
      cy.get('.MuiTypography-root').should('contain', 'Welcome to Header');
    });
});
