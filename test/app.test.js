const expect = require('expect.js');

// describe('App', () => {
const app = require('../app');
const path = require('path');

before(() => {
    console.log('Let the abuse begin...');
    app.SCHED_PAGE_URL = `file:${path.join(__dirname, '../testdata/directory.html')}`;
    return app.getConferences().
        then((conferences) => {
            describe('App', () => {
                it('should count the correct number conferences', async () => {
                    expect(conferences.length).to.be(288);
                });

                describe('Conference', () => {
                    conferences.forEach((conference) => {
                        it('should has a startDate', async () => {
                            const data = await app.getConfDataFrom(conference);
                            expect(data.startDate).not.to.be(undefined);
                        });
                    });
                });
            });
        });
});

it.skip('This is a required placeholder to allow before() to work', () => {
    console.log('Mocha should not require this hack IMHO');
});
