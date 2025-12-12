const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 720,
    height: 720,
    backgroundColor: "000000",
    physics: {
        default: 'arcade',
        arcade: {
            enableBody: true,
            debug: true
        }
    },
    scene: [
        TitleScene,]
};

function audioController(audioNum, loop = false, playOption = 'play', time = null) {
    gameState.backgroundMusic[audioNum].setLoop(loop);
    playOption === 'stop' ? gameState.backgroundMusic[audioNum].stop() :
    playOption === 'pause' ? gameState.backgroundMusic[audioNum].pause() :
    playOption === 'resume' ? gameState.backgroundMusic[audioNum].resume() :
    playOption === 'play' && !gameState.backgroundMusic[audioNum].isPlaying ? gameState.backgroundMusic[audioNum].play() :
    playOption === 'setTime' ? gameState.backgroundMusic[audioNum].setTime(time) :
    playOption === 'restart' ? (gameState.backgroundMusic[audioNum].stop(), gameState.backgroundMusic[audioNum].play()) :

    null;
}

const game = new Phaser.Game(config)

// If the game uses a 2D canvas context, explicitly disable image smoothing
// to ensure nearest-neighbor scaling for pixel-art rendering.
const canvasEl = document.querySelector('canvas');
if (canvasEl) {
    const ctx = canvasEl.getContext && canvasEl.getContext('2d');
    if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
    }
}

// Integer scaling: fit the canvas using whole-number scale factors only.
const BASE_WIDTH = config.width || 720;
const BASE_HEIGHT = config.height || 720;

function adjustCanvasIntegerScale() {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    // Compute the largest integer scale that fits in the window
    const scale = Math.max(1, Math.floor(Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT)));

    // Keep the canvas backing store at the base resolution
    canvas.width = BASE_WIDTH;
    canvas.height = BASE_HEIGHT;

    // Apply integer CSS scaling so pixels remain sharp
    canvas.style.width = (BASE_WIDTH * scale) + 'px';
    canvas.style.height = (BASE_HEIGHT * scale) + 'px';

    // Ensure pixelated rendering (redundant with CSS but safe)
    canvas.style.imageRendering = 'pixelated';

    // Disable smoothing again in case the context was recreated by Phaser
    const ctx = canvas.getContext && canvas.getContext('2d');
    if (ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
    }
}

window.addEventListener('resize', adjustCanvasIntegerScale);

// Run once after a short delay to let Phaser create the canvas
setTimeout(adjustCanvasIntegerScale, 50);