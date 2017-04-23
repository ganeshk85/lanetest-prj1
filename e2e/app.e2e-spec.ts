import { LaneimgPage } from './app.po';

describe('laneimg App', () => {
  let page: LaneimgPage;

  beforeEach(() => {
    page = new LaneimgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
