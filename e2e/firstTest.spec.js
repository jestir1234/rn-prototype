describe('Example Detox Test', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('Fields are visible', async () => {
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await expect(element(by.id('PasswordTestId'))).toBeVisible();
    await expect(element(by.id('LoginTestId'))).toBeVisible();
    await expect(element(by.id('ErrorTestId'))).toBeNotVisible();
  });

  it('Perform invalid Login', async () => {
    await waitFor(element(by.id('UsernameTestId'))).toBeVisible().withTimeout(2000);
    await element(by.id('UsernameTestId')).typeText('username');
    await element(by.id('PasswordTestId')).typeText('password\n');
    await waitFor(element(by.id('LoginTestId'))).toBeVisible().withTimeout(2000);
    await element(by.id('LoginTestId')).tap();
    await expect(element(by.id('ErrorTestId'))).toBeVisible();
  });

  it('Perform Valid Login', async () => {
    await waitFor(element(by.id('UsernameTestId'))).toBeVisible().withTimeout(2000);
    await element(by.id('UsernameTestId')).tap();
    await element(by.id('UsernameTestId')).typeText('andre.huschek@rocket-internet.de');
    await element(by.id('PasswordTestId')).typeText('testing\n');
    await waitFor(element(by.id('LoginTestId'))).toBeVisible().withTimeout(2000);
    await element(by.id('LoginTestId')).tap();
    await expect(element(by.id('ErrorTestId'))).toBeNotVisible();
    await waitFor(element(by.id('calendar'))).toBeVisible().withTimeout(120000);
  });
  
})