STEPS FOR SETTING UP NIGHTWATCH
1. Install nodejs
    	1a. sudo yum install nodejs
    	1b. npm update
    	1c. sudo npm cache clean -f
    		sudo npm install -g n
    		sudo n stable
    		sudo n latest
    		yes |sudo  cp -rf /usr/local/bin/node /bin/node

2. Download latest version of selenium-standalone-server.jar and chromedriver to opengov_testing/bin
    2a. cd /path/.../modules/custom/opengov_testing/bin
    2b. wget https://selenium-release.storage.googleapis.com/[VERSION]/selenium-server-standalone-[VERSION].
        -rename to selenium-server-standalone.jar
    2c. wget https://chromedriver.storage.googleapis.com/[VERSION]/chromedriver_linux64.zip
    2d. unzip chromedriver_linux64.zip
    2e. rm chromedriver_linux64.zip

3. Install Nightwatch globally
    3a. npm install -g nightwatch

4. Verify opengov_testing/nightwatch.json, specifically locations of the following:

        "server_path" : "./bin/selenium-server-standalone.jar",
        "webdriver.chrome.driver" : "./bin/chromedriver"

RUNNING TESTS
1. cd /path/.../opengov_testing
    - cd to location of nightwatch.js
2. sudo nightwatch /path/.../opengov_testing/tests/[TESTNAME].js

To test if nightwatch is working, run
    sudo nightwatch tests/basic/homepageTest.js
This just tests if the text "Open Government" is present on homepage

FULL STEPS IN ORDER:
sudo yum install nodejs
npm update
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
sudo n latest
yes |sudo  cp -rf /usr/local/bin/node /bin/node
npm install -g nightwatch
cd /opt/tbs/wcms/open_government/opengov_testing
sudo nightwatch tests/Functional/BasicPage/masterBasicPageTest.js