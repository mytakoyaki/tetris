// 段位定義
const DAN_RANKS = [
    { name: '無段', minScore: 0, color: '#888888' },
    { name: '初段', minScore: 500, color: '#8B4513' },
    { name: '二段', minScore: 1500, color: '#CD853F' },
    { name: '三段', minScore: 3000, color: '#DAA520' },
    { name: '四段', minScore: 6000, color: '#FFD700' },
    { name: '五段', minScore: 12000, color: '#32CD32' },
    { name: '六段', minScore: 20000, color: '#00CED1' },
    { name: '七段', minScore: 35000, color: '#4169E1' },
    { name: '八段', minScore: 50000, color: '#9932CC' },
    { name: '九段', minScore: 75000, color: '#FF1493' },
    { name: '十段', minScore: 100000, color: '#FF4500' },
    { name: '名人', minScore: 150000, color: '#DC143C' },
    { name: '竜王', minScore: 250000, color: '#B8860B' },
    { name: '永世名人', minScore: 500000, color: '#FFD700' }
];

class ScoreManager {
    constructor() {
        this.storageKey = 'claudeTetrisScores';
        this.maxRecords = 20;
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