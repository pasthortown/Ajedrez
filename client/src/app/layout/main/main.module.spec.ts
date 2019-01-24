import { MainModule } from './main.module';

describe('MainModule', () => {
    let blackPageModule: MainModule;

    beforeEach(() => {
        blackPageModule = new MainModule();
    });

    it('should create an instance', () => {
        expect(blackPageModule).toBeTruthy();
    });
});
