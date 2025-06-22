// Firebase設定とSDK初期化
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getAuth, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';
import { getDatabase, connectDatabaseEmulator } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

// Firebase設定（本番環境では環境変数から読み込み）
const firebaseConfig = {
    // 注意: これらの値は公開リポジトリでは環境変数として管理する
    apiKey: "YOUR_API_KEY",
    authDomain: "tetris-online-game.firebaseapp.com",
    databaseURL: "https://tetris-online-game-default-rtdb.firebaseio.com",
    projectId: "tetris-online-game",
    storageBucket: "tetris-online-game.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456789012"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// 認証とデータベースの初期化
export const auth = getAuth(app);
export const database = getDatabase(app);

// 開発環境でのエミュレーター接続（本番では無効化）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Firebase エミュレーターに接続中...');
    
    // 認証エミュレーター
    try {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    } catch (error) {
        console.log('Auth emulator already connected');
    }
    
    // データベースエミュレーター
    try {
        connectDatabaseEmulator(database, 'localhost', 9000);
    } catch (error) {
        console.log('Database emulator already connected');
    }
}

// Firebase接続状態の確認
export const isFirebaseConnected = () => {
    return app && auth && database;
};

// Firebase設定の確認
export const getFirebaseConfig = () => {
    return {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        databaseURL: firebaseConfig.databaseURL
    };
};

console.log('Firebase初期化完了:', getFirebaseConfig());