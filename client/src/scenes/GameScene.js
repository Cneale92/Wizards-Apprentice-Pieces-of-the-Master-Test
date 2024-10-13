import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // Load assets (sprites, images, etc.)
  }

  create() {
    this.add.text(100, 100, "Welcome to the RPG!", {
      fontSize: "32px",
      fill: "#fff",
    });
    // Set up game elements here
  }

  update() {
    // Game loop logic (e.g., handling turns)
  }
}

export default GameScene;
