describe('API Endpoint Tests', () => {
    before(() => {
        // Start your Next.js server
        cy.exec('npm run dev', { failOnNonZeroExit: false }); // Assuming you have a script named 'dev' to start your Next.js server
        cy.wait(1000); // Wait for the server to start (adjust the wait time as needed)
    });

    after(() => {
        // Stop your Next.js server after tests
        cy.exec('npm run stop', { failOnNonZeroExit: false }); // Assuming you have a script named 'stop' to stop your Next.js server
    });

    it('connects to the database successfully', () => {
        // Check if the database connection is successful
        cy.request('GET', 'http://localhost:3000/api/graphql')
            .its('body')
            .should('contain', 'connected to database successfully');
    });

    // it('returns data from GET request', () => {
    //     // Send a GET request to your API endpoint
    //     cy.request('GET', '/api/getData')
    //         .its('status')
    //         .should('eq', 200);

    //     // Add more assertions as needed to verify the response data
    // });

    // it('responds to POST request', () => {
    //     // Send a POST request to your API endpoint
    //     cy.request({
    //         method: 'POST',
    //         url: '/api/postData',
    //         body: { /* Add request body if needed */ },
    //     })
    //         .its('status')
    //         .should('eq', 200);

    //     // Add more assertions as needed to verify the response data
    // });
});
