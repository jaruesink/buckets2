import { BucketsPage } from './app.po';

const title = 'hello world!';

describe('buckets App', () => {
  let page: BucketsPage;

  beforeEach(() => {
    page = new BucketsPage();
  });

  it(`should display message saying '${title}'`, () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(title);
  });
});
