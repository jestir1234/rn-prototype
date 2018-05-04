describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Fields are visible', async () => {
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await expect(element(by.id('PasswordTestId'))).toBeVisible();
    await expect(element(by.id('LoginTestId'))).toBeVisible();
  });

  it('Perform invalid Login', async () => {
    await element(by.id('UsernameTestId')).typeText('username');
    await element(by.id('PasswordTestId')).typeText('password');
    await element(by.id('LoginTestId')).tap();
  });

  it('Some Sample test', async () => {

  });
})