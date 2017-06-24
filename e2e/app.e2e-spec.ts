import { Untitled1Page } from './app.po';

describe('untitled1 App', () => {
  let page: Untitled1Page;

  beforeEach(() => {
    page = new Untitled1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
