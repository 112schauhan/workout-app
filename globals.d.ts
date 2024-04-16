declare global {
    declare namespace Cypress {
        interface Chainable {
            moment: typeof import('moment');
            shouldExistAndBeVisible(): Chainable<Element>;
            shouldContainText(text: string): Chainable<Element>;
        }
    }
}