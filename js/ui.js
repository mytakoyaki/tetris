class UIManager {
    constructor() {
        this.elements = {
            gameField: document.getElementById('gameField'),
            scoreDisplay: document.getElementById('scoreDisplay'),
            pointsDisplay: document.getElementById('pointsDisplay'),
            nextDisplay: document.getElementById('nextDisplay'),
            holdDisplay: document.getElementById('holdDisplay'),
            feverGauge: document.getElementById('feverGauge'),
            feverCounter: document.getElementById('feverCounter'),
            finalScore: document.getElementById('finalScore')
        };
        
        this.fieldCells = [];
        this.initializeGameField();
    }

    initializeGameField() {
        if (!this.elements.gameField) return;

        this.elements.gameField.innerHTML = '';
        this.fieldCells = [];

        for (let y = 0; y < FIELD_HEIGHT; y++) {
            const row = [];
            for (let x = 0; x < FIELD_WIDTH; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                this.elements.gameField.appendChild(cell);
                row.push(cell);
            }
            this.fieldCells.push(row);
        }
    }

    updateGameField(field) {
        if (!this.fieldCells.length) return;

        for (let y = 0; y < FIELD_HEIGHT; y++) {
            for (let x = 0; x < FIELD_WIDTH; x++) {
                const cell = this.fieldCells[y][x];
                const fieldCell = field[y][x];

                cell.className = 'cell';

                if (fieldCell) {
                    cell.classList.add('filled');
                    if (fieldCell.className) {
                        cell.classList.add(fieldCell.className);
                    }
                    if (fieldCell.isActive) {
                        cell.classList.add('active');
                    }
                }
            }
        }
    }

    updateScore(score) {
        if (this.elements.scoreDisplay) {
            this.elements.scoreDisplay.textContent = score.toLocaleString();
        }
    }

    updatePoints(points) {
        if (this.elements.pointsDisplay) {
            this.elements.pointsDisplay.textContent = points.toLocaleString();
        }
    }

    updateNextDisplay(tetromino) {
        if (!this.elements.nextDisplay || !tetromino) return;

        this.elements.nextDisplay.innerHTML = '';

        const preview = this.createTetrominoPreview(tetromino);
        this.elements.nextDisplay.appendChild(preview);
    }

    updateHoldDisplay(tetromino) {
        if (!this.elements.holdDisplay) return;

        this.elements.holdDisplay.innerHTML = '';

        if (tetromino) {
            const preview = this.createTetrominoPreview(tetromino);
            this.elements.holdDisplay.appendChild(preview);
        }
    }

    createTetrominoPreview(tetromino) {
        const container = document.createElement('div');
        container.className = 'tetromino-preview';
        container.style.position = 'relative';
        container.style.width = '80px';
        container.style.height = '80px';

        const rotation = tetromino.getCurrentRotation();
        const blockSize = 18;

        let minX = 4, minY = 4, maxX = -1, maxY = -1;
        
        for (let y = 0; y < rotation.length; y++) {
            for (let x = 0; x < rotation[y].length; x++) {
                if (rotation[y][x]) {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        const width = maxX - minX + 1;
        const height = maxY - minY + 1;
        const offsetX = (80 - width * blockSize) / 2;
        const offsetY = (80 - height * blockSize) / 2;

        for (let y = 0; y < rotation.length; y++) {
            for (let x = 0; x < rotation[y].length; x++) {
                if (rotation[y][x]) {
                    const block = document.createElement('div');
                    block.className = `preview-block ${tetromino.shape.className}`;
                    block.style.position = 'absolute';
                    block.style.left = (offsetX + (x - minX) * blockSize) + 'px';
                    block.style.top = (offsetY + (y - minY) * blockSize) + 'px';
                    block.style.width = (blockSize - 1) + 'px';
                    block.style.height = (blockSize - 1) + 'px';
                    block.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                    container.appendChild(block);
                }
            }
        }

        return container;
    }

    updateFeverGauge(progress) {
        if (this.elements.feverGauge) {
            const percentage = Math.min(progress.percentage, 100);
            this.elements.feverGauge.style.setProperty('--fever-progress', percentage + '%');
        }

        if (this.elements.feverCounter) {
            this.elements.feverCounter.textContent = `${progress.current}/${progress.needed}`;
        }
    }

    showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.add('hidden');
        });

        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
        }
    }

    updateFinalScore(score) {
        if (this.elements.finalScore) {
            this.elements.finalScore.textContent = score.toLocaleString();
        }
    }

    showScoreAnimation(amount, position, isBonus = false) {
        const popup = document.createElement('div');
        popup.className = 'floating-score';
        
        let text = `+${amount.toLocaleString()}`;
        if (isBonus) {
            text += ' (FEVER!)';
            popup.classList.add('fever-bonus');
        }
        
        popup.textContent = text;
        popup.style.position = 'absolute';
        popup.style.left = position.x + 'px';
        popup.style.top = position.y + 'px';
        popup.style.color = isBonus ? '#ffd700' : '#00ff88';
        popup.style.fontSize = isBonus ? '1.5em' : '1.2em';
        popup.style.fontWeight = 'bold';
        popup.style.textShadow = '2px 2px 4px #000';
        popup.style.pointerEvents = 'none';
        popup.style.zIndex = '1000';
        
        document.body.appendChild(popup);
        
        popup.style.animation = 'scoreFloat 2s ease-out forwards';
        
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 2000);
        
        if (!document.getElementById('scoreAnimationStyles')) {
            const style = document.createElement('style');
            style.id = 'scoreAnimationStyles';
            style.textContent = `
                @keyframes scoreFloat {
                    0% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    showMessage(text, duration = 2000, className = '') {
        const message = document.createElement('div');
        message.className = `game-message ${className}`;
        message.textContent = text;
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'rgba(0, 0, 0, 0.8)';
        message.style.color = 'white';
        message.style.padding = '20px 40px';
        message.style.borderRadius = '10px';
        message.style.fontSize = '1.5em';
        message.style.fontWeight = 'bold';
        message.style.zIndex = '9999';
        message.style.border = '2px solid #ffd700';
        message.style.textAlign = 'center';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, duration);
    }

    highlightExchangeHint(canAfford) {
        const hint = document.querySelector('.exchange-hint');
        if (hint) {
            hint.style.color = canAfford ? '#00ff88' : '#ff6b6b';
            hint.style.fontWeight = canAfford ? 'bold' : 'normal';
        }
    }

    showLineClearAnimation(clearedLines) {
        if (!clearedLines.length) return;

        clearedLines.forEach(lineY => {
            if (this.fieldCells[lineY]) {
                this.fieldCells[lineY].forEach(cell => {
                    cell.style.animation = 'lineClear 0.5s ease-in-out';
                    cell.style.background = '#ffd700';
                });
            }
        });

        setTimeout(() => {
            this.initializeGameField();
        }, 500);

        if (!document.getElementById('lineClearStyles')) {
            const style = document.createElement('style');
            style.id = 'lineClearStyles';
            style.textContent = `
                @keyframes lineClear {
                    0% { transform: scaleX(1); opacity: 1; }
                    50% { transform: scaleX(1.1); opacity: 0.8; }
                    100% { transform: scaleX(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateExchangeButtonState(canAfford, isFever) {
        const hint = document.querySelector('.exchange-hint span');
        if (hint) {
            if (isFever) {
                hint.textContent = 'E: 交換 (FREE!)';
                hint.style.color = '#ffd700';
                hint.style.fontWeight = 'bold';
            } else if (canAfford) {
                hint.textContent = 'E: 交換 (-30P)';
                hint.style.color = '#00ff88';
                hint.style.fontWeight = 'normal';
            } else {
                hint.textContent = 'E: 交換 (-30P)';
                hint.style.color = '#ff6b6b';
                hint.style.fontWeight = 'normal';
            }
        }
    }

    addScreenShake(intensity = 5, duration = 300) {
        const gameContainer = document.querySelector('.game-container');
        if (!gameContainer) return;

        const originalTransform = gameContainer.style.transform;
        
        let startTime = Date.now();
        const shake = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const currentIntensity = intensity * (1 - progress);
                const x = (Math.random() - 0.5) * currentIntensity;
                const y = (Math.random() - 0.5) * currentIntensity;
                gameContainer.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(shake);
            } else {
                gameContainer.style.transform = originalTransform;
            }
        };
        
        shake();
    }

    reset() {
        this.updateScore(0);
        this.updatePoints(0);
        this.updateFeverGauge({ current: 0, needed: 30, percentage: 0 });
        this.updateNextDisplay(null);
        this.updateHoldDisplay(null);
        this.initializeGameField();
    }
}