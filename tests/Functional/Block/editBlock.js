module.exports = {
    '@tags': ['basic', 'block'],
    'block': function (browser) {
        browser.url(browser.launch_url)
        //login
            .drupalLogin('test', 'test')
            .drupalRelativeURL('/admin/structure/block/block-content')
            .click('link text','Test Basic Block')
            .execute(
                function (instance, content) {
                    CKEDITOR.instances[instance].setData(content);
                },
                [
                    "edit-body-0-value",
                    "<p>Test Basic Block with EDITED Test Content </p>"
                ]
            )
            .setValue('select[name="moderation_state[0][state]"]', 'published')
            .submitForm('#edit-submit')
            .assert.containsText('body', 'Basic block Test Basic Block has been updated.', 'Successfully Edited Basic Block')
            .drupalLogout()
            .end();
    }
}


