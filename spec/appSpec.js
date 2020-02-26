describe('App', () => {
    const app = require('../app');
    const path = require('path');

    it('hello', () => {
        console.log('hello');
    });

    (async () => {
        app.SCHED_PAGE_URL = `file:${path.join(__dirname, '../testdata/directory.html')}`;
        const conferences = await app.getConferences();
        console.log('magic');

        var originalTimeout;
        beforeAll(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30 * 1000;

        });

        it('should count the correct number conferences', async () => {
            expect(conferences.length).toBe(288);
        });

        describe('Conference', () => {
            for (const conference of conferences) {
                it('should has a startDate', () => {
                    expect(conference.startDate).isNot(undefined);
                });
            }
        });

        afterAll(async () => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
            app.closeBrowser();
        });
    })();
});