module.exports = {
    '@tags': ['basic','page'],
    'basicPage' : function (browser) {
        browser.url(browser.launch_url)
            .drupalLogin('test','test')
            .drupalRelativeURL('/node/add/page')
            .setValue('input[name="title[0][value]"]', 'Test Basic Page')
            .execute(
                function (instance, content) {
                    CKEDITOR.instances[instance].setData(content);
                },
                [
                    "edit-body-0-value",
                    "<p>Test Basic Page with Test Content </p>"
                ]
            )
            .click('id','edit-preview')
            .assert.urlContains('preview', 'Successfully Previewed Page')
            .click('id','edit-backlink')
            .setValue('select[name="moderation_state[0][state]"]', 'draft')
            .submitForm('#node-page-form')
            .assert.urlEquals('http://localhost/en/content/test-basic-page','Page Has Been Successfully Created as DRAFT')
            .setValue('select[name="new_state"]', 'in_review')
            .submitForm('#content-moderation-entity-moderation-form')
            .assert.urlEquals('http://localhost/en/content/test-basic-page','Page Has Been Successfully SAVED as IN REVIEW')
            .setValue('select[name="new_state"]', 'published')
            .submitForm('#content-moderation-entity-moderation-form')
            .assert.urlEquals('http://localhost/en/content/test-basic-page','Page Has Been Successfully SAVED as PUBLISHED')
            .drupalLogout()
            .end();
    }
}
