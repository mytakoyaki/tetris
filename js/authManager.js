// Firebase認証マネージャー
import { auth } from './firebaseConfig.js';
import { 
    signInAnonymously, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    linkWithCredential,
    EmailAuthProvider
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAnonymous = false;
        this.callbacks = {
            onAuthStateChange: null,
            onSignIn: null,
            onSignOut: null,
            onError: null
        };
        
        // 認証状態の変更を監視
        this.initAuthStateListener();
    }

    // 認証状態リスナーの初期化
    initAuthStateListener() {
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            this.isAnonymous = user ? user.isAnonymous : false;
            
            if (this.callbacks.onAuthStateChange) {
                this.callbacks.onAuthStateChange(user);
            }
            
            console.log('認証状態変更:', user ? 
                `${user.isAnonymous ? '匿名' : 'メール'}ユーザー: ${user.uid}` : 
                'ログアウト');
        });
    }

    // 匿名ログイン
    async signInAnonymously() {
        try {
            const result = await signInAnonymously(auth);
            console.log('匿名ログイン成功:', result.user.uid);
            
            if (this.callbacks.onSignIn) {
                this.callbacks.onSignIn(result.user);
            }
            
            return {
                success: true,
                user: result.user,
                isAnonymous: true
            };
        } catch (error) {
            console.error('匿名ログインエラー:', error);
            
            if (this.callbacks.onError) {
                this.callbacks.onError(error);
            }
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    // メールアドレスでアカウント作成
    async createAccount(email, password, displayName = '') {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            
            // 表示名を設定
            if (displayName) {
                await updateProfile(result.user, {
                    displayName: displayName
                });
            }
            
            console.log('アカウント作成成功:', result.user.uid);
            
            if (this.callbacks.onSignIn) {
                this.callbacks.onSignIn(result.user);
            }
            
            return {
                success: true,
                user: result.user,
                isAnonymous: false
            };
        } catch (error) {
            console.error('アカウント作成エラー:', error);
            
            if (this.callbacks.onError) {
                this.callbacks.onError(error);
            }
            
            return {
                success: false,
                error: this.getErrorMessage(error.code)
            };
        }
    }

    // メールアドレスでログイン
    async signInWithEmail(email, password) {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log('メールログイン成功:', result.user.uid);
            
            if (this.callbacks.onSignIn) {
                this.callbacks.onSignIn(result.user);
            }
            
            return {
                success: true,
                user: result.user,
                isAnonymous: false
            };
        } catch (error) {
            console.error('メールログインエラー:', error);
            
            if (this.callbacks.onError) {
                this.callbacks.onError(error);
            }
            
            return {
                success: false,
                error: this.getErrorMessage(error.code)
            };
        }
    }

    // 匿名アカウントをメールアカウントにアップグレード
    async upgradeAnonymousAccount(email, password, displayName = '') {
        if (!this.currentUser || !this.currentUser.isAnonymous) {
            return {
                success: false,
                error: '匿名ユーザーではありません'
            };
        }

        try {
            const credential = EmailAuthProvider.credential(email, password);
            const result = await linkWithCredential(this.currentUser, credential);
            
            // 表示名を設定
            if (displayName) {
                await updateProfile(result.user, {
                    displayName: displayName
                });
            }
            
            console.log('アカウントアップグレード成功:', result.user.uid);
            
            return {
                success: true,
                user: result.user,
                isAnonymous: false
            };
        } catch (error) {
            console.error('アカウントアップグレードエラー:', error);
            
            if (this.callbacks.onError) {
                this.callbacks.onError(error);
            }
            
            return {
                success: false,
                error: this.getErrorMessage(error.code)
            };
        }
    }

    // ログアウト
    async signOut() {
        try {
            await signOut(auth);
            console.log('ログアウト成功');
            
            if (this.callbacks.onSignOut) {
                this.callbacks.onSignOut();
            }
            
            return {
                success: true
            };
        } catch (error) {
            console.error('ログアウトエラー:', error);
            
            if (this.callbacks.onError) {
                this.callbacks.onError(error);
            }
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    // 現在のユーザー情報を取得
    getCurrentUser() {
        return {
            user: this.currentUser,
            isSignedIn: !!this.currentUser,
            isAnonymous: this.isAnonymous,
            uid: this.currentUser ? this.currentUser.uid : null,
            email: this.currentUser ? this.currentUser.email : null,
            displayName: this.currentUser ? this.currentUser.displayName : null
        };
    }

    // ユーザーIDを取得
    getUserId() {
        return this.currentUser ? this.currentUser.uid : null;
    }

    // 認証済みかチェック
    isAuthenticated() {
        return !!this.currentUser;
    }

    // 匿名ユーザーかチェック
    isAnonymousUser() {
        return this.isAnonymous;
    }

    // エラーメッセージを日本語に変換
    getErrorMessage(errorCode) {
        const errorMessages = {
            'auth/email-already-in-use': 'このメールアドレスは既に使用されています',
            'auth/invalid-email': 'メールアドレスの形式が正しくありません',
            'auth/operation-not-allowed': 'この操作は許可されていません',
            'auth/weak-password': 'パスワードが短すぎます（6文字以上）',
            'auth/user-disabled': 'このユーザーアカウントは無効化されています',
            'auth/user-not-found': 'ユーザーが見つかりません',
            'auth/wrong-password': 'パスワードが間違っています',
            'auth/too-many-requests': 'リクエストが多すぎます。しばらく待ってから再試行してください',
            'auth/network-request-failed': 'ネットワークエラーが発生しました',
            'auth/credential-already-in-use': 'この認証情報は既に別のアカウントで使用されています'
        };

        return errorMessages[errorCode] || 'エラーが発生しました';
    }

    // コールバック設定
    setCallback(event, callback) {
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event] = callback;
        }
    }

    // 初期化（ゲーム開始時に自動的に匿名ログイン）
    async initialize() {
        // 既にログインしている場合は何もしない
        if (this.currentUser) {
            return this.getCurrentUser();
        }

        // 匿名ログインを実行
        console.log('自動匿名ログインを実行中...');
        return await this.signInAnonymously();
    }
}

export default AuthManager;