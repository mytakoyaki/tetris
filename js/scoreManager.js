// 段位定義
const DAN_RANKS = [
    { name: '無段', minScore: 0, color: '#888888' },
    { name: '初段', minScore: 200, color: '#8B4513' },
    { name: '二段', minScore: 800, color: '#CD853F' },
    { name: '三段', minScore: 2000, color: '#DAA520' },
    { name: '四段', minScore: 4000, color: '#FFD700' },
    { name: '五段', minScore: 8000, color: '#32CD32' },
    { name: '六段', minScore: 15000, color: '#00CED1' },
    { name: '七段', minScore: 25000, color: '#4169E1' },
    { name: '八段', minScore: 40000, color: '#9932CC' },
    { name: '九段', minScore: 60000, color: '#FF1493' },
    { name: '十段', minScore: 90000, color: '#FF4500' },
    { name: '名人', minScore: 130000, color: '#DC143C' },
    { name: '竜王', minScore: 200000, color: '#B8860B' },
    { name: '永世名人', minScore: 300000, color: '#FFD700' }
];

// 段位達成ボーナス設定
const DAN_BONUS = {
    '初段': { points: 20, effect: 'shodan_effect' },
    '二段': { points: 30, effect: 'nidan_effect' },
    '三段': { points: 50, effect: 'sandan_effect' },
    '四段': { points: 40, effect: 'yondan_effect' },
    '五段': { points: 50, effect: 'godan_effect' },
    '六段': { points: 60, effect: 'rokudan_effect' },
    '七段': { points: 70, effect: 'shichidan_effect' },
    '八段': { points: 80, effect: 'hachidan_effect' },
    '九段': { points: 90, effect: 'kyudan_effect' },
    '十段': { points: 100, effect: 'judan_effect' },
    '名人': { points: 150, effect: 'meijin_effect' },
    '竜王': { points: 200, effect: 'ryuou_effect' },
    '永世名人': { points: 300, effect: 'eisei_effect' }
};

class ScoreManager {
    constructor() {
        this.storageKey = 'claudeTetrisScores';
        this.maxRecords = 20;
        this.lastDanRank = null;
    }

    // スコアを保存
    saveScore(gameData) {
        const scoreRecord = {
            id: Date.now(),
            score: gameData.score,
            level: gameData.level,
            totalLines: gameData.totalLines,
            tetrisCount: gameData.tetrisCount,
            tspinCount: gameData.tspinCount,
            blocksPlaced: gameData.totalBlocksPlaced,
            playTime: this.formatPlayTime(gameData.playTime || 0),
            timestamp: new Date().toISOString(),
            dan: this.getDanRank(gameData.score)
        };

        const scores = this.getAllScores();
        scores.unshift(scoreRecord);

        // 最大記録数を超えた場合は古いものを削除
        if (scores.length > this.maxRecords) {
            scores.splice(this.maxRecords);
        }

        localStorage.setItem(this.storageKey, JSON.stringify(scores));
        return scoreRecord;
    }

    // 全スコア取得
    getAllScores() {
        try {
            const scores = localStorage.getItem(this.storageKey);
            return scores ? JSON.parse(scores) : [];
        } catch (error) {
            console.error('Failed to load scores:', error);
            return [];
        }
    }

