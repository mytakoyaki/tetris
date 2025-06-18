class TetrisGame {
    constructor() {
        this.gameField = new GameField();
        this.pointSystem = new PointSystem();
        this.feverMode = new FeverMode();
        this.ui = new UIManager();
        this.scoreManager = new ScoreManager();
        this.achievementSystem = new AchievementSystem();
        
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

        document.getElementById('achievementButton').addEventListener('click', () => {
            this.showAchievements();
        });

        document.getElementById('viewAchievementButton').addEventListener('click', () => {
            this.showAchievements();
        });

        document.getElementById('closeAchievementButton').addEventListener('click', () => {
            this.hideAchievements();
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
                this.feverMode.getIsActive(),
                this.pointSystem.getCurrentExchangeCost()
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
            const levelProgress = this.pointSystem.getLevelProgress(this.gameStartTime);
            this.ui.updateLevelProgress(levelProgress);
            
            // コンボ表示更新
            this.ui.updateComboCounter(this.pointSystem.comboCount, this.pointSystem.comboActive);
        });

        this.pointSystem.setCallback('onComboBreak', (comboCount) => {
            this.ui.showComboBreak(comboCount);
        });

        // スコアマネージャーを設定
        this.pointSystem.setScoreManager(this.scoreManager);

        // 実績システムコールバック設定
        this.achievementSystem.setCallback('onAchievementUnlocked', (achievement) => {
            // 実績解除時にポイントボーナス付与（フィーバーモード中は無効）
            this.pointSystem.addPoints(achievement.points);
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
        this.achievementSystem.startSession();
        
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

        // コンボタイマー更新
        this.pointSystem.updateComboTimer();

        // 時間ベースレベルアップシステム
        this.updateLevelByTime();

        const lockResult = this.gameField.update(deltaTime);
        
        if (lockResult) {
            // For auto-lock, ensure we get the soft drop distance
            this.handleTetrominoLocked(lockResult);
        }

        // 段位昇格チェック
        const promotionResult = this.pointSystem.checkDanPromotion();
        if (promotionResult.promoted) {
            // 段位昇格時の追加処理
            this.updateUI();
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
        
        const levelProgress = this.pointSystem.getLevelProgress(this.gameStartTime);
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
            this.feverMode.getIsActive(),
            this.pointSystem.getCurrentExchangeCost()
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
            
            // 実績更新
            this.achievementSystem.updateStats('lines_cleared', linesCleared);
            if (linesCleared === 4) {
                this.achievementSystem.updateStats('tetris', 1);
            }
            if (isTSpin) {
                this.achievementSystem.updateStats('tspin', 1);
            }
            if (isAllClear) {
                this.achievementSystem.updateStats('perfect_clear', 1);
            }
            if (this.pointSystem.comboCount > 0) {
                this.achievementSystem.updateStats('combo', this.pointSystem.comboCount);
            }
        } else {
            // Reset combo if no lines cleared
            this.pointSystem.onLinesCleared(0);
        }

        if (this.pointSystem.shouldTriggerFever()) {
            this.feverMode.start();
            this.pointSystem.resetFeverProgress();
            this.achievementSystem.updateStats('fever', 1);
        }

        // スコアと段位の実績更新
        this.achievementSystem.updateStats('score', this.pointSystem.score);
        this.achievementSystem.updateStats('level', this.pointSystem.level);
        const currentDan = this.scoreManager.getCurrentDan(this.pointSystem.score);
        this.achievementSystem.updateStats('dan', currentDan.name);

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
            
            // 交換実績更新
            this.achievementSystem.updateStats('exchange', 1);
            
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

    showAchievements() {
        this.ui.updateAchievementScreen(this.achievementSystem);
        this.ui.showScreen('achievementScreen');
    }

    hideAchievements() {
        const previousScreen = this.gameState === 'gameOver' ? 'gameOverScreen' : 'startScreen';
        this.ui.showScreen(previousScreen);
    }

    updateLevelByTime() {
        if (!this.gameStartTime) return;
        
        const elapsedTime = Date.now() - this.gameStartTime;
        const newLevel = Math.min(Math.floor(elapsedTime / 30000) + 1, 30); // 30秒ごと、最大レベル30
        
        if (newLevel > this.pointSystem.level) {
            this.pointSystem.level = newLevel;
            
            // レベルアップ時の処理
            this.gameField.setDropSpeed(this.pointSystem.getDropSpeed());
            this.ui.updateLevel(newLevel);
            
            // レベルアップエフェクト
            this.ui.showMessage(`LEVEL UP! レベル ${newLevel}`, 2000, 'level-up-message');
            
            // 実績更新
            this.achievementSystem.updateStats('level', newLevel);
            
            if (this.pointSystem.callbacks.onLevelChange) {
                this.pointSystem.callbacks.onLevelChange(newLevel);
            }
        }
    }
}

let game;

document.addEventListener('DOMContentLoaded', () => {
    game = new TetrisGame();
    
    // レスポンシブマネージャー初期化
    const responsiveManager = new ResponsiveManager();
    
    // 縦横切り替え機能初期化
    const orientationToggle = new OrientationToggle();
});

window.addEventListener('beforeunload', () => {
    if (game && game.isRunning) {
        return 'ゲームが進行中です。本当にページを離れますか？';
    }
});

// レスポンシブ表示制御
class ResponsiveManager {
    constructor() {
        this.breakpoints = {
            xs: 480,
            sm: 600, 
            md: 768,
            lg: 1200,
            xl: 1400
        };
        this.controlsToggle = null;
        this.init();
    }
    
    init() {
        this.setViewportHeight();
        window.addEventListener('resize', () => {
            this.setViewportHeight();
            this.handleResize();
        });
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.setViewportHeight();
                this.handleResize();
            }, 100);
        });
        // 初期化時にも適用
        setTimeout(() => this.handleResize(), 100);
    }
    
    setViewportHeight() {
        // リアルなビューポート高さを計算（モバイルブラウザのUI要素を考慮）
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    handleResize() {
        const width = window.innerWidth;
        const size = this.getCurrentBreakpoint(width);
        this.applyResponsiveLayout(size);
    }
    
    getCurrentBreakpoint(width) {
        if (width <= this.breakpoints.xs) return 'xs';
        if (width <= this.breakpoints.sm) return 'sm';
        if (width <= this.breakpoints.md) return 'md';
        if (width <= this.breakpoints.lg) return 'lg';
        return 'xl';
    }
    
    applyResponsiveLayout(size) {
        const body = document.body;
        body.className = body.className.replace(/size-\w+/g, '');
        body.classList.add(`size-${size}`);
        
        // 極小画面での操作説明制御
        if (size === 'xs') {
            this.setupControlsToggle();
        } else {
            this.removeControlsToggle();
        }
        
        // 情報パネルのコンパクト表示制御
        this.applyCompactLayout(size);
    }
    
    applyCompactLayout(size) {
        const infoSections = document.querySelectorAll('.info-section');
        const statItems = document.querySelectorAll('.stat-item');
        
        if (size === 'xs' || size === 'sm') {
            // 小画面ではコンパクト表示
            infoSections.forEach(section => {
                section.classList.add('compact');
            });
            statItems.forEach(item => {
                item.classList.add('compact');
            });
        } else {
            // 大画面では通常表示
            infoSections.forEach(section => {
                section.classList.remove('compact');
            });
            statItems.forEach(item => {
                item.classList.remove('compact');
            });
        }
    }
    
    setupControlsToggle() {
        if (this.controlsToggle) return; // 既に存在する場合はスキップ
        
        this.controlsToggle = document.createElement('button');
        this.controlsToggle.className = 'controls-toggle';
        this.controlsToggle.innerHTML = '?';
        this.controlsToggle.title = '操作説明を表示';
        this.controlsToggle.addEventListener('click', () => this.toggleControls());
        document.body.appendChild(this.controlsToggle);
        
        // 初期状態では操作説明を非表示
        const controls = document.querySelector('.controls-info');
        if (controls) {
            controls.classList.remove('show');
        }
    }
    
    removeControlsToggle() {
        if (this.controlsToggle) {
            this.controlsToggle.remove();
            this.controlsToggle = null;
        }
        
        // 操作説明を通常表示に戻す
        const controls = document.querySelector('.controls-info');
        if (controls) {
            controls.classList.remove('show');
            controls.style.transform = '';
            controls.style.position = '';
            controls.style.bottom = '';
            controls.style.left = '';
            controls.style.right = '';
        }
    }
    
    toggleControls() {
        const controls = document.querySelector('.controls-info');
        if (controls) {
            controls.classList.toggle('show');
            
            // ボタンのアイコンを変更
            if (controls.classList.contains('show')) {
                this.controlsToggle.innerHTML = '×';
                this.controlsToggle.title = '操作説明を閉じる';
            } else {
                this.controlsToggle.innerHTML = '?';
                this.controlsToggle.title = '操作説明を表示';
            }
        }
    }
}

// 縦横レイアウト切り替え
class OrientationToggle {
    constructor() {
        this.isPortrait = false;
        this.button = document.getElementById('orientationToggle');
        this.init();
    }
    
    init() {
        this.button.addEventListener('click', () => this.toggle());
        this.updateButtonText();
    }
    
    toggle() {
        this.isPortrait = !this.isPortrait;
        const body = document.body;
        
        if (this.isPortrait) {
            body.classList.add('layout-portrait');
        } else {
            body.classList.remove('layout-portrait');
        }
        
        this.updateButtonText();
        
        // アニメーション効果
        this.button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.button.style.transform = '';
        }, 150);
    }
    
    updateButtonText() {
        const textElement = this.button.querySelector('.toggle-text');
        const iconElement = this.button.querySelector('.toggle-icon');
        
        if (this.isPortrait) {
            textElement.textContent = '横レイアウト';
            iconElement.style.transform = 'rotate(90deg)';
        } else {
            textElement.textContent = '縦レイアウト';
            iconElement.style.transform = 'rotate(0deg)';
        }
    }
}