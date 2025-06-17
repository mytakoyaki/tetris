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
            finalScore: document.getElementById('finalScore'),
            levelDisplay: document.getElementById('levelDisplay'),
            levelProgress: document.getElementById('levelProgress'),
            linesDisplay: document.getElementById('linesDisplay'),
            comboDisplay: document.getElementById('comboDisplay'),
            backToBackDisplay: document.getElementById('backToBackDisplay'),
            totalLinesDisplay: document.getElementById('totalLinesDisplay'),
            tetrisCountDisplay: document.getElementById('tetrisCountDisplay'),
            tspinCountDisplay: document.getElementById('tspinCountDisplay'),
            lastPointGain: document.getElementById('lastPointGain')
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
        container.style.width = '100px';
        container.style.height = '100px';

        const rotation = tetromino.getCurrentRotation();
        const blockSize = 20;

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
        const offsetX = (100 - width * blockSize) / 2;
        const offsetY = (100 - height * blockSize) / 2;

        for (let y = 0; y < rotation.length; y++) {
            for (let x = 0; x < rotation[y].length; x++) {
                if (rotation[y][x]) {
                    const block = document.createElement('div');
                    block.className = `preview-block ${tetromino.shape.className}`;
                    block.style.cssText = `
                        position: absolute;
                        left: ${offsetX + (x - minX) * blockSize}px;
                        top: ${offsetY + (y - minY) * blockSize}px;
                        width: ${blockSize - 2}px;
                        height: ${blockSize - 2}px;
                        border: 1px solid rgba(255, 255, 255, 0.4);
                        border-radius: 3px;
                        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.3);
                    `;
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
    
    updateLevel(level) {
        if (this.elements.levelDisplay) {
            this.elements.levelDisplay.textContent = level;
        }
    }
    
    updateLevelProgress(progress) {
        if (this.elements.levelProgress) {
            const percentage = Math.min(progress.percentage, 100);
            this.elements.levelProgress.style.setProperty('--level-progress', percentage + '%');
        }
        
        if (this.elements.linesDisplay) {
            this.elements.linesDisplay.textContent = `${progress.current}/10`;
        }
    }
    
    updateStats(stats) {
        if (this.elements.totalLinesDisplay) {
            this.elements.totalLinesDisplay.textContent = stats.totalLines;
        }
        
        if (this.elements.tetrisCountDisplay) {
            this.elements.tetrisCountDisplay.textContent = stats.tetrisCount;
        }
        
        if (this.elements.tspinCountDisplay) {
            this.elements.tspinCountDisplay.textContent = stats.tspinCount;
        }
        
        // Update combo display
        if (this.elements.comboDisplay) {
            if (stats.comboCount > 1) {
                this.elements.comboDisplay.textContent = `COMBO x${stats.comboCount}`;
                this.elements.comboDisplay.classList.remove('hidden');
            } else {
                this.elements.comboDisplay.classList.add('hidden');
            }
        }
        
        // Update back-to-back display
        if (this.elements.backToBackDisplay) {
            if (stats.backToBackActive) {
                this.elements.backToBackDisplay.classList.remove('hidden');
            } else {
                this.elements.backToBackDisplay.classList.add('hidden');
            }
        }
    }
    
    showLastPointGain(points, description = '') {
        if (this.elements.lastPointGain) {
            this.elements.lastPointGain.textContent = `+${points}P ${description}`;
            this.elements.lastPointGain.classList.remove('show');
            this.elements.lastPointGain.classList.add('show');
            
            setTimeout(() => {
                if (this.elements.lastPointGain) {
                    this.elements.lastPointGain.classList.remove('show');
                }
            }, 2000);
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
        popup.style.cssText = `
            position: absolute;
            left: ${position.x}px;
            top: ${position.y}px;
            font-size: ${isBonus ? '1.8em' : '1.4em'};
            font-weight: 700;
            font-family: 'Consolas', 'Monaco', monospace;
            pointer-events: none;
            z-index: 1000;
            letter-spacing: 1px;
            text-shadow: 0 0 10px ${isBonus ? 'rgba(255, 215, 0, 0.8)' : 'rgba(0, 255, 136, 0.8)'};
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            padding: 8px 16px;
            border-radius: 12px;
            border: 1px solid ${isBonus ? 'rgba(255, 215, 0, 0.5)' : 'rgba(0, 255, 136, 0.5)'};
            box-shadow: 0 4px 16px ${isBonus ? 'rgba(255, 215, 0, 0.3)' : 'rgba(0, 255, 136, 0.3)'};
        `;
        
        if (isBonus) {
            popup.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.2))';
            popup.style.color = '#ffd700';
        } else {
            popup.style.color = 'var(--accent-green)';
        }
        
        document.body.appendChild(popup);
        
        popup.style.animation = `scoreFloat 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
        
        setTimeout(() => {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 2500);
        
        if (!document.getElementById('scoreAnimationStyles')) {
            const style = document.createElement('style');
            style.id = 'scoreAnimationStyles';
            style.textContent = `
                @keyframes scoreFloat {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(0.8);
                    }
                    20% {
                        transform: translateY(-10px) scale(1.2);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-80px) scale(1);
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
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            color: var(--text-primary);
            padding: 24px 48px;
            border-radius: 16px;
            font-size: 1.6em;
            font-weight: 700;
            z-index: 9999;
            border: 2px solid var(--glass-border);
            text-align: center;
            box-shadow: var(--shadow-deep);
            letter-spacing: 1px;
            animation: messageAppear 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        `;
        
        if (!document.getElementById('messageStyles')) {
            const style = document.createElement('style');
            style.id = 'messageStyles';
            style.textContent = `
                @keyframes messageAppear {
                    0% { 
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    100% { 
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                .error-message {
                    border-color: var(--accent-red) !important;
                    color: var(--accent-red) !important;
                    box-shadow: 0 0 20px rgba(255, 107, 107, 0.3) !important;
                }
                .exchange-message {
                    border-color: var(--accent-green) !important;
                    color: var(--accent-green) !important;
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3) !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'messageDisappear 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 300);
            }
        }, duration - 300);
        
        if (!document.getElementById('messageDisappearStyles')) {
            const style = document.createElement('style');
            style.id = 'messageDisappearStyles';
            style.textContent = `
                @keyframes messageDisappear {
                    0% { 
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                }
            `;
            document.head.appendChild(style);
        }
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
                    cell.style.animation = 'lineClear 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    cell.style.background = 'linear-gradient(90deg, #ffd700, #ff8c00)';
                    cell.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                    cell.style.borderColor = 'rgba(255, 215, 0, 0.8)';
                });
            }
        });

        setTimeout(() => {
            this.initializeGameField();
        }, 800);

        if (!document.getElementById('lineClearStyles')) {
            const style = document.createElement('style');
            style.id = 'lineClearStyles';
            style.textContent = `
                @keyframes lineClear {
                    0% { 
                        transform: scaleX(1) scaleY(1); 
                        opacity: 1;
                    }
                    25% { 
                        transform: scaleX(1.05) scaleY(1.1); 
                        opacity: 0.9;
                    }
                    75% { 
                        transform: scaleX(1.02) scaleY(0.8); 
                        opacity: 0.5;
                    }
                    100% { 
                        transform: scaleX(0) scaleY(0.1); 
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateExchangeButtonState(canAfford, isFever) {
        const hintKey = document.querySelector('.hint-key');
        const hintText = document.querySelector('.hint-text');
        
        if (hintKey && hintText) {
            if (isFever) {
                hintText.textContent = '交換 (FREE!)';
                hintKey.style.color = 'var(--gold-gradient)';
                hintText.style.color = '#ffd700';
                hintKey.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
            } else if (canAfford) {
                hintText.textContent = '交換 (-30P)';
                hintKey.style.color = 'var(--accent-green)';
                hintText.style.color = 'var(--text-secondary)';
                hintKey.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            } else {
                hintText.textContent = '交換 (-30P)';
                hintKey.style.color = 'var(--accent-red)';
                hintText.style.color = 'var(--accent-red)';
                hintKey.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            }
        }
    }

    addScreenShake(intensity = 8, duration = 400) {
        const gameContainer = document.querySelector('.game-container');
        if (!gameContainer) return;

        const originalTransform = gameContainer.style.transform;
        
        let startTime = Date.now();
        const shake = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const currentIntensity = intensity * (1 - progress) * Math.sin(progress * Math.PI * 10);
                const x = (Math.random() - 0.5) * currentIntensity;
                const y = (Math.random() - 0.5) * currentIntensity;
                const rotation = (Math.random() - 0.5) * currentIntensity * 0.5;
                gameContainer.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
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
        this.updateLevel(1);
        this.updateLevelProgress({ current: 0, needed: 10, percentage: 0 });
        this.updateStats({
            totalLines: 0,
            tetrisCount: 0,
            tspinCount: 0,
            comboCount: 0,
            backToBackActive: false
        });
        this.updateNextDisplay(null);
        this.updateHoldDisplay(null);
        this.initializeGameField();
    }
}