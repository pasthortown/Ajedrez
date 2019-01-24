import { ProfileModule } from './profile.module';

describe('ProfileModule', () => {
    let blackPageModule: ProfileModule;

    beforeEach(() => {
        blackPageModule = new ProfileModule();
    });

    it('should create an instance', () => {
        expect(blackPageModule).toBeTruthy();
    });
});
