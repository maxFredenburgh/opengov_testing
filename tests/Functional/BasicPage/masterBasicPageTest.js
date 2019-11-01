module.exports = {
    '@tags': ['basic','page'],
    'basicPage' : function (browser) {
        browser.url(browser.launch_url)
            //login
            .drupalLogin('test','test')
            //create basic page
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
            //preview before creation
            .click('id','edit-preview')
            .assert.urlContains('preview', 'Successfully Previewed Page')
            .click('id','edit-backlink')
            //save as draft
            .setValue('select[name="moderation_state[0][state]"]', 'draft')
            .submitForm('#node-page-form')
            .assert.urlEquals('http://localhost/en/content/test-basic-page','Page Has Been Successfully Created as DRAFT')
            //save as in review
            .setValue('select[name="new_state"]', 'in_review')
            .submitForm('#content-moderation-entity-moderation-form')
            .assert.urlEquals('http://localhost/en/content/test-basic-page','Page Has Been Successfully SAVED as IN REVIEW')
            //save as published
            .setValue('select[name="new_state"]', 'published')
            .submitForm('#content-moderation-entity-moderation-form')
            .assert.urlEquals('http://localhost/en/content/test-basic-page','Page Has Been Successfully SAVED as PUBLISHED')
            //edit basic page
            .click('link text', 'Edit')
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
            //translate basic page
            .click('link text', 'Translate')
            .click('link text','Add')
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
            //delete basic page and translation
            .drupalRelativeURL('/content/test-basic-page')
            .click('link text', 'Delete')
            .submitForm('#node-page-delete-form')
            .waitForElementVisible('body')
            .assert.containsText('body', 'The Basic page Test Basic Page has been deleted', 'Successfully DELETED')
            .assert.urlEquals('http://localhost/en','ALL TESTS SUCCESSFUL')
            //logout
            .drupalLogout()
            .end();
    }
}
