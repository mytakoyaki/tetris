const POINT_VALUES = {
    TETROMINO_PLACED: 10,
    EXCHANGE_COST: 30,
    SOFT_DROP_BONUS: 0.5,
    HARD_DROP_BONUS: 1,
    TECHNICAL_BONUS: 50,
    LINE_CLEAR: {
        1: 100,
        2: 300,
        3: 500,
        4: 800
    }
};

const FEVER_CONFIG = {
    BLOCKS_NEEDED: 25,
    DURATION: 25000,
    SCORE_MULTIPLIER: 3
};

class PointSystem {
    constructor() {
        this.points = 0;
        this.score = 0;
        this.blocksPlaced = 0;
        this.totalBlocksPlaced = 0;
        this.scoreMultiplier = 1;
        this.level = 1;
        this.linesCleared = 0;
        this.totalLines = 0;
        this.tetrisCount = 0;
        this.tspinCount = 0;
        this.comboCount = 0;
        this.backToBackCount = 0;
        this.isBackToBackActive = false;
        this.lastClearWasSpecial = false;
        this.callbacks = {
            onPointsChange: null,
            onScoreChange: null,
            onBlocksPlacedChange: null,
            onLevelChange: null,
            onStatsChange: null
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
        // レベルボーナス適用
        const levelMultiplier = this.getLevelMultiplier();
        const finalAmount = Math.floor(amount * this.scoreMultiplier * levelMultiplier);
        this.score += finalAmount;
        
        if (this.callbacks.onScoreChange) {
            this.callbacks.onScoreChange(this.score, finalAmount, this.scoreMultiplier > 1 || levelMultiplier > 1);
        }

        if (showPopup && position) {
            this.showScorePopup(finalAmount, position, this.scoreMultiplier > 1 || levelMultiplier > 1);
        }
    }

    getLevelMultiplier() {
        if (this.level >= 25) return 3.0;
        if (this.level >= 20) return 2.5;
        if (this.level >= 15) return 2.0;
        if (this.level >= 10) return 1.5;
        if (this.level >= 5) return 1.2;
        return 1.0;
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

    onTetrominoPlaced(softDropDistance = 0, hardDropDistance = 0, isHardDrop = false) {
        this.blocksPlaced += 1;
        this.totalBlocksPlaced += 1;
        
        let pointsEarned = POINT_VALUES.TETROMINO_PLACED;
        let bonusDetails = [];
        
        // Soft drop bonus (only for manual soft drops)
        if (softDropDistance > 0) {
            const softDropBonus = Math.floor(softDropDistance * POINT_VALUES.SOFT_DROP_BONUS);
            if (softDropBonus > 0) {
                pointsEarned += softDropBonus;
                bonusDetails.push({
                    type: 'Soft Drop',
                    amount: softDropBonus,
                    description: `${softDropDistance} lines`
                });
            }
        }
        
        // Hard drop bonus
        if (hardDropDistance > 0 && isHardDrop) {
            const hardDropBonus = hardDropDistance * POINT_VALUES.HARD_DROP_BONUS;
            pointsEarned += hardDropBonus;
            bonusDetails.push({
                type: 'Hard Drop',
                amount: hardDropBonus,
                description: `${hardDropDistance} lines`
            });
        }
        
        this.addPoints(pointsEarned);
        
        // Show point bonus if there were any bonuses
        if (bonusDetails.length > 0) {
            this.showPointBonus(pointsEarned, bonusDetails);
        }

        if (this.callbacks.onBlocksPlacedChange) {
            this.callbacks.onBlocksPlacedChange(this.blocksPlaced, this.totalBlocksPlaced);
        }

        return pointsEarned;
    }

    onLinesCleared(lineCount, clearType = 'normal', isTSpin = false, isAllClear = false) {
        // Reset combo if no lines cleared
        if (lineCount === 0) {
            this.comboCount = 0;
            this.lastClearWasSpecial = false;
            return 0;
        }
        
        let baseScore = POINT_VALUES.LINE_CLEAR[lineCount] || 0;
        let bonusMultiplier = 1;
        let bonusDetails = [];
        let pointsGained = 0;
        
        // T-Spin ボーナス
        if (isTSpin) {
            let tspinBonus = 0;
            if (lineCount === 1) tspinBonus = 2000;      // T-Spin Single
            else if (lineCount === 2) tspinBonus = 6000; // T-Spin Double
            else if (lineCount === 3) tspinBonus = 12000; // T-Spin Triple
            
            baseScore += tspinBonus;
            this.tspinCount++;
            bonusDetails.push({ type: 'T-Spin', amount: tspinBonus });
        }
        
        // パーフェクトクリア
        if (isAllClear) {
            const perfectClearBonus = 25000;
            baseScore += perfectClearBonus;
            bonusDetails.push({ type: 'Perfect Clear', amount: perfectClearBonus });
        }
        
        // Back-to-Back判定
        const isSpecialClear = lineCount === 4 || isTSpin;
        if (isSpecialClear && this.lastClearWasSpecial) {
            bonusMultiplier = 2.0;
            this.backToBackCount++;
            this.isBackToBackActive = true;
            bonusDetails.push({ type: 'Back-to-Back', multiplier: bonusMultiplier });
        } else {
            this.isBackToBackActive = false;
            this.backToBackCount = 0;
        }
        
        this.lastClearWasSpecial = isSpecialClear;
        
        // Update line statistics
        this.linesCleared += lineCount;
        this.totalLines += lineCount;
        
        // Check for level up
        const newLevel = Math.floor(this.totalLines / 10) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            if (this.callbacks.onLevelChange) {
                this.callbacks.onLevelChange(this.level);
            }
        }
        
        // Tetris count
        if (lineCount === 4) {
            this.tetrisCount++;
        }
        
        // T-Spin handling
        if (isTSpin) {
            this.tspinCount++;
            baseScore *= 2;
            bonusDetails.push({ type: 'T-Spin', multiplier: 2 });
            pointsGained += POINT_VALUES.TECHNICAL_BONUS;
            this.lastClearWasSpecial = true;
        } else if (lineCount === 4) {
            this.lastClearWasSpecial = true;
        } else {
            this.lastClearWasSpecial = false;
        }
        
        // Back-to-Back bonus
        if (this.lastClearWasSpecial && this.isBackToBackActive) {
            this.backToBackCount++;
            bonusMultiplier *= 1.5;
            bonusDetails.push({ type: 'Back-to-Back', multiplier: 1.5 });
        }
        
        this.isBackToBackActive = this.lastClearWasSpecial;
        
        // Combo bonus
        this.comboCount++;
        if (this.comboCount > 1) {
            const comboBonus = Math.min(this.comboCount * 0.1, 1.0);
            bonusMultiplier *= (1 + comboBonus);
            bonusDetails.push({ type: 'Combo', count: this.comboCount, multiplier: 1 + comboBonus });
        }
        
        // All Clear bonus
        if (isAllClear) {
            bonusMultiplier *= 3;
            bonusDetails.push({ type: 'Perfect Clear', multiplier: 3 });
            pointsGained += POINT_VALUES.TECHNICAL_BONUS * 2;
        }
        
        // Calculate final score
        const finalScore = Math.floor(baseScore * bonusMultiplier * this.scoreMultiplier);
        this.addScore(finalScore, true, this.getGameFieldCenter());
        
        // Add technical bonus points
        if (pointsGained > 0) {
            this.addPoints(pointsGained);
            this.showPointBonus(pointsGained, [{ type: 'Technical Bonus', amount: pointsGained }]);
        }
        
        // Show technical bonus display
        if (bonusDetails.length > 0) {
            this.showTechnicalBonus(bonusDetails, finalScore);
        }
        
        // Update stats callback
        if (this.callbacks.onStatsChange) {
            this.callbacks.onStatsChange({
                totalLines: this.totalLines,
                tetrisCount: this.tetrisCount,
                tspinCount: this.tspinCount,
                comboCount: this.comboCount,
                backToBackActive: this.isBackToBackActive
            });
        }
        
        return finalScore;
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
    
    getLevelProgress() {
        const currentLevelLines = this.totalLines % 10;
        const percentage = (currentLevelLines / 10) * 100;
        
        return {
            current: currentLevelLines,
            needed: 10,
            percentage
        };
    }
    
    getDropSpeed() {
        const baseSpeed = 1000;
        const speedReduction = Math.min(this.level - 1, 15) * 50;
        return Math.max(baseSpeed - speedReduction, 100);
    }
    
    showTechnicalBonus(bonusDetails, finalScore) {
        const bonusDisplay = document.getElementById('technicalBonus');
        if (!bonusDisplay) return;
        
        let bonusText = '';
        bonusDetails.forEach((bonus, index) => {
            if (index > 0) bonusText += ' + ';
            
            switch (bonus.type) {
                case 'T-Spin':
                    bonusText += 'T-SPIN!';
                    break;
                case 'Back-to-Back':
                    bonusText += 'BACK-TO-BACK!';
                    break;
                case 'Combo':
                    bonusText += `COMBO x${bonus.count}`;
                    break;
                case 'Perfect Clear':
                    bonusText += 'PERFECT CLEAR!';
                    break;
            }
        });
        
        bonusText += ` (+${finalScore.toLocaleString()})`;
        
        bonusDisplay.textContent = bonusText;
        bonusDisplay.classList.remove('hidden');
        bonusDisplay.style.left = '50%';
        bonusDisplay.style.top = '40%';
        bonusDisplay.style.transform = 'translate(-50%, -50%)';
        
        setTimeout(() => {
            bonusDisplay.classList.add('hidden');
        }, 2500);
    }
    
    showPointBonus(points, bonusDetails) {
        const pointDisplay = document.getElementById('pointBonus');
        if (!pointDisplay) return;
        
        let bonusText = `+${points}P`;
        if (bonusDetails.length > 0) {
            bonusText += ` (${bonusDetails[0].description || bonusDetails[0].type})`;
        }
        
        pointDisplay.textContent = bonusText;
        pointDisplay.classList.remove('hidden');
        pointDisplay.style.left = '75%';
        pointDisplay.style.top = '30%';
        pointDisplay.style.transform = 'translate(-50%, -50%)';
        
        setTimeout(() => {
            pointDisplay.classList.add('hidden');
        }, 1800);
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
        this.level = 1;
        this.linesCleared = 0;
        this.totalLines = 0;
        this.tetrisCount = 0;
        this.tspinCount = 0;
        this.comboCount = 0;
        this.backToBackCount = 0;
        this.isBackToBackActive = false;
        this.lastClearWasSpecial = false;
        
        if (this.callbacks.onPointsChange) {
            this.callbacks.onPointsChange(this.points);
        }
        if (this.callbacks.onScoreChange) {
            this.callbacks.onScoreChange(this.score, 0, false);
        }
        if (this.callbacks.onBlocksPlacedChange) {
            this.callbacks.onBlocksPlacedChange(this.blocksPlaced, this.totalBlocksPlaced);
        }
        if (this.callbacks.onLevelChange) {
            this.callbacks.onLevelChange(this.level);
        }
        if (this.callbacks.onStatsChange) {
            this.callbacks.onStatsChange({
                totalLines: this.totalLines,
                tetrisCount: this.tetrisCount,
                tspinCount: this.tspinCount,
                comboCount: this.comboCount,
                backToBackActive: this.isBackToBackActive
            });
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