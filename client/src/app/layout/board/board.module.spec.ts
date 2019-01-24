import { BoardModule } from "./board.module";

describe("BoardModule", () => {
  let blackPageModule: BoardModule;

  beforeEach(() => {
    blackPageModule = new BoardModule();
  });

  it("should create an instance", () => {
    expect(blackPageModule).toBeTruthy();
  });
});
