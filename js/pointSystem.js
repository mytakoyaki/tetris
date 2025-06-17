const POINT_VALUES = {
    TETROMINO_PLACED: 10,
    EXCHANGE_BASE_COST: 30,
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

const EXCHANGE_COST_SYSTEM = {
    BASE_COST: 30,
    COSTS: [30, 45, 65, 90, 120], // 1回目〜5回目以降のコスト
    MAX_COST: 120
};

const FEVER_CONFIG = {
    BLOCKS_NEEDED: 20,
    DURATION: 30000,
    SCORE_MULTIPLIER: 4
};

const COMBO_CONFIG = {
    MIN_COMBO: 2,
    MAX_COMBO_MULTIPLIER: 3.0,
    COMBO_DECAY_TIME: 3000,
    BASE_MULTIPLIER: 0.1
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
        this.comboTimer = 0;
        this.comboActive = false;
        this.exchangeCount = 0; // 連続交換回数
        this.callbacks = {
            onPointsChange: null,
            onScoreChange: null,
            onBlocksPlacedChange: null,
            onLevelChange: null,
            onStatsChange: null,
            onComboBreak: null
        };
    }

    addPoints(amount) {
        // フィーバーモード中はポイント加算なし（無制限交換が特典のため）
        if (this.scoreMultiplier > 1) {
            return; // フィーバーモード中は加算しない
        }
        
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
        // CLAUDE.mdの詳細なレベル別スコア倍率テーブル
        const scoreMultipliers = {
            1: 1.0,   2: 1.05,  3: 1.1,   4: 1.15,  5: 1.2,
            6: 1.25,  7: 1.3,   8: 1.35,  9: 1.4,   10: 1.5,
            11: 1.6,  12: 1.7,  13: 1.8,  14: 1.9,  15: 2.0,
            16: 2.1,  17: 2.2,  18: 2.3,  19: 2.4,  20: 2.5,
            21: 2.6,  22: 2.7,  23: 2.8,  24: 2.9,  25: 3.0,
            26: 3.1,  27: 3.2,  28: 3.3,  29: 3.4,  30: 3.5
        };
        
        return scoreMultipliers[this.level] || 3.5;
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
        
        // ブロック設置時に交換コストリセット
        this.exchangeCount = 0;
        
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
        
        // Show point bonus if there were any bonuses (表示のみ、フィーバー中でも表示)
        if (bonusDetails.length > 0) {
            const displayText = this.scoreMultiplier > 1 ? 
                `FEVER中 (ポイント停止)` : 
                `+${pointsEarned}P`;
            this.showPointBonus(displayText, bonusDetails);
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
        
        // レベルアップはtime-basedなので、ここでは処理しない
        // script.jsのupdateメソッドでタイマーベースで管理
        
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
            const displayText = this.scoreMultiplier > 1 ? 
                `FEVER中 (ポイント停止)` : 
                `+${pointsGained}P`;
            this.showPointBonus(displayText, [{ type: 'Technical Bonus', amount: pointsGained }]);
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

    getCurrentExchangeCost() {
        const costIndex = Math.min(this.exchangeCount, EXCHANGE_COST_SYSTEM.COSTS.length - 1);
        return EXCHANGE_COST_SYSTEM.COSTS[costIndex];
    }

    canExchangeNext() {
        return this.canAfford(this.getCurrentExchangeCost());
    }

    exchangeNext() {
        const cost = this.getCurrentExchangeCost();
        if (this.spendPoints(cost)) {
            this.exchangeCount++;
            
            // コスト表示（累積表示用）
            this.showExchangeCostDisplay(cost);
            
            return true;
        }
        return false;
    }

    showExchangeCostDisplay(cost) {
        const display = document.getElementById('pointBonus');
        if (!display) return;
        
        const nextCost = this.getCurrentExchangeCost();
        let text = `-${cost}P`;
        if (this.exchangeCount > 0) {
            text += ` (次回: ${nextCost}P)`;
        }
        
        display.textContent = text;
        display.classList.remove('hidden');
        display.style.left = '25%';
        display.style.top = '30%';
        display.style.transform = 'translate(-50%, -50%)';
        display.style.color = '#ff6b6b'; // 赤色でコスト表示
        
        setTimeout(() => {
            display.classList.add('hidden');
        }, 2000);
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
    
    getLevelProgress(gameStartTime) {
        if (!gameStartTime) return { current: 0, needed: 30, percentage: 0 };
        
        const elapsedTime = Date.now() - gameStartTime;
        const timeToNextLevel = 30000; // 30秒
        const currentLevelTime = elapsedTime % timeToNextLevel;
        const percentage = (currentLevelTime / timeToNextLevel) * 100;
        
        return {
            current: Math.floor(currentLevelTime / 1000),
            needed: 30,
            percentage
        };
    }
    
    getDropSpeed() {
        // CLAUDE.mdの詳細な落下速度テーブル（秒/行 → ミリ秒変換）
        const fallSpeeds = {
            1: 1000,  2: 900,   3: 800,   4: 700,   5: 600,
            6: 550,   7: 500,   8: 450,   9: 400,   10: 400,
            11: 380,  12: 360,  13: 340,  14: 320,  15: 300,
            16: 280,  17: 260,  18: 250,  19: 240,  20: 250,
            21: 240,  22: 230,  23: 220,  24: 210,  25: 220,
            26: 210,  27: 205,  28: 200,  29: 200,  30: 200
        };
        
        return fallSpeeds[this.level] || 200;
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
    
    showPointBonus(displayText, bonusDetails) {
        const pointDisplay = document.getElementById('pointBonus');
        if (!pointDisplay) return;
        
        let bonusText = typeof displayText === 'string' ? displayText : `+${displayText}P`;
        if (bonusDetails.length > 0 && typeof displayText !== 'string') {
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

    // コンボタイマー更新
    updateComboTimer() {
        if (this.comboActive && this.comboTimer) {
            const elapsed = Date.now() - this.comboTimer;
            if (elapsed > COMBO_CONFIG.COMBO_DECAY_TIME) {
                this.breakCombo();
            }
        }
    }

    // コンボブレイク
    breakCombo() {
        if (this.comboCount >= COMBO_CONFIG.MIN_COMBO) {
            // UIにコンボブレイクを通知
            if (this.callbacks.onComboBreak) {
                this.callbacks.onComboBreak(this.comboCount);
            }
        }
        this.comboCount = 0;
        this.comboActive = false;
        this.comboTimer = 0;
    }

    // スコアマネージャーを設定
    setScoreManager(scoreManager) {
        this.scoreManager = scoreManager;
    }

    // スコア更新時に段位チェック
    checkDanPromotion() {
        if (this.scoreManager) {
            return this.scoreManager.checkDanPromotion(this.score, this);
        }
        return { promoted: false };
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
        this.comboTimer = 0;
        this.comboActive = false;
        this.exchangeCount = 0;
        
        // スコアマネージャーの段位チェックもリセット
        if (this.scoreManager) {
            this.scoreManager.lastDanRank = null;
        }
        
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