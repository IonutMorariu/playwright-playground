import { webkit, devices } from 'playwright';

const iPhone = devices['iPhone 11 Pro Max'];

const main = async () => {
  const browser = await webkit.launch({ headless: true });

  const context = await browser.newContext({
    ...iPhone,
    permissions: ['geolocation'],
    geolocation: { latitude: 52.52, longitude: 13.39 },
    colorScheme: 'dark',
    locale: 'de-DE',
  });

  // Create a page.
  const page = await context.newPage();

  // Navigate explicitly, similar to entering a URL in the browser.
  await page.goto('https://hotel.check24.es/lp/Madrid/52806');

  await page.click('text="OK"');

  const element = await page.waitForSelector('#resultsListContainer');

  element.scrollIntoViewIfNeeded();

  await page.waitForTimeout(5000);

  const now = Date.now();

  await page.screenshot({
    path: `screenshots/${now}/Madrid.jpg`,
  });

  await browser.close();
};

main();
