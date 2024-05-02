All test suites are located in the "cypress/e2e" folder.

In order to run a specific testsuite you need to run the command:
npx cypress run --spec "cypress/e2e/path_to_test_suite_file"

By default, Cypress uses the Electron browser. To explicitly specify Chrome, you need to add the --browser chrome flag at startup.

Other supported browsers:

--browser chrome 
--browser firefox
--browser edge

Thus, in order to **run smoke tests on the main pages** in the Chrome browser, you need to run the command:

npx cypress run --spec "cypress/e2e/verify_pages.cy.js" --browser chrome