    // ハイスコアランキング取得（トップ10）
    getHighScores(limit = 10) {
        const scores = this.getAllScores();
        return scores
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // 最高スコア取得
    getHighestScore() {
        const highScores = this.getHighScores(1);
        return highScores.length > 0 ? highScores[0].score : 0;
    }

    // 新記録かどうか判定
    isNewRecord(score) {
        return score > this.getHighestScore();
    }

    // 段位取得
    getDanRank(score) {
        for (let i = DAN_RANKS.length - 1; i >= 0; i--) {
            if (score >= DAN_RANKS[i].minScore) {
                return DAN_RANKS[i];
            }
        }
        return DAN_RANKS[0]; // 無段
    }

    // 現在の段位取得（リアルタイム）
    getCurrentDan(score) {
        return this.getDanRank(score);
    }

    // 段位昇格チェックとボーナス付与
    checkDanPromotion(currentScore, pointSystem) {
        const currentDan = this.getDanRank(currentScore);
        
        if (this.lastDanRank && currentDan.name !== this.lastDanRank.name) {
            // 段位昇格が発生
            const bonus = DAN_BONUS[currentDan.name];
            if (bonus && pointSystem) {
                pointSystem.addPoints(bonus.points);
                this.showDanPromotionEffect(currentDan, bonus);
            }
            this.lastDanRank = currentDan;
            return { promoted: true, newDan: currentDan, bonus: bonus };
        }
        
        if (!this.lastDanRank) {
            this.lastDanRank = currentDan;
        }
        
        return { promoted: false, currentDan: currentDan };
    }

    // 段位昇格エフェクト表示
    showDanPromotionEffect(dan, bonus) {
        // ゲームプレイを妨げない左上角の通知
        const promotionNotification = document.createElement('div');
        promotionNotification.className = 'dan-promotion-notification';
        promotionNotification.innerHTML = `
            <div class="dan-promotion-content">
                <div class="dan-promotion-icon">🏆</div>
                <div class="dan-promotion-info">
                    <div class="dan-promotion-title">段位昇格！</div>
                    <div class="dan-promotion-name" style="color: ${dan.color}">${dan.name}</div>
                    <div class="dan-promotion-bonus">+${bonus.points}P</div>
                </div>
            </div>
        `;
        
        promotionNotification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 2px solid ${dan.color};
            border-radius: 16px;
            padding: 20px;
            color: var(--text-primary);
            font-family: 'Segoe UI', Arial, sans-serif;
            z-index: 1000;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transform: translateX(-400px);
            opacity: 0;
            animation: danPromotionSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            max-width: 300px;
        `;
        
        // スタイルを追加（未存在の場合）
        if (!document.getElementById('danPromotionStyles')) {
            const style = document.createElement('style');
            style.id = 'danPromotionStyles';
            style.textContent = `
                @keyframes danPromotionSlideIn {
                    0% {
                        transform: translateX(-400px);
                        opacity: 0;
                    }
                    50% {
                        transform: translateX(10px);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes danPromotionSlideOut {
                    0% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(-400px);
                        opacity: 0;
                    }
                }
                .dan-promotion-content {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .dan-promotion-icon {
                    font-size: 2.5em;
                    text-align: center;
                    min-width: 50px;
                }
                .dan-promotion-info {
                    flex: 1;
                }
                .dan-promotion-title {
                    font-size: 1.1em;
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: var(--accent-green);
                }
                .dan-promotion-name {
                    font-size: 1.4em;
                    font-weight: 700;
                    margin-bottom: 5px;
                }
                .dan-promotion-bonus {
                    font-size: 1em;
                    font-weight: 600;
                    color: var(--accent-green);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(promotionNotification);
        
        // 4秒後に自動的に削除
        setTimeout(() => {
            promotionNotification.style.animation = 'danPromotionSlideOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            setTimeout(() => {
                if (promotionNotification.parentNode) {
                    promotionNotification.parentNode.removeChild(promotionNotification);
                }
            }, 500);
        }, 4000);
    }

    // 次の段位まで必要なスコア
    getScoreToNextDan(currentScore) {
        const currentDan = this.getDanRank(currentScore);
        const currentIndex = DAN_RANKS.findIndex(dan => dan.name === currentDan.name);
        
        if (currentIndex < DAN_RANKS.length - 1) {
            const nextDan = DAN_RANKS[currentIndex + 1];
            return {
                nextDan: nextDan,
                scoreNeeded: nextDan.minScore - currentScore
            };
        }
        
        return null; // 最高段位の場合
    }

    // プレイ時間フォーマット
    formatPlayTime(milliseconds) {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // 日時フォーマット
    formatDateTime(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }

    // スコア削除
    deleteScore(scoreId) {
        const scores = this.getAllScores();
        const filteredScores = scores.filter(score => score.id !== scoreId);
        localStorage.setItem(this.storageKey, JSON.stringify(filteredScores));
    }

    // 全スコア削除
    clearAllScores() {
        localStorage.removeItem(this.storageKey);
    }

    // 統計情報取得
    getStatistics() {
        const scores = this.getAllScores();
        
        if (scores.length === 0) {
            return {
                totalGames: 0,
                averageScore: 0,
                totalLines: 0,
                totalTetris: 0,
                totalTSpin: 0,
                bestDan: DAN_RANKS[0]
            };
        }

        const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
        const totalLines = scores.reduce((sum, score) => sum + score.totalLines, 0);
        const totalTetris = scores.reduce((sum, score) => sum + score.tetrisCount, 0);
        const totalTSpin = scores.reduce((sum, score) => sum + score.tspinCount, 0);
        
        const bestScore = Math.max(...scores.map(score => score.score));
        const bestDan = this.getDanRank(bestScore);

        return {
            totalGames: scores.length,
            averageScore: Math.floor(totalScore / scores.length),
            totalLines,
            totalTetris,
            totalTSpin,
            bestDan
        };
    }

    // ランキング順位取得
    getRanking(score) {
        const highScores = this.getHighScores(this.maxRecords);
        const rank = highScores.findIndex(record => record.score <= score) + 1;
        return rank || highScores.length + 1;
    }
}