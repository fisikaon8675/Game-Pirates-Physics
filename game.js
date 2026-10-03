const WORLD_WIDTH = 1280 * 5;
const WORLD_HEIGHT = 720 * 5;

let gameState = {
    ammo: 0,
    playerHealth: 100,
    enemiesRemaining: 7,
    isPaused: true,
    gameStarted: false
};

let mobileInput = {
    up: false,
    down: false,
    left: false,
    right: false,
    interact: false
};

// UI Elements
const uiOverlay = document.getElementById('ui-overlay');
const questionModal = document.getElementById('question-modal');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback-text');
const btnQuestion = document.getElementById('btn-question');
const ammoCountText = document.getElementById('ammo-count');
const enemiesCountText = document.getElementById('enemies-count');
const playerHealthFill = document.getElementById('player-health-fill');
const gameMessage = document.getElementById('game-message');
const messageText = document.getElementById('message-text');
const btnRestart = document.getElementById('btn-restart');

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Load assets
        this.load.image('water', 'assets/Tiles/tile_73.png'); // Typical water tile in Kenney Pirate pack
        // Load specific tiles chosen by the user for the 2 biomes
        const tilesToLoad = [
            1, 2, 3, 17, 18, 19, 33, 34, 35, // Biome 1 (Sand)
            6, 7, 8, 9, 22, 23, 24, 41, 54, 55, 56, 57 // Biome 2 (Custom)
        ];

        tilesToLoad.forEach(id => {
            let paddedId = id.toString().padStart(2, '0');
            this.load.image(`tile_${paddedId}`, `assets/Tiles/tile_${paddedId}.png`);
        });

        this.load.image('playerShip', 'assets/Ships/ship (1).png'); // Rufi
        this.load.image('enemyShip_0', 'assets/Ships/ship (2).png');
        this.load.image('enemyShip_1', 'assets/Ships/ship (3).png');
        this.load.image('enemyShip_2', 'assets/Ships/ship (4).png');
        this.load.image('enemyShip_3', 'assets/Ships/ship (5).png');
        this.load.image('enemyShip_4', 'assets/Ships/ship (6).png');
        this.load.image('enemyShip_5', 'assets/Ships/ship (8).png');
        this.load.image('enemyShip_6', 'assets/Ships/ship (9).png');

        this.load.image('cannonBall', 'assets/Ship parts/cannonBall.png');
        this.load.image('explosion', 'assets/Effects/explosion1.png');
        this.load.image('fire', 'assets/Effects/fire1.png');

        // Load Sounds
        this.load.audio('bgm', 'assets/sound/background.mp3');
        this.load.audio('cannon', 'assets/sound/cannon.mp3');
        this.load.audio('gameover', 'assets/sound/gameover.mp3');
        this.load.audio('win', 'assets/sound/win.mp3');
    }

    create() {
        // Setup BGM
        this.sound.stopAll();
        this.bgm = this.sound.add('bgm', { volume: 0.3, loop: true });

        // Create water background
        this.add.tileSprite(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, WORLD_WIDTH, WORLD_HEIGHT, 'water');

        // Setup world bounds
        this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        // Create predefined contiguous blocky islands (10 islands)
        this.islands = this.physics.add.staticGroup();

        this.islandData = [
            { cx: 1000, cy: 800, w: 4, h: 4, module: 'newton' },   // Top-Left (Hukum Newton)
            { cx: 3200, cy: 600, w: 7, h: 2, module: 'fluida' },   // Top-Center (Fluida Statis)
            { cx: 5400, cy: 900, w: 3, h: 5 },    // Top-Right (Bunyi & Gelombang)
            { cx: 800, cy: 1800, w: 2, h: 7 },   // Mid-Left
            { cx: 5600, cy: 2000, w: 5, h: 3 },  // Mid-Right
            { cx: 1200, cy: 2800, w: 4, h: 5 },  // Bottom-Left
            { cx: 3200, cy: 3000, w: 6, h: 3 },  // Bottom-Center
            { cx: 5200, cy: 2700, w: 5, h: 4, module: 'bunyi' },  // Bottom-Right
            { cx: 2000, cy: 1400, w: 3, h: 3 },  // Mid-Top-Left
            { cx: 4400, cy: 2200, w: 3, h: 3 }   // Mid-Bottom-Right
        ];

        const biomes = [
            { // Pulau 1-5
                tl: ['01'], t: ['02'], tr: ['03'],
                l: ['17'], c: ['18'], r: ['19'],
                bl: ['33'], b: ['34'], br: ['35']
            },
            { // Lima pulau lainnya
                tl: ['06'], t: ['07', '08'], tr: ['09'],
                l: ['22'], c: ['23', '24'], r: ['41'],
                bl: ['54'], b: ['55', '56'], br: ['57']
            }
        ];

        const pickTile = (arr) => arr[Phaser.Math.Between(0, arr.length - 1)];

        this.islandData.forEach((island, index) => {
            // Use Biome 1 for the first 5 islands, and Biome 2 for the rest
            let biome = index < 5 ? biomes[0] : biomes[1];

            for (let x = 0; x < island.w; x++) {
                for (let y = 0; y < island.h; y++) {
                    let tileX = island.cx + (x * 64);
                    let tileY = island.cy + (y * 64);

                    let typeArr = biome.c; // Default to center

                    if (x === 0 && y === 0) typeArr = biome.tl;
                    else if (x === island.w - 1 && y === 0) typeArr = biome.tr;
                    else if (x === 0 && y === island.h - 1) typeArr = biome.bl;
                    else if (x === island.w - 1 && y === island.h - 1) typeArr = biome.br;
                    else if (y === 0) typeArr = biome.t;
                    else if (y === island.h - 1) typeArr = biome.b;
                    else if (x === 0) typeArr = biome.l;
                    else if (x === island.w - 1) typeArr = biome.r;

                    let typeId = pickTile(typeArr);
                    this.islands.create(tileX, tileY, `tile_${typeId}`).setScale(1.02).refreshBody();
                }
            }
        });

        // Create Player
        this.player = this.physics.add.sprite(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, 'playerShip');
        this.player.setCollideWorldBounds(true);
        this.player.setDamping(true);
        this.player.setDrag(0.9);
        this.player.setMaxVelocity(300);

        // Create Enemies
        this.enemies = this.physics.add.group();
        for (let i = 0; i < 7; i++) {
            this.spawnEnemy(i);
        }

        // Groups for cannonballs
        this.playerBullets = this.physics.add.group({
            defaultKey: 'cannonBall',
            maxSize: 50
        });

        this.enemyBullets = this.physics.add.group({
            defaultKey: 'cannonBall',
            maxSize: 50
        });

        // Collisions
        this.physics.add.collider(this.player, this.islands);
        this.physics.add.collider(this.enemies, this.islands);
        this.physics.add.collider(this.player, this.enemies);
        this.physics.add.collider(this.enemies, this.enemies);

        // Bullet hits
        this.physics.add.overlap(this.playerBullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.enemyBullets, this.player, this.hitPlayer, null, this);
        this.physics.add.overlap(this.playerBullets, this.islands, this.hitIsland, null, this);
        this.physics.add.overlap(this.enemyBullets, this.islands, this.hitIsland, null, this);

        // Camera setup
        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setZoom(0.8);

        // Create HTML Markers for Learning Islands
        this.learningMarkers = [];
        this.islandData.forEach(isl => {
            if (isl.module) {
                let cx = isl.cx + (isl.w * 64) / 2;
                let cy = isl.cy + (isl.h * 64) / 2;

                let marker = document.createElement('div');
                marker.className = 'island-marker';

                let title = isl.module === 'newton' ? 'Hukum Newton' :
                    isl.module === 'fluida' ? 'Fluida Statis' : 'Bunyi & Gelombang';

                marker.innerHTML = `<div class="marker-icon">📖</div><div class="marker-text">${title}</div>`;
                document.getElementById('ui-overlay').appendChild(marker);

                this.learningMarkers.push({ el: marker, x: cx, y: cy });
            }
        });

        // Inputs
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Mouse click to shoot
        this.input.on('pointerdown', (pointer) => {
            if (gameState.isPaused || gameState.playerHealth <= 0) return;

            if (gameState.ammo > 0) {
                this.shootPlayerBullet(pointer);
            } else {
                // Shake ammo indicator
                ammoCountText.parentElement.style.animation = "shake 0.5s";
                setTimeout(() => { ammoCountText.parentElement.style.animation = ""; }, 500);
            }
        });

        // Enemy shooting timer
        this.time.addEvent({
            delay: 2000,
            callback: this.enemiesShoot,
            callbackScope: this,
            loop: true
        });
    }

    spawnEnemy(index) {
        // Spawn far away from player
        let x, y;
        do {
            x = Phaser.Math.Between(0, WORLD_WIDTH);
            y = Phaser.Math.Between(0, WORLD_HEIGHT);
        } while (Phaser.Math.Distance.Between(this.player.x, this.player.y, x, y) < 800);

        let enemy = this.enemies.create(x, y, 'enemyShip_' + index);
        enemy.setCollideWorldBounds(true);
        enemy.setDamping(true);
        enemy.setDrag(0.9);
        enemy.setMaxVelocity(150);
        enemy.health = 3; // takes 3 hits
    }

    update() {
        if (gameState.isPaused || gameState.playerHealth <= 0) {
            this.player.setAcceleration(0);
            return;
        }

        // Player Movement (Classic 4-way / 8-way)
        let accelX = 0;
        let accelY = 0;
        const speed = 600;

        if (this.cursors.left.isDown || this.wasd.left.isDown || mobileInput.left) {
            accelX = -speed;
        } else if (this.cursors.right.isDown || this.wasd.right.isDown || mobileInput.right) {
            accelX = speed;
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown || mobileInput.up) {
            accelY = -speed;
        } else if (this.cursors.down.isDown || this.wasd.down.isDown || mobileInput.down) {
            accelY = speed;
        }

        this.player.setAcceleration(accelX, accelY);

        // Point the ship in the direction of movement
        // Adding Math.PI / 2 because the sprite natively points UP (-90 degrees)
        if (accelX !== 0 || accelY !== 0) {
            this.player.rotation = Math.atan2(accelY, accelX) + Math.PI / 2;
        }

        // Enemy AI
        this.enemies.getChildren().forEach(enemy => {
            if (enemy.active) {
                // Move towards player
                let distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, this.player.x, this.player.y);
                if (distance < 1500) {
                    let angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
                    // Smooth rotation, considering the +90 degree offset for Kenney sprites
                    enemy.rotation = Phaser.Math.Angle.RotateTo(enemy.rotation, angle + Math.PI / 2, 0.05);
                    this.physics.velocityFromRotation(enemy.rotation - Math.PI / 2, 150, enemy.body.acceleration);
                } else {
                    enemy.setAcceleration(0);
                }
            }
        });

        // Clean up out of bounds bullets
        this.playerBullets.getChildren().forEach(bullet => {
            if (bullet.active && (bullet.x < 0 || bullet.x > WORLD_WIDTH || bullet.y < 0 || bullet.y > WORLD_HEIGHT)) {
                bullet.disableBody(true, true);
            }
        });
        this.enemyBullets.getChildren().forEach(bullet => {
            if (bullet.active && (bullet.x < 0 || bullet.x > WORLD_WIDTH || bullet.y < 0 || bullet.y > WORLD_HEIGHT)) {
                bullet.disableBody(true, true);
            }
        });

        // Update Learning Markers Positions
        let cam = this.cameras.main;
        this.learningMarkers.forEach(marker => {
            let screenX = (marker.x - cam.midPoint.x) * cam.zoom + cam.centerX;
            let screenY = (marker.y - cam.midPoint.y) * cam.zoom + cam.centerY;
            // Translate -50% -100% so the marker anchors its bottom-center to the island center
            marker.el.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -100%)`;
        });

        // Check distance to learning islands
        let activeModule = null;
        for (let i = 0; i < this.islandData.length; i++) {
            let isl = this.islandData[i];
            if (isl.module) {
                // Calculate center point of island
                let cx = isl.cx + (isl.w * 64) / 2;
                let cy = isl.cy + (isl.h * 64) / 2;
                // Interaction radius = 450 pixels
                if (Phaser.Math.Distance.Between(this.player.x, this.player.y, cx, cy) < 450) {
                    activeModule = isl.module;
                    break;
                }
            }
        }

        const prompt = document.getElementById('interaction-prompt');
        if (activeModule) {
            prompt.classList.remove('hidden');
            if (Phaser.Input.Keyboard.JustDown(this.keyE) || mobileInput.interact) {
                mobileInput.interact = false;
                openLearningModal(activeModule);
            }
        } else {
            prompt.classList.add('hidden');
        }
    }

    shootPlayerBullet(pointer) {
        let bullet = this.playerBullets.get(this.player.x, this.player.y);
        if (bullet) {
            bullet.enableBody(true, this.player.x, this.player.y, true, true);

            // Adjust pointer position by camera scroll
            let pointerX = pointer.x + this.cameras.main.scrollX;
            let pointerY = pointer.y + this.cameras.main.scrollY;

            let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointerX, pointerY);

            this.physics.velocityFromRotation(angle, 800, bullet.body.velocity);

            this.sound.play('cannon', { volume: 0.5 });

            gameState.ammo--;
            updateHUD();
        }
    }

    enemiesShoot() {
        if (gameState.isPaused || gameState.playerHealth <= 0) return;

        this.enemies.getChildren().forEach(enemy => {
            if (enemy.active) {
                let distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, this.player.x, this.player.y);
                // Shoot if within range
                if (distance < 800 && Phaser.Math.Between(0, 100) > 30) { // 70% chance to shoot if in range
                    let bullet = this.enemyBullets.get(enemy.x, enemy.y);
                    if (bullet) {
                        bullet.enableBody(true, enemy.x, enemy.y, true, true);
                        let angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
                        // Add some spread/inaccuracy
                        angle += Phaser.Math.FloatBetween(-0.2, 0.2);
                        this.physics.velocityFromRotation(angle, 400, bullet.body.velocity);
                        this.sound.play('cannon', { volume: 0.2 });
                    }
                }
            }
        });
    }

    hitEnemy(bullet, enemy) {
        bullet.disableBody(true, true);

        this.createExplosion(bullet.x, bullet.y);

        enemy.health--;
        if (enemy.health <= 0) {
            this.createExplosion(enemy.x, enemy.y, 2);
            enemy.destroy();
            gameState.enemiesRemaining--;
            updateHUD();

            if (gameState.enemiesRemaining <= 0) {
                this.sound.stopAll();
                this.sound.play('win', { volume: 0.8 });
                gameOver(true);
            }
        }
    }

    hitPlayer(player, bullet) {
        bullet.disableBody(true, true);

        this.createExplosion(bullet.x, bullet.y);

        gameState.playerHealth -= 10;
        updateHUD();

        if (gameState.playerHealth <= 0) {
            this.createExplosion(player.x, player.y, 3);
            player.setVisible(false);
            
            this.sound.stopAll();
            this.sound.play('gameover', { volume: 0.8 });
            
            gameOver(false);
        }
    }

    hitIsland(bullet, island) {
        bullet.disableBody(true, true);
        this.createExplosion(bullet.x, bullet.y, 0.5);
    }

    createExplosion(x, y, scale = 1) {
        let explosion = this.add.sprite(x, y, 'explosion');
        explosion.setScale(scale);
        this.tweens.add({
            targets: explosion,
            alpha: 0,
            scale: scale * 1.5,
            duration: 500,
            onComplete: () => {
                explosion.destroy();
            }
        });
    }
}

// Initialize Game
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainScene]
};

const game = new Phaser.Game(config);

// Handle Window Resize
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

// Mobile Controls Setup
const btnUp = document.getElementById('btn-up');
const btnDown = document.getElementById('btn-down');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnInteract = document.getElementById('btn-interact');

function setupMobileButton(btn, key) {
    if (!btn) return;
    const press = (e) => { e.preventDefault(); mobileInput[key] = true; btn.classList.add('pressed'); };
    const release = (e) => { e.preventDefault(); mobileInput[key] = false; btn.classList.remove('pressed'); };
    
    btn.addEventListener('touchstart', press, { passive: false });
    btn.addEventListener('touchend', release, { passive: false });
    btn.addEventListener('touchcancel', release, { passive: false });
    btn.addEventListener('mousedown', press);
    btn.addEventListener('mouseup', release);
    btn.addEventListener('mouseleave', release);
}

setupMobileButton(btnUp, 'up');
setupMobileButton(btnDown, 'down');
setupMobileButton(btnLeft, 'left');
setupMobileButton(btnRight, 'right');

if (btnInteract) {
    const pressInteract = (e) => { e.preventDefault(); mobileInput.interact = true; btnInteract.classList.add('pressed'); };
    const releaseInteract = (e) => { e.preventDefault(); btnInteract.classList.remove('pressed'); };
    
    btnInteract.addEventListener('touchstart', pressInteract, { passive: false });
    btnInteract.addEventListener('touchend', releaseInteract, { passive: false });
    btnInteract.addEventListener('mousedown', pressInteract);
    btnInteract.addEventListener('mouseup', releaseInteract);
}

// UI Logic

// Game Start Logic
const instructionsModal = document.getElementById('instructions-modal');
const btnStartGame = document.getElementById('btn-start-game');

btnStartGame.addEventListener('click', () => {
    instructionsModal.classList.add('hidden');
    gameState.isPaused = false;
    gameState.gameStarted = true;
    
    // Play BGM
    let mainScene = game.scene.getScene('MainScene');
    if (mainScene && mainScene.bgm && !mainScene.bgm.isPlaying) {
        mainScene.bgm.play();
    }
});

function updateHUD() {
    ammoCountText.innerText = gameState.ammo;
    enemiesCountText.innerText = gameState.enemiesRemaining;

    let hpPercent = Math.max(0, gameState.playerHealth);
    playerHealthFill.style.width = hpPercent + '%';

    if (hpPercent > 50) {
        playerHealthFill.style.background = 'var(--success)';
    } else if (hpPercent > 20) {
        playerHealthFill.style.background = '#f1c40f'; // yellow
    } else {
        playerHealthFill.style.background = 'var(--danger)';
    }
}

// Question Logic
let currentQuestionIndex = -1;

btnQuestion.addEventListener('click', () => {
    if (gameState.isPaused || gameState.playerHealth <= 0 || gameState.enemiesRemaining <= 0) return;

    // Pause game
    gameState.isPaused = true;
    game.scene.pause('MainScene');

    // Show Modal
    questionModal.classList.remove('hidden');
    feedbackText.innerText = '';

    // Pick random question
    currentQuestionIndex = Math.floor(Math.random() * physicsQuestions.length);
    let q = physicsQuestions[currentQuestionIndex];

    questionText.innerText = q.question;

    // Populate options
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        let btn = document.createElement('button');
        btn.className = 'btn-option';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });
});

function checkAnswer(selectedIndex, btnElement) {
    let q = physicsQuestions[currentQuestionIndex];

    // Disable all buttons
    let allBtns = document.querySelectorAll('.btn-option');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (selectedIndex === q.correct) {
        btnElement.classList.add('correct');
        feedbackText.innerText = "Benar! +5 Peluru Meriam!";
        feedbackText.style.color = 'var(--success)';
        gameState.ammo += 5;
        updateHUD();
    } else {
        btnElement.classList.add('wrong');
        allBtns[q.correct].classList.add('correct'); // Show correct answer
        feedbackText.innerText = "Salah! Coba lagi nanti.";
        feedbackText.style.color = 'var(--danger)';
    }

    // Resume game after 2 seconds
    setTimeout(() => {
        questionModal.classList.add('hidden');
        gameState.isPaused = false;
        game.scene.resume('MainScene');
    }, 2000);
}

function gameOver(isWin) {
    gameState.isPaused = true;
    btnQuestion.style.display = 'none';
    gameMessage.classList.remove('hidden');

    if (isWin) {
        messageText.innerText = "MENANG!\nTim Rufi Berhasil!";
        messageText.style.color = 'var(--success)';
    } else {
        messageText.innerText = "KALAH!\nKapal Hancur!";
        messageText.style.color = 'var(--danger)';
    }
}

btnRestart.addEventListener('click', () => {
    // Reset state
    gameState.ammo = 0;
    gameState.playerHealth = 100;
    gameState.enemiesRemaining = 7;
    gameState.isPaused = false;

    updateHUD();
    btnQuestion.style.display = 'block';
    gameMessage.classList.add('hidden');

    // Restart scene
    game.scene.start('MainScene');
});

// Init HUD
updateHUD();

// Learning Logic
const learningModal = document.getElementById('learning-modal');
const learningTitle = document.getElementById('learning-title');
const learningTabs = document.getElementById('learning-tabs');
const learningContent = document.getElementById('learning-content');
const btnCloseLearning = document.getElementById('btn-close-learning');

function openLearningModal(moduleKey) {
    if (gameState.isPaused || gameState.playerHealth <= 0) return;

    // Pause game
    gameState.isPaused = true;
    game.scene.pause('MainScene');

    // Set content
    let mod = learningModules[moduleKey];
    learningTitle.innerText = mod.title;

    if (mod.tabs) {
        learningTabs.classList.remove('hidden');
        learningTabs.innerHTML = '';

        mod.tabs.forEach((tab, index) => {
            let btn = document.createElement('button');
            btn.className = 'tab-btn' + (index === 0 ? ' active' : '');
            btn.innerText = tab.label;
            btn.onclick = () => {
                // Remove active state from all buttons
                Array.from(learningTabs.children).forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                learningContent.innerHTML = tab.content;
            };
            learningTabs.appendChild(btn);
        });

        // Render first tab initially
        learningContent.innerHTML = mod.tabs[0].content;
    } else {
        learningTabs.classList.add('hidden');
        learningContent.innerHTML = mod.content;
    }

    // Show modal
    learningModal.classList.remove('hidden');
    document.getElementById('interaction-prompt').classList.add('hidden');
}

btnCloseLearning.addEventListener('click', () => {
    learningModal.classList.add('hidden');
    gameState.isPaused = false;
    game.scene.resume('MainScene');
});

// CSS for shaking animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
`;
document.head.appendChild(styleSheet);
