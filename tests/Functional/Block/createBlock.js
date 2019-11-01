module.exports = {
    '@tags': ['basic', 'block'],
    'block': function (browser) {
        browser.url(browser.launch_url)
        //login
            .drupalLogin('test', 'test')
            //create block
            .drupalRelativeURL('/block/add/basic?destination=/en/admin/structure/block/block-content')
            .setValue('input[name="info[0][value]"]', 'Test Basic Block')
            .execute(
                function (instance, content) {
                    CKEDITOR.instances[instance].setData(content);
                },
                [
                    "edit-body-0-value",
                    "<p>Test Basic Block with Test Content </p>"
                ]
            )
            .setValue('select[name="moderation_state[0][state]"]', 'published')
            .submitForm('#edit-submit')
            .assert.containsText('body', 'Basic block Test Basic Block has been created.', 'Successfully Created Basic Block')
            .drupalLogout()
            .end();
    }
}


