const puppeteer = require('puppeteer')

const App = {
    SCHED_PAGE_URL: 'https://sched.com/directory',
    CONF_DATA_TEMPLATE: {
        "name": undefined,
        "url": undefined,
        "startDate": undefined,
        "endDate": undefined,
        "city": undefined,
        "country": undefined,
        "twitter": undefined,
        "cfpUrl": undefined, // call for papers
        "cfpEndDate": undefined
    },
    browser: undefined,
    async getConferences() {
        if (this.browser) {
            await this.browser.close();
        }

        this.browser = await puppeteer.launch();
        const page = await this.browser.newPage();
        await page.goto(this.SCHED_PAGE_URL);

        // could by li.eventtile:has(div.category:contains("Conference")) but Chrome does not support :has
        const events = await page.$$('li.eventtile');

        // forEach, filter and Co. seems not to support Promises
        const conferences = []
        for (const n of events) {
            const category = await n.$eval('div.category', node => node.innerText);
            if ('Conference' === category) {
                conferences.push(n);
            }
        }
        return conferences;
    },
    async getConfDataFrom(conference) {
        const data = this.CONF_DATA_TEMPLATE;

        data.name = await conference.$eval('div.eventname', node => node.innerText);
        data.startDate = await conference.$eval('div.eventdate', node => node.innerText);

        return data;
    },
    async closeBrowser() {
        await this.browser.close();
    }
}

module.exports = App;