const POINT_VALUES = {
    TETROMINO_PLACED: 10,
    EXCHANGE_COST: 30,
    LINE_CLEAR: {
        1: 100,
        2: 300,
        3: 500,
        4: 800
    }
};

const FEVER_CONFIG = {
    BLOCKS_NEEDED: 30,
    DURATION: 20000,
    SCORE_MULTIPLIER: 2
};

class PointSystem {
    constructor() {
        this.points = 0;
        this.score = 0;
        this.blocksPlaced = 0;
        this.totalBlocksPlaced = 0;
        this.scoreMultiplier = 1;
        this.callbacks = {
            onPointsChange: null,
            onScoreChange: null,
            onBlocksPlacedChange: null
        };
    }

    addPoints(amount) {
        this.points += amount;
        if (this.callbacks.onPointsChange) {
            this.callbacks.onPointsChange(this.points);
        }
    }

    spendPoints(amount) {
        if (this.points >= amount) {
            this.points -= amount;
            if (this.callbacks.onPointsChange) {
                this.callbacks.onPointsChange(this.points);
            }
            return true;
        }
        return false;
    }

    canAfford(amount) {
        return this.points >= amount;
    }

    addScore(amount, showPopup = false, position = null) {
        const finalAmount = Math.floor(amount * this.scoreMultiplier);
        this.score += finalAmount;
        
        if (this.callbacks.onScoreChange) {
            this.callbacks.onScoreChange(this.score, finalAmount, this.scoreMultiplier > 1);
        }

        if (showPopup && position) {
            this.showScorePopup(finalAmount, position, this.scoreMultiplier > 1);
        }
    }

    showScorePopup(amount, position, isBonus = false) {
        const popup = document.getElementById('scorePopup');
        if (!popup) return;

        let text = `+${amount}`;
        if (isBonus) {
            text += ` (x${this.scoreMultiplier} BONUS!)`;
        }

        popup.textContent = text;
        popup.style.left = position.x + 'px';
        popup.style.top = position.y + 'px';
        popup.classList.remove('hidden');

        setTimeout(() => {
            popup.classList.add('hidden');
        }, 1000);
    }

    onTetrominoPlaced() {
        this.blocksPlaced += 1;
        this.totalBlocksPlaced += 1;
        
        const pointsEarned = POINT_VALUES.TETROMINO_PLACED;
        this.addPoints(pointsEarned);

        if (this.callbacks.onBlocksPlacedChange) {
            this.callbacks.onBlocksPlacedChange(this.blocksPlaced, this.totalBlocksPlaced);
        }

        return pointsEarned;
    }

    onLinesCleared(lineCount) {
        if (lineCount === 0) return 0;

        const baseScore = POINT_VALUES.LINE_CLEAR[lineCount] || 0;
        this.addScore(baseScore, true, this.getGameFieldCenter());

        return baseScore;
    }

    getGameFieldCenter() {
        const gameField = document.getElementById('gameField');
        if (gameField) {
            const rect = gameField.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }
        return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }

    canExchangeNext() {
        return this.canAfford(POINT_VALUES.EXCHANGE_COST);
    }

    exchangeNext() {
        if (this.spendPoints(POINT_VALUES.EXCHANGE_COST)) {
            return true;
        }
        return false;
    }

    getFreeExchangesRemaining() {
        return this.freeExchanges;
    }

    setScoreMultiplier(multiplier) {
        this.scoreMultiplier = multiplier;
    }

    getScoreMultiplier() {
        return this.scoreMultiplier;
    }

    getFeverProgress() {
        return {
            current: this.blocksPlaced,
            needed: FEVER_CONFIG.BLOCKS_NEEDED,
            percentage: (this.blocksPlaced / FEVER_CONFIG.BLOCKS_NEEDED) * 100
        };
    }

    shouldTriggerFever() {
        return this.blocksPlaced >= FEVER_CONFIG.BLOCKS_NEEDED;
    }

    resetFeverProgress() {
        this.blocksPlaced = 0;
        if (this.callbacks.onBlocksPlacedChange) {
            this.callbacks.onBlocksPlacedChange(this.blocksPlaced, this.totalBlocksPlaced);
        }
    }

    getStats() {
        return {
            points: this.points,
            score: this.score,
            blocksPlaced: this.blocksPlaced,
            totalBlocksPlaced: this.totalBlocksPlaced,
            scoreMultiplier: this.scoreMultiplier,
            feverProgress: this.getFeverProgress()
        };
    }

    setCallback(event, callback) {
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event] = callback;
        }
    }

    reset() {
        this.points = 0;
        this.score = 0;
        this.blocksPlaced = 0;
        this.totalBlocksPlaced = 0;
        this.scoreMultiplier = 1;
        
        if (this.callbacks.onPointsChange) {
            this.callbacks.onPointsChange(this.points);
        }
        if (this.callbacks.onScoreChange) {
            this.callbacks.onScoreChange(this.score, 0, false);
        }
        if (this.callbacks.onBlocksPlacedChange) {
            this.callbacks.onBlocksPlacedChange(this.blocksPlaced, this.totalBlocksPlaced);
        }
    }

    calculateLineScore(lineCount) {
        return POINT_VALUES.LINE_CLEAR[lineCount] || 0;
    }

    formatScore(score) {
        return score.toLocaleString();
    }

    formatPoints(points) {
        return points.toLocaleString();
    }
}