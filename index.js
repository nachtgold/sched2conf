const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sched.com/directory');
  const events = await page.$('li.eventtile:has(div.category:contains("Conference"))');

  console.log(events.length);

  await browser.close();
})();