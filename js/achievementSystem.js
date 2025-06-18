// 実績システム
const ACHIEVEMENTS = {
    first_line: {
        id: 'first_line',
        name: '初回ライン消去',
        description: '初めてラインを消去しました',
        icon: '🏁',
        category: 'basic',
        condition: { type: 'lines_cleared', value: 1 },
        points: 10,
        unlocked: false
    },
    score_100: {
        id: 'score_100',
        name: '100点到達',
        description: '100点に到達しました',
        icon: '🎯',
        category: 'score',
        condition: { type: 'score', value: 100 },
        points: 5,
        unlocked: false
    },
    score_500: {
        id: 'score_500',
        name: '500点到達',
        description: '500点に到達しました',
        icon: '⭐',
        category: 'score',
        condition: { type: 'score', value: 500 },
        points: 10,
        unlocked: false
    },
    score_1000: {
        id: 'score_1000',
        name: '1000点到達',
        description: '1000点に到達しました',
        icon: '💫',
        category: 'score',
        condition: { type: 'score', value: 1000 },
        points: 20,
        unlocked: false
    },
    score_5000: {
        id: 'score_5000',
        name: '5000点到達',
        description: '5000点に到達しました',
        icon: '🌟',
        category: 'score',
        condition: { type: 'score', value: 5000 },
        points: 50,
        unlocked: false
    },
    first_tetris: {
        id: 'first_tetris',
        name: '初回テトリス',
        description: '初めて4ライン同時消去を達成しました',
        icon: '🏆',
        category: 'technical',
        condition: { type: 'tetris', value: 1 },
        points: 30,
        unlocked: false
    },
    combo_master: {
        id: 'combo_master',
        name: 'コンボマスター',
        description: '5コンボ以上を達成しました',
        icon: '⚡',
        category: 'technical',
        condition: { type: 'max_combo', value: 5 },
        points: 25,
        unlocked: false
    },
    first_tspin: {
        id: 'first_tspin',
        name: 'T-Spinデビュー',
        description: '初めてT-Spinを決めました',
        icon: '🔥',
        category: 'technical',
        condition: { type: 'tspin', value: 1 },
        points: 40,
        unlocked: false
    },
    fever_master: {
        id: 'fever_master',
        name: 'フィーバーマスター',
        description: 'フィーバーモードを10回発動しました',
        icon: '🎉',
        category: 'special',
        condition: { type: 'fever_count', value: 10 },
        points: 35,
        unlocked: false
    },
    exchange_expert: {
        id: 'exchange_expert',
        name: '交換エキスパート',
        description: 'ブロック交換を50回使用しました',
        icon: '🔄',
        category: 'special',
        condition: { type: 'exchange_count', value: 50 },
        points: 20,
        unlocked: false
    },
    level_10: {
        id: 'level_10',
        name: 'レベル10到達',
        description: 'レベル10に到達しました',
        icon: '🎮',
        category: 'progress',
        condition: { type: 'level', value: 10 },
        points: 30,
        unlocked: false
    },
    dan_shodan: {
        id: 'dan_shodan',
        name: '初段昇格',
        description: '初段に昇格しました',
        icon: '🥋',
        category: 'rank',
        condition: { type: 'dan_rank', value: '初段' },
        points: 50,
        unlocked: false
    },
    speed_demon: {
        id: 'speed_demon',
        name: 'スピードデーモン',
        description: '1分以内に500点到達',
        icon: '💨',
        category: 'challenge',
        condition: { type: 'speed_score', score: 500, time: 60000 },
        points: 60,
        unlocked: false
    },
    endurance: {
        id: 'endurance',
        name: '持久力',
        description: '5分以上プレイしました',
        icon: '⏰',
        category: 'challenge',
        condition: { type: 'play_time', value: 300000 },
        points: 25,
        unlocked: false
    },
    perfectionist: {
        id: 'perfectionist',
        name: '完璧主義者',
        description: 'パーフェクトクリアを達成しました',
        icon: '✨',
        category: 'technical',
        condition: { type: 'perfect_clear', value: 1 },
        points: 100,
        unlocked: false
    }
};

