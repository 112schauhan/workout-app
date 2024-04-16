import React from 'react'
import CustomModal from './CustomModal'

describe('<CustomModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CustomModal />)
  })
})