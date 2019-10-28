module.exports = {
    '@tags': ['basic','page'],
    'basicPage' : function (browser) {
        browser.url(browser.launch_url)
            .navigateTo('/content/test')
            .assert.urlEquals('http://localhost:8090/en/content/test')
            .end();
    }
}
