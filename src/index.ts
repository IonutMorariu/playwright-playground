import { webkit, devices } from 'playwright';

const iPhone = devices['iPhone 11 Pro Max'];

const main = async () => {
  const browser = await webkit.launch({ headless: false });

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
  await page.goto('http://hotel.check24.es');

  await page.click('text="OK"');
};

main();
