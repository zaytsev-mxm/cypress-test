/// <reference types="cypress" />
const path = require('path');

describe('download and compare files', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    it('verifies download', () => {
        cy.get('[data-cy=download-pdf]').click();

        const downloadsFolder = Cypress.config('downloadsFolder');
        const downloadedFilename = path.join(downloadsFolder, 'dummy.pdf');

        cy
            .readFile(downloadedFilename, 'binary', {timeout: 15000})
            .then((pdfDownloaded) => {
                cy.fixture('dummy.pdf').then((pdfFixture) => {

                    // NOTE I am not sure how to compare those 2 files directly
                    // because the following comparison does not work.
                    expect(pdfDownloaded).to.deep.equal(pdfFixture);
                })
            });


    });
})
