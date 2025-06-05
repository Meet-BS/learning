const { chromium } = require('playwright'); // or 'firefox' or 'webkit'

(async () => {
  const browser = await chromium.launch({ headless: false }); // open browser
  const context = await browser.newContext();

  // Set cookie manually
  await context.addCookies([{
    name: 'validAge',
    value: 'true',
    domain: '.drinkthedrop.com',  // <- Notice leading dot for subdomains!
    path: '/',
    secure: true,
    httpOnly: false,
    sameSite: 'Lax',
    expires: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
  }]);

  const page = await context.newPage();

  // Now go to the website
  await page.goto('https://www.drinkthedrop.com');

  // Optional: Check if cookie is there
  const cookies = await context.cookies();
  console.log(cookies);

  // Keep browser open for inspection
  // await browser.close();
})();
