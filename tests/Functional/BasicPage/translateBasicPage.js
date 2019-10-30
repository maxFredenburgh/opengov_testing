module.exports = {
    '@tags': ['basic','page'],
    'basicPage' : function (browser) {
        browser.url(browser.launch_url)
            .drupalLogin('test','test')
            .drupalRelativeURL('/content/test-basic-page')
            .assert.urlEquals('http://localhost/en/content/test-basic-page')
            .click('link text', 'Translate')
            .assert.urlContains('translations')
            .click('link text','Add')
            .assert.urlContains('translations/add/en/fr')
            .execute(
                function (instance, content) {
                    CKEDITOR.instances[instance].setData(content);
                },
                [
                    "edit-body-0-value",
                    "<p>Test Basic Page with TRANSLATED Test Content </p>"
                ]
            )
            .submitForm('#node-page-form')
            .assert.urlEquals('http://localhost/fr/contenu/test-basic-page','Page Successfully Translated')
            .drupalLogout()
            .end();
    }
}
