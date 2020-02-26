const puppeteer = require('puppeteer');
//const sched2conf = require('./app');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sched.com/directory');
  const events = await page.$$('li.eventtile');

  console.log(events.length);

  await browser.close();
})();