class AchievementSystem {
    constructor() {
        this.achievements = { ...ACHIEVEMENTS };
        this.sessionStats = {
            linesCleared: 0,
            score: 0,
            tetrisCount: 0,
            tspinCount: 0,
            maxCombo: 0,
            feverCount: 0,
            exchangeCount: 0,
            level: 1,
            currentDan: '無段',
            playStartTime: 0,
            perfectClearCount: 0
        };
        this.callbacks = {
            onAchievementUnlocked: null
        };
        
        this.loadProgress();
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('tetris_achievements');
            if (saved) {
                const progress = JSON.parse(saved);
                // 新しい実績が追加された場合に対応
                Object.keys(this.achievements).forEach(id => {
                    if (progress[id] !== undefined) {
                        this.achievements[id].unlocked = progress[id].unlocked;
                    }
                });
            }
        } catch (error) {
            console.warn('実績データの読み込みに失敗:', error);
        }
    }

    saveProgress() {
        try {
            const progress = {};
            Object.keys(this.achievements).forEach(id => {
                progress[id] = {
                    unlocked: this.achievements[id].unlocked
                };
            });
            localStorage.setItem('tetris_achievements', JSON.stringify(progress));
        } catch (error) {
            console.warn('実績データの保存に失敗:', error);
        }
    }

    startSession() {
        this.sessionStats = {
            linesCleared: 0,
            score: 0,
            tetrisCount: 0,
            tspinCount: 0,
            maxCombo: 0,
            feverCount: 0,
            exchangeCount: 0,
            level: 1,
            currentDan: '無段',
            playStartTime: Date.now(),
            perfectClearCount: 0
        };
    }

    updateStats(statType, value) {
        switch (statType) {
            case 'lines_cleared':
                this.sessionStats.linesCleared += value;
                break;
            case 'score':
                this.sessionStats.score = value;
                break;
            case 'tetris':
                this.sessionStats.tetrisCount += value;
                break;
            case 'tspin':
                this.sessionStats.tspinCount += value;
                break;
            case 'combo':
                this.sessionStats.maxCombo = Math.max(this.sessionStats.maxCombo, value);
                break;
            case 'fever':
                this.sessionStats.feverCount += 1;
                break;
            case 'exchange':
                this.sessionStats.exchangeCount += 1;
                break;
            case 'level':
                this.sessionStats.level = value;
                break;
            case 'dan':
                this.sessionStats.currentDan = value;
                break;
            case 'perfect_clear':
                this.sessionStats.perfectClearCount += value;
                break;
        }

        this.checkAchievements();
    }

    checkAchievements() {
        const newUnlocks = [];

        Object.values(this.achievements).forEach(achievement => {
            if (achievement.unlocked) return;

            let unlocked = false;
            const condition = achievement.condition;

            switch (condition.type) {
                case 'lines_cleared':
                    unlocked = this.sessionStats.linesCleared >= condition.value;
                    break;
                case 'score':
                    unlocked = this.sessionStats.score >= condition.value;
                    break;
                case 'tetris':
                    unlocked = this.sessionStats.tetrisCount >= condition.value;
                    break;
                case 'tspin':
                    unlocked = this.sessionStats.tspinCount >= condition.value;
                    break;
                case 'max_combo':
                    unlocked = this.sessionStats.maxCombo >= condition.value;
                    break;
                case 'fever_count':
                    unlocked = this.sessionStats.feverCount >= condition.value;
                    break;
                case 'exchange_count':
                    unlocked = this.sessionStats.exchangeCount >= condition.value;
                    break;
                case 'level':
                    unlocked = this.sessionStats.level >= condition.value;
                    break;
                case 'dan_rank':
                    unlocked = this.sessionStats.currentDan === condition.value;
                    break;
                case 'perfect_clear':
                    unlocked = this.sessionStats.perfectClearCount >= condition.value;
                    break;
                case 'speed_score':
                    const playTime = Date.now() - this.sessionStats.playStartTime;
                    unlocked = this.sessionStats.score >= condition.score && playTime <= condition.time;
                    break;
                case 'play_time':
                    const totalPlayTime = Date.now() - this.sessionStats.playStartTime;
                    unlocked = totalPlayTime >= condition.value;
                    break;
            }

            if (unlocked) {
                achievement.unlocked = true;
                newUnlocks.push(achievement);
            }
        });

        if (newUnlocks.length > 0) {
            this.saveProgress();
            newUnlocks.forEach(achievement => {
                this.showAchievementUnlock(achievement);
                if (this.callbacks.onAchievementUnlocked) {
                    this.callbacks.onAchievementUnlocked(achievement);
                }
            });
        }
    }

    showAchievementUnlock(achievement) {
        // 実績解除の視覚的表示
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-title">実績解除！</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                    <div class="achievement-points">+${achievement.points}P</div>
                </div>
            </div>
        `;
        
        popup.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 2px solid var(--accent-green);
            border-radius: 16px;
            padding: 20px;
            color: var(--text-primary);
            font-family: 'Segoe UI', Arial, sans-serif;
            z-index: 10000;
            box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
            transform: translateX(400px);
            opacity: 0;
            animation: achievementSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        `;

        // スタイルを追加（未存在の場合）
        if (!document.getElementById('achievementStyles')) {
            const style = document.createElement('style');
            style.id = 'achievementStyles';
            style.textContent = `
                @keyframes achievementSlideIn {
                    0% {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    50% {
                        transform: translateX(-10px);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes achievementSlideOut {
                    0% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
                .achievement-content {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .achievement-icon {
                    font-size: 3em;
                    text-align: center;
                    width: 60px;
                }
                .achievement-info {
                    flex: 1;
                }
                .achievement-title {
                    font-size: 0.9em;
                    color: var(--accent-green);
                    font-weight: 600;
                    margin-bottom: 4px;
                }
                .achievement-name {
                    font-size: 1.2em;
                    font-weight: 700;
                    margin-bottom: 6px;
                }
                .achievement-desc {
                    font-size: 0.9em;
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                }
                .achievement-points {
                    font-size: 1em;
                    color: var(--accent-green);
                    font-weight: 600;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(popup);

        // 4秒後に自動的に削除
        setTimeout(() => {
            popup.style.animation = 'achievementSlideOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
            }, 500);
        }, 4000);
    }

    getUnlockedAchievements() {
        return Object.values(this.achievements).filter(achievement => achievement.unlocked);
    }

    getProgressStats() {
        const total = Object.keys(this.achievements).length;
        const unlocked = this.getUnlockedAchievements().length;
        const totalPoints = this.getUnlockedAchievements().reduce((sum, achievement) => sum + achievement.points, 0);
        
        return {
            total,
            unlocked,
            progress: Math.round((unlocked / total) * 100),
            totalPoints
        };
    }

    getAchievementsByCategory() {
        const categories = {};
        Object.values(this.achievements).forEach(achievement => {
            if (!categories[achievement.category]) {
                categories[achievement.category] = [];
            }
            categories[achievement.category].push(achievement);
        });
        return categories;
    }

    setCallback(event, callback) {
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event] = callback;
        }
    }

    reset() {
        this.startSession();
    }
}