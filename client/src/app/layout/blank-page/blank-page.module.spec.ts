import { BlankPageModule } from './blank-page.module';

describe('BlankPageModule', () => {
  let blackPageModule: BlankPageModule;

  beforeEach(() => {
    blackPageModule = new BlankPageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
