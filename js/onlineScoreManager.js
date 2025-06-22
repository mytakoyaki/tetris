// オンライン対応スコアマネージャー（既存のScoreManagerを拡張）
import { DAN_RANKS } from './scoreManager.js';

class OnlineScoreManager {
    constructor(scoreManager, authManager, dataManager) {
        this.scoreManager = scoreManager;
        this.authManager = authManager;
        this.dataManager = dataManager;
        
        this.isOnline = false;
        this.syncInProgress = false;
        this.callbacks = {
            onOnlineStateChange: null,
            onLeaderboardUpdate: null,
            onSyncComplete: null
        };
        
        this.initializeOnlineFeatures();
    }

    // オンライン機能の初期化
    async initializeOnlineFeatures() {
        try {
            // Firebase接続テスト
            this.isOnline = await this.dataManager.testConnection();
            console.log('オンライン状態:', this.isOnline ? '接続済み' : '切断');
            
            if (this.isOnline) {
                // 認証状態の監視
                this.authManager.setCallback('onAuthStateChange', (user) => {
                    this.handleAuthStateChange(user);
                });
                
                // 自動同期の開始
                await this.syncLocalData();
            }
            
            if (this.callbacks.onOnlineStateChange) {
                this.callbacks.onOnlineStateChange(this.isOnline);
            }
        } catch (error) {
            console.error('オンライン機能初期化エラー:', error);
            this.isOnline = false;
        }
    }

    // 認証状態変更の処理
    async handleAuthStateChange(user) {
        if (user) {
            console.log('ユーザーログイン:', user.isAnonymous ? '匿名' : 'メール');
            await this.syncLocalData();
        } else {
            console.log('ユーザーログアウト');
        }
    }

    // ローカルデータとオンラインデータの同期
    async syncLocalData() {
        if (!this.isOnline || this.syncInProgress || !this.authManager.isAuthenticated()) {
            return;
        }

        this.syncInProgress = true;
        
        try {
            // ローカルのスコアデータを取得
            const localScores = this.scoreManager.getHighScores();
            const localStats = this.scoreManager.getStatistics();
            
            const localData = {
                highScores: localScores,
                statistics: localStats,
                lastUpdated: Date.now()
            };

            // オンラインと同期
            const syncResult = await this.dataManager.syncLocalData(localData);
            
            if (syncResult.success) {
                if (syncResult.action === 'downloaded' && syncResult.data) {
                    // オンラインデータをローカルに適用
                    this.applyOnlineDataToLocal(syncResult.data);
                }
                
                console.log('データ同期完了:', syncResult.action);
                
                if (this.callbacks.onSyncComplete) {
                    this.callbacks.onSyncComplete(syncResult);
                }
            }
        } catch (error) {
            console.error('データ同期エラー:', error);
        } finally {
            this.syncInProgress = false;
        }
    }

    // オンラインデータをローカルに適用
    applyOnlineDataToLocal(onlineData) {
        try {
            if (onlineData.highScores) {
                // 高スコアデータの更新
                onlineData.highScores.forEach(score => {
                    this.scoreManager.addScore(score);
                });
            }

            if (onlineData.statistics) {
                // 統計データの更新（必要に応じて実装）
                console.log('統計データを同期:', onlineData.statistics);
            }

            console.log('オンラインデータの適用完了');
        } catch (error) {
            console.error('オンラインデータ適用エラー:', error);
        }
    }

    // スコア保存（オンライン対応）
    async saveScore(gameData) {
        // ローカルに保存
        const isNewRecord = this.scoreManager.addScore(gameData);
        
        // オンラインに保存
        if (this.isOnline && this.authManager.isAuthenticated()) {
            try {
                const onlineScoreData = {
                    score: gameData.score,
                    level: gameData.level,
                    totalLines: gameData.totalLines,
                    tetrisCount: gameData.tetrisCount,
                    tspinCount: gameData.tspinCount,
                    danRank: this.getCurrentDan(gameData.score).name,
                    gameMode: 'standard',
                    version: '2.1.0'
                };

                await this.dataManager.saveScore(onlineScoreData);
                console.log('オンラインスコア保存成功');
            } catch (error) {
                console.error('オンラインスコア保存エラー:', error);
            }
        }

        return isNewRecord;
    }

    // オンラインリーダーボードの取得
    async getOnlineLeaderboard(limit = 50) {
        if (!this.isOnline) {
            return { success: false, error: 'オフライン状態' };
        }

        try {
            const result = await this.dataManager.getLeaderboard(limit);
            
            if (result.success && this.callbacks.onLeaderboardUpdate) {
                this.callbacks.onLeaderboardUpdate(result.data);
            }
            
            return result;
        } catch (error) {
            console.error('オンラインリーダーボード取得エラー:', error);
            return { success: false, error: error.message };
        }
    }

    // リアルタイムリーダーボードの監視開始
    subscribeToOnlineLeaderboard(limit = 10) {
        if (!this.isOnline) {
            return null;
        }

        return this.dataManager.subscribeToLeaderboard((data) => {
            if (this.callbacks.onLeaderboardUpdate) {
                this.callbacks.onLeaderboardUpdate(data);
            }
        }, limit);
    }

    // リーダーボード監視の停止
    unsubscribeFromOnlineLeaderboard() {
        this.dataManager.unsubscribeFromLeaderboard();
    }

    // 実績保存（オンライン対応）
    async saveAchievement(achievementId, progress = 100) {
        if (this.isOnline && this.authManager.isAuthenticated()) {
            try {
                await this.dataManager.saveAchievement(achievementId, progress);
                console.log('オンライン実績保存成功:', achievementId);
            } catch (error) {
                console.error('オンライン実績保存エラー:', error);
            }
        }
    }

    // ユーザー統計の取得
    async getUserStats(userId = null) {
        if (!this.isOnline) {
            return this.scoreManager.getStatistics();
        }

        try {
            const result = await this.dataManager.getUserData(userId);
            
            if (result.success && result.data) {
                return result.data.statistics || this.scoreManager.getStatistics();
            }
            
            return this.scoreManager.getStatistics();
        } catch (error) {
            console.error('ユーザー統計取得エラー:', error);
            return this.scoreManager.getStatistics();
        }
    }

    // 段位取得（既存メソッドの委譲）
    getCurrentDan(score) {
        return this.scoreManager.getCurrentDan(score);
    }

    // 高スコア取得（既存メソッドの委譲）
    getHighScores(limit = 10) {
        return this.scoreManager.getHighScores(limit);
    }

    // 統計取得（既存メソッドの委譲）
    getStatistics() {
        return this.scoreManager.getStatistics();
    }

    // オンライン状態の確認
    getOnlineStatus() {
        return {
            isOnline: this.isOnline,
            isAuthenticated: this.authManager.isAuthenticated(),
            isAnonymous: this.authManager.isAnonymousUser(),
            userId: this.authManager.getUserId()
        };
    }

    // コールバック設定
    setCallback(event, callback) {
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event] = callback;
        }
    }

    // アカウントアップグレード後の処理
    async handleAccountUpgrade() {
        console.log('アカウントアップグレード後の同期開始');
        await this.syncLocalData();
    }

    // オフライン時の処理
    handleOfflineMode() {
        console.log('オフラインモードに切り替え');
        this.isOnline = false;
        this.dataManager.unsubscribeAll();
        
        if (this.callbacks.onOnlineStateChange) {
            this.callbacks.onOnlineStateChange(false);
        }
    }

    // クリーンアップ
    cleanup() {
        this.dataManager.unsubscribeAll();
    }
}

export default OnlineScoreManager;