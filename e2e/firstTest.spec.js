describe('App Detox Test', () => {
  beforeEach(async () => {
    // Uncomment the 1st line when we want to re install the app before every test
    //await device.launchApp({delete: true});
    await device.launchApp({newInstance: true});
  });

  it('Fields are visible', async () => {
    await waitFor(element(by.id('UsernameTestId'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await expect(element(by.id('PasswordTestId'))).toBeVisible();
    await expect(element(by.id('LoginTestId'))).toBeVisible();
    await expect(element(by.id('UsernameErrorTestId'))).toHaveText(" ");
    await expect(element(by.id('PasswordErrorTestId'))).toHaveText(" ");

  });

  it('Perform invalid Login', async () => {
    await waitFor(element(by.id('UsernameTestId'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await element(by.id('UsernameTestId')).tap();
    await element(by.id('UsernameTestId')).typeText('username');
    await element(by.id('PasswordTestId')).typeText('password\n');
    await element(by.id('LoginTestId')).tap();
    await waitFor(element(by.id('UsernameErrorTestId'))).toHaveText("You entered an invalid email!").withTimeout(5000);
    await expect(element(by.id('UsernameErrorTestId'))).toHaveText("You entered an invalid email!");
  });

  it('Perform Valid Login', async () => {
    await waitFor(element(by.id('UsernameTestId'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await element(by.id('UsernameTestId')).tap();
    await element(by.id('UsernameTestId')).typeText('andre.huschek@rocket-internet.de');
    await element(by.id('PasswordTestId')).typeText('testing\n');
    await expect(element(by.id('LoginTestId'))).toBeVisible();
    await element(by.id('LoginTestId')).tap();
    await waitFor(element(by.id('CalendarTestid'))).toBeVisible().withTimeout(120000);
    await expect(element(by.id('CalendarTestid'))).toBeVisible();
  });
})
