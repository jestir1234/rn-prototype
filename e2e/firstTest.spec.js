describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });


  it('Perform invalid Login', async () => {
    await element(by.id('UsernameTestId')).typeText('username');
    await element(by.id('PasswordTestId')).typeText('password\n');
    await element(by.id('LoginTestId')).tap();

  });
  it('Fields are visible', async () => {
    await expect(element(by.id('UsernameTestId'))).toBeVisible();
    await expect(element(by.id('PasswordTestId'))).toBeVisible();
    await expect(element(by.id('LoginTestId'))).toBeVisible();
  });

  it('Some Sample test', async () => {

  });
})