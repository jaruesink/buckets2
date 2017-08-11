import { BucketsPage } from './app.po';
const title = 'hello world!';
describe('buckets App', () => {
    let page;
    beforeEach(() => {
        page = new BucketsPage();
    });
    it(`should display message saying '${title}'`, () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual(title);
    });
});
//# sourceMappingURL=app.e2e-spec.js.map