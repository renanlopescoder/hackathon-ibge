import { AlfredPage } from './app.po';

describe('alfred App', () => {
  let page: AlfredPage;

  beforeEach(() => {
    page = new AlfredPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
