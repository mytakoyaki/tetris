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
            comboCounter: document.getElementById('comboCounter'),
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
            this.elements.linesDisplay.textContent = `${progress.current}s/30s`;
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

    updateGameOverScreen(gameData) {
        document.getElementById('finalScore').textContent = gameData.score.toLocaleString();
        document.getElementById('finalLevel').textContent = gameData.level;
        document.getElementById('finalLines').textContent = gameData.totalLines;
        document.getElementById('finalTetris').textContent = gameData.tetrisCount;
        document.getElementById('finalTSpin').textContent = gameData.tspinCount;
        
        const danElement = document.getElementById('finalDan');
        danElement.textContent = gameData.currentDan.name;
        danElement.style.color = gameData.currentDan.color;
        
        // 新記録バッジ
        const newRecordBadge = document.getElementById('newRecordBadge');
        if (gameData.isNewRecord) {
            newRecordBadge.classList.remove('hidden');
        } else {
            newRecordBadge.classList.add('hidden');
        }
        
        // 段位昇格表示
        const danPromotion = document.getElementById('danPromotion');
        const promotionDan = document.getElementById('promotionDan');
        if (gameData.hasPromoted) {
            promotionDan.textContent = gameData.promotedDan.name;
            promotionDan.style.color = gameData.promotedDan.color;
            danPromotion.classList.remove('hidden');
        } else {
            danPromotion.classList.add('hidden');
        }
    }

    updateDanDisplay(dan) {
        const danElement = document.getElementById('danDisplay');
        danElement.textContent = dan.name;
        danElement.style.color = dan.color;
        document.documentElement.style.setProperty('--dan-color', dan.color);
    }

    updateRankingScreen(scoreManager) {
        const rankingList = document.getElementById('rankingList');
        const highScores = scoreManager.getHighScores(10);
        
        rankingList.innerHTML = '';
        
        if (highScores.length === 0) {
            rankingList.innerHTML = '<div class="no-scores">記録がありません</div>';
            this.updateOverallStats(scoreManager);
            return;
        }
        
        highScores.forEach((score, index) => {
            const rankingItem = document.createElement('div');
            rankingItem.className = 'ranking-item';
            
            const rank = index + 1;
            const isTop3 = rank <= 3;
            
            rankingItem.innerHTML = `
                <div class="ranking-rank ${isTop3 ? 'top3' : ''}">${rank}</div>
                <div class="ranking-score">${score.score.toLocaleString()}</div>
                <div class="ranking-dan" style="color: ${score.dan.color}">${score.dan.name}</div>
                <div class="ranking-level">Lv.${score.level}</div>
                <div class="ranking-date">${scoreManager.formatDateTime(score.timestamp)}</div>
            `;
            
            rankingList.appendChild(rankingItem);
        });
        
        this.updateOverallStats(scoreManager);
    }

    updateAchievementScreen(achievementSystem) {
        const achievements = achievementSystem.achievements;
        const stats = achievementSystem.getProgressStats();
        
        // プログレス情報更新
        document.getElementById('achievementProgress').textContent = `${stats.unlocked}/${stats.total}`;
        document.getElementById('achievementPercentage').textContent = `${stats.progress}%`;
        document.getElementById('achievementPoints').textContent = `${stats.totalPoints}P`;
        
        const progressFill = document.getElementById('achievementProgressFill');
        progressFill.style.width = `${stats.progress}%`;
        
        // カテゴリータブのイベントリスナー設定
        this.setupAchievementTabs(achievements);
        
        // 全実績表示
        this.displayAchievements(achievements, 'all');
    }

    setupAchievementTabs(achievements) {
        const tabs = document.querySelectorAll('.category-tab');
        const achievementList = document.getElementById('achievementList');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // アクティブタブ切り替え
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // 実績表示切り替え
                const category = tab.dataset.category;
                this.displayAchievements(achievements, category);
            });
        });
    }

    displayAchievements(achievements, category) {
        const achievementList = document.getElementById('achievementList');
        achievementList.innerHTML = '';
        
        const filteredAchievements = Object.values(achievements).filter(achievement => {
            return category === 'all' || achievement.category === category;
        });
        
        // カテゴリー別にソート（解除済み → 未解除、ポイント順）
        filteredAchievements.sort((a, b) => {
            if (a.unlocked !== b.unlocked) {
                return b.unlocked - a.unlocked; // 解除済みを先に
            }
            return b.points - a.points; // ポイント高い順
        });
        
        filteredAchievements.forEach(achievement => {
            const achievementCard = document.createElement('div');
            achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            
            achievementCard.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                    <div class="achievement-meta">
                        <span class="achievement-category">${this.getCategoryDisplayName(achievement.category)}</span>
                        <span class="achievement-points">${achievement.points}P</span>
                    </div>
                </div>
                ${achievement.unlocked ? '<div class="achievement-check">✓</div>' : ''}
            `;
            
            achievementList.appendChild(achievementCard);
        });
        
        if (!document.getElementById('achievementCardStyles')) {
            this.addAchievementStyles();
        }
    }

    getCategoryDisplayName(category) {
        const categoryNames = {
            basic: '基本',
            score: 'スコア',
            technical: 'テクニカル',
            special: '特殊',
            progress: '進歩',
            rank: '段位',
            challenge: 'チャレンジ'
        };
        return categoryNames[category] || category;
    }

    addAchievementStyles() {
        const style = document.createElement('style');
        style.id = 'achievementCardStyles';
        style.textContent = `
            .achievement-container {
                width: 90vw;
                max-width: 1000px;
                height: 85vh;
                max-height: 800px;
                padding: 40px;
                display: flex;
                flex-direction: column;
            }
            
            .achievement-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid var(--glass-border);
            }
            
            .achievement-title {
                font-size: 2.5em;
                font-weight: 700;
                background: var(--gold-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin: 0;
            }
            
            .achievement-progress {
                margin-bottom: 30px;
            }
            
            .progress-stats {
                display: flex;
                justify-content: space-around;
                margin-bottom: 20px;
            }
            
            .progress-item {
                text-align: center;
            }
            
            .progress-label {
                display: block;
                font-size: 0.9em;
                color: var(--text-secondary);
                margin-bottom: 5px;
            }
            
            .progress-value {
                font-size: 1.4em;
                font-weight: 700;
                color: var(--accent-green);
            }
            
            .achievement-progress-bar {
                height: 12px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid var(--glass-border);
            }
            
            .achievement-progress-fill {
                height: 100%;
                background: var(--gold-gradient);
                transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                border-radius: 6px;
            }
            
            .achievement-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .achievement-categories {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            
            .category-tab {
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                color: var(--text-secondary);
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9em;
                font-weight: 500;
            }
            
            .category-tab:hover {
                background: rgba(255, 255, 255, 0.15);
                border-color: var(--accent-green);
            }
            
            .category-tab.active {
                background: var(--accent-green);
                color: var(--primary-dark);
                border-color: var(--accent-green);
                font-weight: 600;
            }
            
            .achievement-list {
                flex: 1;
                overflow-y: auto;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
                padding: 10px;
            }
            
            .achievement-card {
                background: var(--glass-bg);
                border: 2px solid var(--glass-border);
                border-radius: 16px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 16px;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .achievement-card.unlocked {
                border-color: var(--accent-green);
                box-shadow: 0 4px 20px rgba(0, 255, 136, 0.2);
            }
            
            .achievement-card.locked {
                opacity: 0.6;
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .achievement-card:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-deep);
            }
            
            .achievement-icon {
                font-size: 2.5em;
                text-align: center;
                width: 60px;
                flex-shrink: 0;
            }
            
            .achievement-info {
                flex: 1;
            }
            
            .achievement-name {
                font-size: 1.2em;
                font-weight: 700;
                margin-bottom: 6px;
                color: var(--text-primary);
            }
            
            .achievement-description {
                font-size: 0.95em;
                color: var(--text-secondary);
                margin-bottom: 10px;
                line-height: 1.4;
            }
            
            .achievement-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .achievement-category {
                background: rgba(255, 255, 255, 0.1);
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 0.8em;
                color: var(--text-secondary);
            }
            
            .achievement-points {
                font-weight: 700;
                color: var(--accent-green);
                font-size: 1em;
            }
            
            .achievement-check {
                position: absolute;
                top: 12px;
                right: 12px;
                color: var(--accent-green);
                font-size: 1.5em;
                font-weight: 700;
            }
            
            .achievement-card.unlocked .achievement-points {
                color: var(--gold-gradient);
            }
        `;
        document.head.appendChild(style);
    }

    updateOverallStats(scoreManager) {
        const overallStats = document.getElementById('overallStats');
        const stats = scoreManager.getStatistics();
        
        overallStats.innerHTML = `
            <div class="overall-stat-item">
                <span class="overall-stat-label">総ゲーム数</span>
                <span class="overall-stat-value">${stats.totalGames}</span>
            </div>
            <div class="overall-stat-item">
                <span class="overall-stat-label">平均スコア</span>
                <span class="overall-stat-value">${stats.averageScore.toLocaleString()}</span>
            </div>
            <div class="overall-stat-item">
                <span class="overall-stat-label">総ライン数</span>
                <span class="overall-stat-value">${stats.totalLines}</span>
            </div>
            <div class="overall-stat-item">
                <span class="overall-stat-label">総テトリス数</span>
                <span class="overall-stat-value">${stats.totalTetris}</span>
            </div>
            <div class="overall-stat-item">
                <span class="overall-stat-label">総T-Spin数</span>
                <span class="overall-stat-value">${stats.totalTSpin}</span>
            </div>
            <div class="overall-stat-item">
                <span class="overall-stat-label">最高段位</span>
                <span class="overall-stat-value" style="color: ${stats.bestDan.color}">${stats.bestDan.name}</span>
            </div>
        `;
    }

    updateComboCounter(comboCount, isActive) {
        if (!this.elements.comboCounter) return;
        
        if (comboCount >= 2 && isActive) {
            this.elements.comboCounter.textContent = `${comboCount} COMBO`;
            this.elements.comboCounter.classList.remove('hidden');
            
            // コンボレベルに応じてスタイル変更
            this.elements.comboCounter.classList.remove('combo-high', 'combo-extreme');
            if (comboCount >= 7) {
                this.elements.comboCounter.classList.add('combo-extreme');
            } else if (comboCount >= 4) {
                this.elements.comboCounter.classList.add('combo-high');
            }
        } else {
            this.elements.comboCounter.classList.add('hidden');
        }
    }

    showComboBreak(comboCount) {
        if (comboCount >= 2) {
            this.showMessage(`COMBO BREAK! (${comboCount} コンボ)`, 1500, 'combo-break-message');
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

    updateExchangeButtonState(canAfford, isFever, currentCost = 30) {
        const hintKey = document.querySelector('.hint-key');
        const hintText = document.querySelector('.hint-text');
        
        if (hintKey && hintText) {
            if (isFever) {
                hintText.textContent = '交換 (FREE!)';
                hintKey.style.color = 'var(--gold-gradient)';
                hintText.style.color = '#ffd700';
                hintKey.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
            } else if (canAfford) {
                hintText.textContent = `交換 (-${currentCost}P)`;
                hintKey.style.color = 'var(--accent-green)';
                hintText.style.color = 'var(--text-secondary)';
                hintKey.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            } else {
                hintText.textContent = `交換 (-${currentCost}P)`;
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
        this.updateFeverGauge({ current: 0, needed: 20, percentage: 0 });
        this.updateLevel(1);
        this.updateLevelProgress({ current: 0, needed: 30, percentage: 0 });
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