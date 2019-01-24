import { LoginModule } from './login.module';

describe('LoginModule', () => {
    let blackPageModule: LoginModule;

    beforeEach(() => {
        blackPageModule = new LoginModule();
    });

    it('should create an instance', () => {
        expect(blackPageModule).toBeTruthy();
    });
});
