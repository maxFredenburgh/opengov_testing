module.exports = {
    '@tags': ['basic','page'],
    'basicPage' : function (browser) {
        browser.url(browser.launch_url)
            .drupalLogin('test','test')
            .drupalRelativeURL('/content/test-basic-page')
            .assert.urlEquals('http://localhost/en/content/test-basic-page')
            .click('link text', 'Delete')
            .assert.urlContains('delete')
            .submitForm('#node-page-delete-form')
            .waitForElementVisible('body')
            .assert.containsText('body', 'The Basic page Test Basic Page has been deleted', 'Successfully DELETED')
            .drupalLogout()
            .end();
    }
}
