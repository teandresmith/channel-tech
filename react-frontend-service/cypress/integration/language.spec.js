describe('language', () => {
  it('User changes languages to japanese at homepage', () => {
    // Go to Home
    cy.visit('/')

    // Change Language to Japanese
    cy.findByRole('button', { name: /change to japanese/i }).click()

    // // Change back to english
    // cy.findByRole('button', { name: /change to english/i }).click()
  })

  it('User changes language to english at homepage', () => {
    cy.visit('/')
    localStorage.setItem('lang', 'jp')

    cy.findByRole('button', { name: /change to english/i }).click()
  })

  it('User changes language to japanese in shop', () => {
    cy.visit('/')

    cy.findByRole('heading', { name: /shop all/i }).click()

    cy.findByRole('button', { name: /change to japanese/i }).click()
  })

  it('User changes language to english in shop', () => {
    cy.visit('/')
    localStorage.setItem('lang', 'jp')

    cy.findByRole('heading', { name: /shop all/i }).click()
    cy.findByRole('button', { name: /change to english/i }).click()
  })

  it('User changes language to japanese on product details page', () => {
    cy.visit('/')

    cy.findByRole('heading', { name: /shop all/i }).click()
    cy.findByRole('link', {
      name: /air pods charging case accessories \$79\.00/i,
    }).click()
    cy.findByRole('button', { name: /change to japanese/i }).click()
  })

  it('User changes language to english on product details page', () => {
    cy.visit('/')
    localStorage.setItem('lang', 'jp')

    cy.findByRole('heading', { name: /shop all/i }).click()
    cy.findByRole('link', {
      name: /air pods charging case アクセサリー ¥7900\.00/i,
    }).click()
    cy.findByRole('button', { name: /change to english/i }).click()
  })
})
