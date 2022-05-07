describe('login', () => {
  it('User can login and display user profile', () => {
    /*
            -> Visit Home
            -> Click Login
            -> Input Email & Password
            -> Check if Cookies are present
            -> Go to User Profile
        */

    // Visit Home
    cy.visit('/')
    cy.clearLocalStorage()
    cy.clearCookie('Token')
    cy.clearCookie('RefreshToken')

    cy.findByRole('link', { name: /login/i }).click()

    cy.findByRole('textbox', { name: /email/i }).type('admin@admin.com')
    cy.findByRole('textbox', { name: /Password/i }).type('12345')

    cy.findByRole('button', { name: /login/i }).click()

    cy.findByRole('button', { name: /person/i }).click()

    cy.findByRole('menuitem', { name: /admin's profile/i }).click()
  }),
    it('User login and change default shipping address', () => {
      cy.visit('/')
      cy.clearLocalStorage()
      cy.clearCookie('Token')
      cy.clearCookie('RefreshToken')

      cy.findByRole('link', { name: /login/i }).click()

      cy.findByRole('textbox', { name: /email/i }).type('admin@admin.com')
      cy.findByRole('textbox', { name: /Password/i }).type('12345')

      cy.findByRole('button', { name: /login/i }).click()

      cy.findByRole('button', { name: /person/i }).click()

      cy.findByRole('menuitem', { name: /admin's profile/i }).click()

      cy.findByText(/shipping address/i).click()

      // Input new address
      cy.findByRole('textbox', { name: /street address/i })
        .clear()
        .type('Admin Street 11111')
      cy.findByRole('textbox', { name: /city/i }).clear().type('Example City')

      cy.findByRole('textbox', { name: /postal code/i })
        .clear()
        .type('11111')
      cy.findByRole('button', { name: /state/i }).click()
      cy.findByRole('option', { name: /california/i }).click()

      cy.findByRole('button', { name: /save/i }).click()
    })
})
