class HealthBar {
    constructor(scene, x, y, dispNumb, health, maxHealth, healthColor = 0xFEFF03, backColor = 0x651828, name = "HealthBar") {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x; this.y = y;
        this.value = health;
        this.maxHealth = maxHealth;
        this.scale = 76 / maxHealth;
        this.name = name;
        this.healthColor = healthColor;
        this.backColor = backColor;
        this.displayNumber = dispNumb;
        this.barText = this.draw();
        scene.add.existing(this.bar);
    }

    hurt(amount) {
        this.value -= amount;
        if (this.value < 0) { this.value = 0; }
        this.bar.clear();
        this.draw();
        return (this.value);
    }

    heal(amount) {
        this.value += amount;
        if (this.value > this.maxHealth) { this.value = this.maxHealth; }
        this.bar.clear();
        this.draw();
        return (this.value);
    }

    kill() {
        this.bar.destroy();
    }

    reset() {
        this.bar.clear();
        this.draw();
        console.log(`${this.name} has been reset!`);
    }

    set(amount) {
        this.value = amount;
        this.draw();
        return (this.value);
    }

    draw() {
        this.bar.clear();
        const healthWidth = this.value * this.scale;
        this.bar.fillStyle(this.backColor);
        this.bar.fillRect(this.x, this.y, 80, 16);
        this.bar.fillStyle(this.healthColor);
        this.bar.fillRect(this.x, this.y, healthWidth, 16);

        if (this.displayNumber) {
            const healthText = `${this.value} / ${this.maxHealth}`;
            if (typeof this.barText !== 'undefined') {
                this.barText.setText(healthText);
            } else {
                const style = { font: '8bitoperator', size: '24px', fill: '#ffffff' };
                this.barText = this.bar.scene.add.text(this.x + 80, this.y + 2, healthText, style);
                
            }
            return this.barText;
        }
    }

    properties() {
        return this
    }
}
