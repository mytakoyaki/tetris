class TetrisGame {
    constructor() {
        this.gameField = new GameField();
        this.pointSystem = new PointSystem();
        this.feverMode = new FeverMode();
        this.ui = new UIManager();
        this.scoreManager = new ScoreManager();
        
        this.gameState = 'start';
        this.isRunning = false;
        this.lastTime = 0;
        this.gameStartTime = 0;
        
        this.keys = {};
        this.keyRepeatTimers = {};
        this.keyRepeatDelay = 150;
        this.keyRepeatInterval = 50;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupCallbacks();
        this.ui.showScreen('startScreen');
    }

    setupEventListeners() {
        document.getElementById('startButton').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('playAgainButton').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('rankingButton').addEventListener('click', () => {
            this.showRanking();
        });

        document.getElementById('viewRankingButton').addEventListener('click', () => {
            this.showRanking();
        });

        document.getElementById('closeRankingButton').addEventListener('click', () => {
            this.hideRanking();
        });

        document.getElementById('clearScoresButton').addEventListener('click', () => {
            this.clearAllScores();
        });

        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isRunning) {
                this.pauseGame();
            }
        });
    }

    setupCallbacks() {
        this.pointSystem.setCallback('onPointsChange', (points) => {
            this.ui.updatePoints(points);
            this.ui.updateExchangeButtonState(
                this.pointSystem.canExchangeNext(), 
                this.feverMode.getIsActive()
            );
        });

        this.pointSystem.setCallback('onScoreChange', (score, amount, isBonus) => {
            this.ui.updateScore(score);
        });

        this.pointSystem.setCallback('onBlocksPlacedChange', (current, total) => {
            const progress = this.pointSystem.getFeverProgress();
            this.ui.updateFeverGauge(progress);
        });
        
        this.pointSystem.setCallback('onLevelChange', (level) => {
            this.ui.updateLevel(level);
            this.gameField.setDropSpeed(this.pointSystem.getDropSpeed());
        });
        
        this.pointSystem.setCallback('onStatsChange', (stats) => {
            this.ui.updateStats(stats);
            const levelProgress = this.pointSystem.getLevelProgress();
            this.ui.updateLevelProgress(levelProgress);
        });

        this.feverMode.setCallback('onStart', () => {
            this.pointSystem.setScoreMultiplier(FEVER_CONFIG.SCORE_MULTIPLIER);
            this.feverMode.showFeverStartMessage();
            this.feverMode.triggerFeverAnimation();
        });

        this.feverMode.setCallback('onEnd', () => {
            this.pointSystem.setScoreMultiplier(1);
            this.feverMode.removeFeverAnimation();
        });
    }

    startGame() {
        this.gameState = 'playing';
        this.isRunning = true;
        this.gameStartTime = Date.now();
        
        this.gameField.reset();
        this.pointSystem.reset();
        this.feverMode.reset();
        this.ui.reset();
        
        // Set initial drop speed
        this.gameField.setDropSpeed(this.pointSystem.getDropSpeed());
        
        this.gameField.spawnTetromino();
        this.updateUI();
        
        this.ui.showScreen('gameScreen');
        this.gameLoop();
    }

    pauseGame() {
        this.isRunning = false;
    }

    resumeGame() {
        if (this.gameState === 'playing') {
            this.isRunning = true;
            this.gameLoop();
        }
    }

    gameOver() {
        this.gameState = 'gameOver';
        this.isRunning = false;
        
        const playTime = Date.now() - this.gameStartTime;
        const gameData = {
            score: this.pointSystem.score,
            level: this.pointSystem.level,
            totalLines: this.pointSystem.totalLines,
            tetrisCount: this.pointSystem.tetrisCount,
            tspinCount: this.pointSystem.tspinCount,
            totalBlocksPlaced: this.pointSystem.totalBlocksPlaced,
            playTime: playTime
        };

        // 現在の段位取得
        const currentDan = this.scoreManager.getCurrentDan(this.pointSystem.score);
        
        // スコア保存
        const scoreRecord = this.scoreManager.saveScore(gameData);
        
        // 新記録判定
        const isNewRecord = this.scoreManager.isNewRecord(this.pointSystem.score);
        
        // 段位昇格判定（過去の最高スコアと比較）
        const previousBestScore = this.scoreManager.getHighScores(1)[1]?.score || 0;
        const previousDan = this.scoreManager.getDanRank(previousBestScore);
        const hasPromoted = currentDan.minScore > previousDan.minScore;
        
        this.ui.updateGameOverScreen({
            score: this.pointSystem.score,
            level: this.pointSystem.level,
            totalLines: this.pointSystem.totalLines,
            tetrisCount: this.pointSystem.tetrisCount,
            tspinCount: this.pointSystem.tspinCount,
            currentDan: currentDan,
            isNewRecord: isNewRecord,
            hasPromoted: hasPromoted,
            promotedDan: hasPromoted ? currentDan : null
        });
        
        this.ui.showScreen('gameOverScreen');
        this.feverMode.reset();
    }

    gameLoop(currentTime = 0) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        if (!this.gameField.currentTetromino) {
            if (!this.gameField.spawnTetromino()) {
                this.gameOver();
                return;
            }
        }

        const lockResult = this.gameField.update(deltaTime);
        
        if (lockResult) {
            // For auto-lock, ensure we get the soft drop distance
            this.handleTetrominoLocked(lockResult);
        }

    }

    render() {
        const fieldWithTetromino = this.gameField.getFieldWithCurrentTetromino();
        this.ui.updateGameField(fieldWithTetromino);
    }

    updateUI() {
        this.ui.updateNextDisplay(this.gameField.nextTetromino);
        this.ui.updateHoldDisplay(this.gameField.holdTetromino);
        this.ui.updateScore(this.pointSystem.score);
        this.ui.updatePoints(this.pointSystem.points);
        this.ui.updateLevel(this.pointSystem.level);
        
        const progress = this.pointSystem.getFeverProgress();
        this.ui.updateFeverGauge(progress);
        
        const levelProgress = this.pointSystem.getLevelProgress();
        this.ui.updateLevelProgress(levelProgress);
        
        this.ui.updateStats({
            totalLines: this.pointSystem.totalLines,
            tetrisCount: this.pointSystem.tetrisCount,
            tspinCount: this.pointSystem.tspinCount,
            comboCount: this.pointSystem.comboCount,
            backToBackActive: this.pointSystem.isBackToBackActive
        });
        
        this.ui.updateExchangeButtonState(
            this.pointSystem.canExchangeNext(), 
            this.feverMode.getIsActive()
        );
        
        // 段位表示更新
        const currentDan = this.scoreManager.getCurrentDan(this.pointSystem.score);
        this.ui.updateDanDisplay(currentDan);
    }

    handleTetrominoLocked(lockResult) {
        const { linesCleared, blocksPlaced, softDropDistance, hardDropDistance, isHardDrop, isTSpin, isAllClear } = lockResult;

        // Add points for placing tetromino with drop bonuses
        this.pointSystem.onTetrominoPlaced(softDropDistance, hardDropDistance, isHardDrop);

        if (linesCleared > 0) {
            const score = this.pointSystem.onLinesCleared(linesCleared, 'normal', isTSpin, isAllClear);
            this.ui.addScreenShake(8, 200);
        } else {
            // Reset combo if no lines cleared
            this.pointSystem.onLinesCleared(0);
        }

        if (this.pointSystem.shouldTriggerFever()) {
            this.feverMode.start();
            this.pointSystem.resetFeverProgress();
        }

        this.updateUI();
    }

    handleKeyDown(e) {
        if (this.gameState !== 'playing') return;

        const key = e.code;
        
        if (this.keys[key]) return;
        this.keys[key] = true;

        this.processKeyAction(key);

        this.setupKeyRepeat(key);
        
        e.preventDefault();
    }

    handleKeyUp(e) {
        const key = e.code;
        this.keys[key] = false;
        
        if (this.keyRepeatTimers[key]) {
            clearTimeout(this.keyRepeatTimers[key]);
            delete this.keyRepeatTimers[key];
        }
    }

    setupKeyRepeat(key) {
        if (['ArrowLeft', 'ArrowRight', 'ArrowDown'].includes(key)) {
            this.keyRepeatTimers[key] = setTimeout(() => {
                if (this.keys[key]) {
                    this.startKeyRepeat(key);
                }
            }, this.keyRepeatDelay);
        }
    }

    startKeyRepeat(key) {
        const repeat = () => {
            if (this.keys[key] && this.gameState === 'playing') {
                this.processKeyAction(key);
                this.keyRepeatTimers[key] = setTimeout(repeat, this.keyRepeatInterval);
            }
        };
        repeat();
    }

    processKeyAction(key) {
        let moved = false;

        switch (key) {
            case 'ArrowLeft':
                moved = this.gameField.moveTetrominoLeft();
                break;
                
            case 'ArrowRight':
                moved = this.gameField.moveTetrominoRight();
                break;
                
            case 'ArrowDown':
                moved = this.gameField.moveTetrominoDown(true); // true indicates manual soft drop
                break;
                
            case 'ArrowUp':
                moved = this.gameField.rotateTetromino();
                break;
                
            case 'Space':
                const dropDistance = this.gameField.hardDrop();
                if (dropDistance > 0) {
                    const lockResult = this.gameField.lockTetromino();
                    lockResult.isHardDrop = true;
                    this.handleTetrominoLocked(lockResult);
                }
                moved = true;
                break;
                
            case 'KeyC':
                moved = this.gameField.holdTetromino();
                if (moved) {
                    this.updateUI();
                }
                break;
                
            case 'KeyE':
                this.handleExchangeNext();
                break;
        }

        if (moved && key !== 'Space') {
            this.render();
        }
    }

    handleExchangeNext() {
        if (!this.gameField.currentTetromino) {
            this.ui.showMessage('交換できるブロックがありません!', 1000, 'error-message');
            return;
        }

        let canExchange = false;

        if (this.feverMode.getIsActive()) {
            canExchange = true;
        } else if (this.pointSystem.canExchangeNext()) {
            canExchange = this.pointSystem.exchangeNext();
        }

        if (canExchange) {
            // 現在のブロックと異なるタイプを取得
            const currentType = this.gameField.currentTetromino.type;
            const newType = this.getRandomDifferentType(currentType);
            
            this.gameField.currentTetromino = new Tetromino(newType, this.gameField.currentTetromino.x, this.gameField.currentTetromino.y);
            
            if (this.gameField.isColliding(this.gameField.currentTetromino)) {
                this.gameField.currentTetromino.x = 3;
                this.gameField.currentTetromino.y = 0;
            }
            
            this.render();
            this.ui.showMessage('ブロック交換!', 1000, 'exchange-message');
        } else {
            this.ui.showMessage('ポイント不足!', 1000, 'error-message');
        }
    }

    getRandomDifferentType(excludeType) {
        const allTypes = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
        const availableTypes = allTypes.filter(type => type !== excludeType);
        const randomIndex = Math.floor(Math.random() * availableTypes.length);
        return availableTypes[randomIndex];
    }

    getCurrentGameState() {
        return {
            gameState: this.gameState,
            isRunning: this.isRunning,
            score: this.pointSystem.score,
            points: this.pointSystem.points,
            blocksPlaced: this.pointSystem.blocksPlaced,
            isFeverActive: this.feverMode.getIsActive(),
            feverTimeRemaining: this.feverMode.getTimeRemaining()
        };
    }

    setDropSpeed(level) {
        this.gameField.setDropSpeed(level);
    }

    showRanking() {
        this.ui.updateRankingScreen(this.scoreManager);
        this.ui.showScreen('rankingScreen');
    }

    hideRanking() {
        const previousScreen = this.gameState === 'gameOver' ? 'gameOverScreen' : 'startScreen';
        this.ui.showScreen(previousScreen);
    }

    clearAllScores() {
        if (confirm('本当に全ての記録を削除しますか？この操作は取り消せません。')) {
            this.scoreManager.clearAllScores();
            this.ui.updateRankingScreen(this.scoreManager);
        }
    }
}

let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new TetrisGame();
});

window.addEventListener('beforeunload', () => {
    if (game && game.isRunning) {
        return 'ゲームが進行中です。本当にページを離れますか？';
    }
});