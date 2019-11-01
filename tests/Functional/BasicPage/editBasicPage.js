module.exports = {
    '@tags': ['basic','page'],
    'basicPage' : function (browser) {
        browser.url(browser.launch_url)
            .drupalLogin('test','test')
            .drupalRelativeURL('/content/test-basic-page')
            .assert.urlEquals('http://localhost/en/content/test-basic-page')
            .click('link text', 'Edit')
            .assert.urlContains('edit')
            .execute(
                function (instance, content) {
                    CKEDITOR.instances[instance].setData(content);
                },
                [
                    "edit-body-0-value",
                    "<p>Test Basic Page with EDITED Test Content </p>"
                ]
            )
            .submitForm('#node-page-edit-form')
            .assert.urlEquals('http://localhost/en/content/test-basic-page','Page Successfully Edited')
            .drupalLogout()
            .end();
    }
}
