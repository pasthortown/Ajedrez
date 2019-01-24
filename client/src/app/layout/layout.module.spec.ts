import { LayoutModule } from './layout.module';

describe('LayoutModule', () => {
    let blackPageModule: LayoutModule;

    beforeEach(() => {
        blackPageModule = new LayoutModule();
    });

    it('should create an instance', () => {
        expect(blackPageModule).toBeTruthy();
    });
});
