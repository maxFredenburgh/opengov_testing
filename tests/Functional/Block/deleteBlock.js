module.exports = {
    '@tags': ['basic', 'block'],
    'block': function (browser) {
        browser.url(browser.launch_url)
        //login
            .drupalLogin('test', 'test')
            .drupalRelativeURL('/admin/structure/block/block-content')
            .click('link text','Test Basic Block')
            .click('link text','Delete')
            .submitForm('#block-content-basic-delete-form')
            .assert.containsText('body', 'The custom block Test Basic Block has been deleted.', 'Successfully Deleted Basic Block')
            .drupalLogout()
            .end();
    }
}


