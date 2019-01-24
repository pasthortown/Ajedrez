import { RegisterModule } from './register.module';

describe('RegisterModule', () => {
    let blackPageModule: RegisterModule;

    beforeEach(() => {
        blackPageModule = new RegisterModule();
    });

    it('should create an instance', () => {
        expect(blackPageModule).toBeTruthy();
    });
});
