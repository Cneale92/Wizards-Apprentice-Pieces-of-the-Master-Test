import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    // Load assets (sprites, images, etc.)
  }

  create() {
    this.add
      .text(400, 100, "Start Menu", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);

    // Menu options
    this.menuOptions = [
      { text: "New Game", action: () => this.startNewGame() },
      { text: "Load Game", action: this.loadGame.bind(this) },
      { text: "Login", action: this.login.bind(this) },
      { text: "Register", action: this.register.bind(this) },
      { text: "Settings", action: this.openSettings.bind(this) },
      { text: "Exit", action: this.exitGame.bind(this) },
    ];

    this.menuText = this.menuOptions.map((option, index) =>
      this.add
        .text(400, 200 + index * 50, option.text, {
          fontSize: "24px",
          fill: "#fff",
        })
        .setOrigin(0.5)
    );

    // Input handling
    this.input.keyboard.on("keydown-ENTER", () => {
      this.menuOptions[this.selectedOption].action();
    });

    // Navigate through the menu
    this.selectedOption = 0;
    this.updateMenuSelection();

    this.input.keyboard.on("keydown-UP", () => {
      this.selectedOption =
        (this.selectedOption - 1 + this.menuOptions.length) %
        this.menuOptions.length;
      this.updateMenuSelection();
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      this.selectedOption = (this.selectedOption + 1) % this.menuOptions.length;
      this.updateMenuSelection();
    });
  }

  updateMenuSelection() {
    this.menuText.forEach((text, index) => {
      text.setFill(index === this.selectedOption ? "#ff0" : "#fff"); // Highlight the selected option
    });
  }

  startNewGame() {
    this.scene.start("WorldMapScene"); // Change to your desired game start
  }

  loadGame() {
    console.log("Load Game clicked!");
    // Implement load game functionality
  }

  login() {
    console.log("Login clicked!");
    // Implement login functionality
  }

  register() {
    console.log("Register clicked!");
    // Implement register functionality
  }

  openSettings() {
    console.log("Settings clicked!");
    // Implement settings functionality
  }

  exitGame() {
    console.log("Exit clicked!");
    // Implement exit game functionality
  }

  update() {
    // Game loop logic (e.g., handling turns)
  }
}

// WorldMapScene class remains unchanged
class WorldMapScene extends Phaser.Scene {
  constructor() {
    super({ key: "WorldMapScene" });
  }

  preload() {
    // Load assets for the world map
    this.load.image("playerSprite", "path/to/playerSprite.png"); // Update the path
  }

  create() {
    this.add
      .text(400, 50, "World Map", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);

    // Create the player sprite
    this.player = this.physics.add.sprite(400, 300, "playerSprite");
    this.player.setCollideWorldBounds(true); // Prevents the player from going out of bounds

    // Create battle instances
    this.battleZone = this.add.zone(500, 300, 100, 100).setOrigin(0);
    this.battleZone.setInteractive();

    this.battleZone.on("pointerdown", () => {
      this.scene.start("BattleScene");
    });

    // Setup keyboard controls for WASD
    this.cursors = this.input.keyboard.addKeys({
      w: Phaser.Input.Keyboard.KeyCodes.W,
      a: Phaser.Input.Keyboard.KeyCodes.A,
      s: Phaser.Input.Keyboard.KeyCodes.S,
      d: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    // Handle player movement with WASD
    if (this.cursors.a.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.d.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursors.w.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.s.isDown) {
      this.player.setVelocityY(160);
    } else {
      this.player.setVelocityY(0);
    }
  }
}

// BattleScene class remains unchanged
class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: "BattleScene" });
  }

  preload() {
    // Load battle assets
  }

  create() {
    this.add
      .text(400, 300, "Battle Scene", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);
    // Setup battle mechanics
  }

  update() {
    // Handle battle logic
  }
}

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [GameScene, WorldMapScene, BattleScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const Game = new Phaser.Game(config);
export { GameScene }; // Add this line to export GameScene
export default Game; // This remains for the Phaser Game instance
