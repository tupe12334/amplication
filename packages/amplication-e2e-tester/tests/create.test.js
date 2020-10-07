const TITLE = "Amplication";
const LOGIN_URL = "http://localhost:3001/login";
const HOME_PAGE_URL = "http://localhost:3001/";
const USER_EMAIL = "lisa@simpson.com";
const USER_PASSWORD = "secret42";
const APP_NAME = "my second app";
const CONTINUE_BUTTON_CONNTENT = "Continue";
const CREATE_BUTTON_CONTENT="Create App";
const TIMEOUT = 60000;
async function URL_VALIDITY(RESULT_URL,CORRECT_URL)
{
  await expect(RESULT_URL).toMatch(CORRECT_URL)
};
describe("create new app test", () => {
  beforeAll(async () => {
    await page.goto(LOGIN_URL);
  }, TIMEOUT);
  it(
    "should create new app  ",
    async () => {
      var RESULT_URL;
      var RESULT_SPAN;
      page.setDefaultTimeout(TIMEOUT);
      await expect(page.title()).resolves.toMatch(TITLE);
      await (await page.waitForXPath("//input[@name='email']")).type(
        USER_EMAIL
      );
      await (await page.waitForXPath('//input[@name="password"]')).type(USER_PASSWORD);
      (
        await page.waitForXPath(`//button[contains(text(),'${CONTINUE_BUTTON_CONNTENT}')]`)
      ).click();
      await page.waitForNavigation();
      RESULT_URL = await page.url();
      URL_VALIDITY(LOGIN_URL,HOME_PAGE_URL);
      await page.click("a.applications__new-app");
      await (await page.waitForXPath("//input[@name='name']")).type(APP_NAME);
      await (
        await page.waitForXPath(
          `//button[@type='submit' and contains(text(),'${CREATE_BUTTON_CONTENT}')]`
        )
      ).click();
      await page.waitForNavigation();
      RESULT_SPAN = await page.waitForXPath(
        '//span[@aria-current="page"]/text()'
      );
      await expect(RESULT_SPAN).toMatch(APP_NAME);
    },
    TIMEOUT
  );
});
