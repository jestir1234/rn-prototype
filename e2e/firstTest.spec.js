describe('App Detox Test', () => {
  beforeEach(async () => {
    // Uncomment the 1st line when we want to re install the app before every test
    //await device.launchApp({delete: true});
    await device.launchApp({delete: true});
    await device.enableSynchronization();
  });

  it('Fields are visible', async () => {
    await waitFor(element(by.id('UsernameTestId'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await expect(element(by.id('PasswordTestId'))).toBeVisible();
    await expect(element(by.id('LoginTestId'))).toBeVisible();
    await expect(element(by.id('EmailErrorTestId'))).toNotExist();
    await expect(element(by.id('PasswordErrorTestId'))).toNotExist();

  });

  it('Perform invalid Login', async () => {
    await waitFor(element(by.id('UsernameTestId'))).toBeVisible().withTimeout(8000);
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await element(by.id('UsernameTestId')).tap();
    await element(by.id('UsernameTestId')).typeText('username\n');
    await element(by.id('PasswordTestId')).tap();
    await element(by.id('PasswordTestId')).typeText('password\n');
    await element(by.id('LoginTestId')).tap();
    await waitFor(element(by.id('EmailErrorTestId'))).toExist().withTimeout(2000);
    await expect(element(by.id('EmailErrorTestId'))).toExist();
  });
  
  it('Perform Valid Login', async () => {
    await waitFor(element(by.id('UsernameTestId'))).toBeVisible().withTimeout(8000);
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await element(by.id('UsernameTestId')).tap();
    await element(by.id('UsernameTestId')).typeText('andre.huschek@rocket-internet.de\n');
    await element(by.id('PasswordTestId')).tap();
    await element(by.id('PasswordTestId')).typeText('testing\n');
    await expect(element(by.id('LoginTestId'))).toBeVisible();
    await element(by.id('LoginTestId')).tap();
    await expect(element(by.id('EmailErrorTestId'))).toNotExist();
    await expect(element(by.id('PasswordErrorTestId'))).toNotExist();
    await waitFor(element(by.id('CalendarTestid'))).toBeVisible().withTimeout(120000);
    await expect(element(by.id('CalendarTestid'))).toBeVisible();
  });
})
