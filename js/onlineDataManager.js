// Firebase Realtime Database管理
import { database } from './firebaseConfig.js';
import { 
    ref, 
    set, 
    get, 
    push, 
    update, 
    remove,
    onValue,
    off,
    serverTimestamp,
    query,
    orderByChild,
    limitToLast,
    limitToFirst
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

class OnlineDataManager {
    constructor(authManager) {
        this.authManager = authManager;
        this.listeners = new Map(); // アクティブなリスナーを管理
        
        // データベースパス定義
        this.paths = {
            users: 'users',
            scores: 'scores',
            leaderboard: 'leaderboard',
            achievements: 'achievements',
            stats: 'stats'
        };
    }

    // ユーザーデータの保存
    async saveUserData(userData) {
        const userId = this.authManager.getUserId();
        if (!userId) {
            throw new Error('ユーザーが認証されていません');
        }

        try {
            const userRef = ref(database, `${this.paths.users}/${userId}`);
            const saveData = {
                ...userData,
                lastUpdated: serverTimestamp(),
                uid: userId
            };

            await set(userRef, saveData);
            console.log('ユーザーデータ保存成功:', userId);
            return { success: true };
        } catch (error) {
            console.error('ユーザーデータ保存エラー:', error);
            throw error;
        }
    }

    // ユーザーデータの取得
    async getUserData(userId = null) {
        const targetUserId = userId || this.authManager.getUserId();
        if (!targetUserId) {
            throw new Error('ユーザーIDが指定されていません');
        }

        try {
            const userRef = ref(database, `${this.paths.users}/${targetUserId}`);
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
                return {
                    success: true,
                    data: snapshot.val()
                };
            } else {
                return {
                    success: true,
                    data: null
                };
            }
        } catch (error) {
            console.error('ユーザーデータ取得エラー:', error);
            throw error;
        }
    }

    // スコアの保存
    async saveScore(scoreData) {
        const userId = this.authManager.getUserId();
        if (!userId) {
            throw new Error('ユーザーが認証されていません');
        }

        try {
            // スコアデータの保存
            const scoresRef = ref(database, `${this.paths.scores}/${userId}`);
            const newScoreRef = push(scoresRef);
            
            const saveData = {
                ...scoreData,
                timestamp: serverTimestamp(),
                uid: userId
            };

            await set(newScoreRef, saveData);

            // リーダーボードの更新
            await this.updateLeaderboard(userId, scoreData);

            console.log('スコア保存成功:', scoreData.score);
            return { 
                success: true,
                scoreId: newScoreRef.key 
            };
        } catch (error) {
            console.error('スコア保存エラー:', error);
            throw error;
        }
    }

    // リーダーボードの更新
    async updateLeaderboard(userId, scoreData) {
        try {
            const leaderboardRef = ref(database, `${this.paths.leaderboard}/${userId}`);
            const currentData = await get(leaderboardRef);
            
            const userData = this.authManager.getCurrentUser();
            const displayName = userData.displayName || `Player${userId.slice(-4)}`;

            let updateData = {
                uid: userId,
                displayName: displayName,
                lastUpdated: serverTimestamp()
            };

            if (currentData.exists()) {
                const current = currentData.val();
                // 最高スコアの更新
                if (!current.highScore || scoreData.score > current.highScore) {
                    updateData.highScore = scoreData.score;
                    updateData.bestLevel = scoreData.level;
                    updateData.bestDan = scoreData.danRank;
                }
                
                // 統計の更新
                updateData.totalGames = (current.totalGames || 0) + 1;
                updateData.totalScore = (current.totalScore || 0) + scoreData.score;
                updateData.totalLines = (current.totalLines || 0) + scoreData.totalLines;
                updateData.totalTetris = (current.totalTetris || 0) + scoreData.tetrisCount;
                updateData.totalTSpin = (current.totalTSpin || 0) + scoreData.tspinCount;
            } else {
                // 初回データ
                updateData = {
                    ...updateData,
                    highScore: scoreData.score,
                    bestLevel: scoreData.level,
                    bestDan: scoreData.danRank,
                    totalGames: 1,
                    totalScore: scoreData.score,
                    totalLines: scoreData.totalLines,
                    totalTetris: scoreData.tetrisCount,
                    totalTSpin: scoreData.tspinCount
                };
            }

            await set(leaderboardRef, updateData);
            console.log('リーダーボード更新成功');
        } catch (error) {
            console.error('リーダーボード更新エラー:', error);
            throw error;
        }
    }

    // リーダーボードの取得
    async getLeaderboard(limit = 50, orderBy = 'highScore') {
        try {
            const leaderboardRef = ref(database, this.paths.leaderboard);
            const queryRef = query(
                leaderboardRef,
                orderByChild(orderBy),
                limitToLast(limit)
            );

            const snapshot = await get(queryRef);
            
            if (snapshot.exists()) {
                const data = snapshot.val();
                // スコア順で並び替え（降順）
                const sortedData = Object.values(data).sort((a, b) => {
                    return (b[orderBy] || 0) - (a[orderBy] || 0);
                });

                return {
                    success: true,
                    data: sortedData
                };
            } else {
                return {
                    success: true,
                    data: []
                };
            }
        } catch (error) {
            console.error('リーダーボード取得エラー:', error);
            throw error;
        }
    }

    // ユーザーのスコア履歴取得
    async getUserScores(userId = null, limit = 20) {
        const targetUserId = userId || this.authManager.getUserId();
        if (!targetUserId) {
            throw new Error('ユーザーIDが指定されていません');
        }

        try {
            const scoresRef = ref(database, `${this.paths.scores}/${targetUserId}`);
            const queryRef = query(
                scoresRef,
                orderByChild('timestamp'),
                limitToLast(limit)
            );

            const snapshot = await get(queryRef);
            
            if (snapshot.exists()) {
                const data = snapshot.val();
                const sortedScores = Object.entries(data)
                    .map(([key, value]) => ({ id: key, ...value }))
                    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

                return {
                    success: true,
                    data: sortedScores
                };
            } else {
                return {
                    success: true,
                    data: []
                };
            }
        } catch (error) {
            console.error('スコア履歴取得エラー:', error);
            throw error;
        }
    }

    // 実績の保存
    async saveAchievement(achievementId, progress = 100) {
        const userId = this.authManager.getUserId();
        if (!userId) {
            throw new Error('ユーザーが認証されていません');
        }

        try {
            const achievementRef = ref(database, `${this.paths.achievements}/${userId}/${achievementId}`);
            const achievementData = {
                achievementId: achievementId,
                progress: progress,
                unlockedAt: serverTimestamp(),
                uid: userId
            };

            await set(achievementRef, achievementData);
            console.log('実績保存成功:', achievementId);
            return { success: true };
        } catch (error) {
            console.error('実績保存エラー:', error);
            throw error;
        }
    }

    // 実績の取得
    async getUserAchievements(userId = null) {
        const targetUserId = userId || this.authManager.getUserId();
        if (!targetUserId) {
            throw new Error('ユーザーIDが指定されていません');
        }

        try {
            const achievementsRef = ref(database, `${this.paths.achievements}/${targetUserId}`);
            const snapshot = await get(achievementsRef);
            
            if (snapshot.exists()) {
                return {
                    success: true,
                    data: snapshot.val()
                };
            } else {
                return {
                    success: true,
                    data: {}
                };
            }
        } catch (error) {
            console.error('実績取得エラー:', error);
            throw error;
        }
    }

    // リアルタイムリスナーの設定
    subscribeToLeaderboard(callback, limit = 10) {
        const leaderboardRef = ref(database, this.paths.leaderboard);
        const queryRef = query(
            leaderboardRef,
            orderByChild('highScore'),
            limitToLast(limit)
        );

        const unsubscribe = onValue(queryRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const sortedData = Object.values(data).sort((a, b) => {
                    return (b.highScore || 0) - (a.highScore || 0);
                });
                callback(sortedData);
            } else {
                callback([]);
            }
        });

        this.listeners.set('leaderboard', unsubscribe);
        return unsubscribe;
    }

    // リスナーの削除
    unsubscribeFromLeaderboard() {
        if (this.listeners.has('leaderboard')) {
            const unsubscribe = this.listeners.get('leaderboard');
            unsubscribe();
            this.listeners.delete('leaderboard');
        }
    }

    // 全リスナーの削除
    unsubscribeAll() {
        this.listeners.forEach((unsubscribe) => {
            unsubscribe();
        });
        this.listeners.clear();
    }

    // データベース接続テスト
    async testConnection() {
        try {
            const testRef = ref(database, '.info/connected');
            const snapshot = await get(testRef);
            return snapshot.val() === true;
        } catch (error) {
            console.error('データベース接続テストエラー:', error);
            return false;
        }
    }

    // データの同期状態チェック
    async syncLocalData(localData) {
        const userId = this.authManager.getUserId();
        if (!userId) {
            console.log('ユーザーが認証されていないため、同期をスキップ');
            return { success: false, reason: 'not_authenticated' };
        }

        try {
            // オンラインデータの取得
            const onlineData = await this.getUserData();
            
            if (!onlineData.success || !onlineData.data) {
                // オンラインデータが存在しない場合、ローカルデータをアップロード
                await this.saveUserData(localData);
                console.log('ローカルデータをオンラインに同期');
                return { success: true, action: 'uploaded' };
            }

            // データの比較と同期処理
            const online = onlineData.data;
            const shouldUseOnline = online.lastUpdated && 
                (!localData.lastUpdated || online.lastUpdated > localData.lastUpdated);

            if (shouldUseOnline) {
                console.log('オンラインデータが新しいため、ローカルに同期');
                return { success: true, action: 'downloaded', data: online };
            } else {
                console.log('ローカルデータが新しいため、オンラインに同期');
                await this.saveUserData(localData);
                return { success: true, action: 'uploaded' };
            }
        } catch (error) {
            console.error('データ同期エラー:', error);
            return { success: false, error: error.message };
        }
    }
}

export default OnlineDataManager;