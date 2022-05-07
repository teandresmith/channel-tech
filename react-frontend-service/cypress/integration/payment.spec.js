describe('payment', () => {
  it('User can add to cart & get to payment screen', () => {
    /*
        -> Go to Home Page
        -> click on Shop All
        -> click on item
        -> add to cart
        -> go to cart
        -> checkout
        -> input shipping info
        -> see payment screen
    */

    // Visit Home
    cy.visit('/')

    // Click on Shop All Heading
    cy.findByRole('heading', { name: /shop all/i }).click()

    // Click on Air Pods Item
    cy.findByRole('link', {
      name: /air pods charging case accessories/i,
    }).click()

    // Add Item to Cart
    cy.findByRole('button', { name: /add to cart/i }).click()

    // Go to Cart
    cy.findByTestId('ShoppingCartIcon').click()

    // Head to Checkout
    cy.findByRole('link', { name: /checkout/i }).click()

    // Input Shipping Address Info
    cy.findByRole('textbox', { name: /first name/i }).type('Tommy')
    cy.findByRole('textbox', { name: /last name/i }).type('Jones')
    cy.findByRole('textbox', { name: /email/i }).type('tommy@example.com')
    cy.findByRole('textbox', { name: /street address/i }).type(
      'Example Park Ave'
    )
    cy.findByRole('textbox', { name: /city/i }).type('Example City')
    cy.findByRole('textbox', { name: /postal code/i }).type('111111')
    cy.findByRole('button', { name: /state /i }).click()
    cy.findByRole('option', { name: /alaska/i }).click()

    // Head to Payment
    cy.findByRole('button', { name: /next/i }).click()

    // If no errors then everything went well.
  })
})
