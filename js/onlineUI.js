// オンライン機能用UI管理
class OnlineUI {
    constructor(uiManager, authManager, onlineScoreManager) {
        this.uiManager = uiManager;
        this.authManager = authManager;
        this.onlineScoreManager = onlineScoreManager;
        
        this.isOnlineMode = false;
        this.currentView = 'local'; // 'local', 'online', 'profile'
        
        this.initializeOnlineUI();
        this.setupEventListeners();
    }

    // オンラインUI要素の初期化
    initializeOnlineUI() {
        this.createOnlineStatusIndicator();
        this.createAuthPanel();
        this.createOnlineRankingPanel();
        this.createUserProfilePanel();
        this.addOnlineStyles();
    }

    // オンライン状態インジケーターの作成
    createOnlineStatusIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'onlineStatusIndicator';
        indicator.className = 'online-status-indicator offline';
        indicator.innerHTML = `
            <div class="status-icon">●</div>
            <div class="status-text">オフライン</div>
        `;
        
        // ゲーム画面の右上に配置
        const gameContainer = document.querySelector('.game-container') || document.body;
        gameContainer.appendChild(indicator);
    }

    // 認証パネルの作成
    createAuthPanel() {
        const panel = document.createElement('div');
        panel.id = 'authPanel';
        panel.className = 'auth-panel hidden';
        panel.innerHTML = `
            <div class="auth-container">
                <div class="auth-header">
                    <h3>オンライン機能</h3>
                    <button class="close-button" onclick="onlineUI.hideAuthPanel()">×</button>
                </div>
                
                <div class="auth-content">
                    <div class="auth-status">
                        <div class="user-info anonymous">
                            <div class="user-icon">👤</div>
                            <div class="user-details">
                                <div class="user-name">匿名ユーザー</div>
                                <div class="user-id"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="auth-actions">
                        <div class="anonymous-actions">
                            <button class="upgrade-btn primary-btn">アカウント作成</button>
                            <button class="signin-btn secondary-btn">ログイン</button>
                        </div>
                        
                        <div class="authenticated-actions hidden">
                            <button class="profile-btn primary-btn">プロフィール</button>
                            <button class="signout-btn secondary-btn">ログアウト</button>
                        </div>
                    </div>
                    
                    <div class="auth-form hidden">
                        <div class="form-tabs">
                            <button class="tab-btn active" data-tab="signup">アカウント作成</button>
                            <button class="tab-btn" data-tab="signin">ログイン</button>
                        </div>
                        
                        <form class="auth-form-content">
                            <div class="form-group">
                                <label>表示名</label>
                                <input type="text" id="displayName" placeholder="ゲーム内での表示名" maxlength="20">
                            </div>
                            
                            <div class="form-group">
                                <label>メールアドレス</label>
                                <input type="email" id="email" placeholder="example@example.com" required>
                            </div>
                            
                            <div class="form-group">
                                <label>パスワード</label>
                                <input type="password" id="password" placeholder="6文字以上" required minlength="6">
                            </div>
                            
                            <div class="form-actions">
                                <button type="submit" class="submit-btn primary-btn">実行</button>
                                <button type="button" class="cancel-btn secondary-btn">キャンセル</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="auth-benefits">
                        <h4>オンライン機能の特典</h4>
                        <ul>
                            <li>グローバルランキングに参加</li>
                            <li>スコアと実績の自動保存</li>
                            <li>複数デバイス間でのデータ同期</li>
                            <li>段位別ランキング表示</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
    }

    // オンラインランキングパネルの作成
    createOnlineRankingPanel() {
        const panel = document.createElement('div');
        panel.id = 'onlineRankingPanel';
        panel.className = 'online-ranking-panel hidden';
        panel.innerHTML = `
            <div class="ranking-container">
                <div class="ranking-header">
                    <h3>オンラインランキング</h3>
                    <div class="ranking-tabs">
                        <button class="tab-btn active" data-tab="global">全体</button>
                        <button class="tab-btn" data-tab="dan">段位別</button>
                    </div>
                    <button class="close-button" onclick="onlineUI.hideOnlineRanking()">×</button>
                </div>
                
                <div class="ranking-content">
                    <div class="ranking-list" id="globalRanking">
                        <div class="loading">ランキングを読み込み中...</div>
                    </div>
                    
                    <div class="ranking-list hidden" id="danRanking">
                        <div class="dan-selector">
                            <label>段位を選択:</label>
                            <select id="danSelect">
                                <option value="all">全段位</option>
                            </select>
                        </div>
                        <div class="dan-ranking-content">
                            <div class="loading">ランキングを読み込み中...</div>
                        </div>
                    </div>
                </div>
                
                <div class="ranking-footer">
                    <div class="update-info">
                        <span>最終更新: <span id="lastUpdateTime">-</span></span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
    }

    // ユーザープロフィールパネルの作成
    createUserProfilePanel() {
        const panel = document.createElement('div');
        panel.id = 'userProfilePanel';
        panel.className = 'user-profile-panel hidden';
        panel.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    <h3>プロフィール</h3>
                    <button class="close-button" onclick="onlineUI.hideUserProfile()">×</button>
                </div>
                
                <div class="profile-content">
                    <div class="profile-info">
                        <div class="profile-avatar">
                            <div class="avatar-icon">👤</div>
                        </div>
                        <div class="profile-details">
                            <div class="profile-name"></div>
                            <div class="profile-rank"></div>
                            <div class="profile-id"></div>
                        </div>
                    </div>
                    
                    <div class="profile-stats">
                        <h4>統計情報</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-value" id="profileHighScore">-</div>
                                <div class="stat-label">最高スコア</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value" id="profileTotalGames">-</div>
                                <div class="stat-label">総ゲーム数</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value" id="profileTotalLines">-</div>
                                <div class="stat-label">総ライン数</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value" id="profileBestDan">-</div>
                                <div class="stat-label">最高段位</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-recent">
                        <h4>最近のスコア</h4>
                        <div class="recent-scores" id="recentScores">
                            <div class="loading">読み込み中...</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // 認証関連
        document.querySelector('.upgrade-btn').addEventListener('click', () => {
            this.showAuthForm('signup');
        });
        
        document.querySelector('.signin-btn').addEventListener('click', () => {
            this.showAuthForm('signin');
        });
        
        document.querySelector('.signout-btn').addEventListener('click', () => {
            this.handleSignOut();
        });
        
        document.querySelector('.profile-btn').addEventListener('click', () => {
            this.showUserProfile();
        });
        
        // フォームタブ切り替え
        document.querySelectorAll('.auth-panel .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchAuthTab(tab);
            });
        });
        
        // フォーム送信
        document.querySelector('.auth-form-content').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuthFormSubmit();
        });
        
        document.querySelector('.cancel-btn').addEventListener('click', () => {
            this.hideAuthForm();
        });
        
        // ランキングタブ切り替え
        document.querySelectorAll('.ranking-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchRankingTab(tab);
            });
        });
        
        // 段位選択
        document.getElementById('danSelect').addEventListener('change', (e) => {
            this.loadDanRanking(e.target.value);
        });
    }

    // オンライン状態の更新
    updateOnlineStatus(isOnline, isAuthenticated = false) {
        const indicator = document.getElementById('onlineStatusIndicator');
        const statusIcon = indicator.querySelector('.status-icon');
        const statusText = indicator.querySelector('.status-text');
        
        if (isOnline) {
            indicator.className = 'online-status-indicator online';
            statusIcon.style.color = '#00ff88';
            statusText.textContent = isAuthenticated ? 'オンライン' : 'ゲスト';
        } else {
            indicator.className = 'online-status-indicator offline';
            statusIcon.style.color = '#ff6b6b';
            statusText.textContent = 'オフライン';
        }
        
        // クリックでオンライン機能パネルを表示
        indicator.onclick = () => {
            if (isOnline) {
                this.showAuthPanel();
            } else {
                this.uiManager.showMessage('オフライン状態です', 2000, 'error-message');
            }
        };
    }

    // 認証状態の更新
    updateAuthStatus(user) {
        const userInfo = document.querySelector('.auth-status .user-info');
        const userName = userInfo.querySelector('.user-name');
        const userId = userInfo.querySelector('.user-id');
        const anonymousActions = document.querySelector('.anonymous-actions');
        const authenticatedActions = document.querySelector('.authenticated-actions');
        
        if (user) {
            if (user.isAnonymous) {
                userInfo.className = 'user-info anonymous';
                userName.textContent = '匿名ユーザー';
                userId.textContent = `ID: ${user.uid.slice(-8)}`;
                anonymousActions.classList.remove('hidden');
                authenticatedActions.classList.add('hidden');
            } else {
                userInfo.className = 'user-info authenticated';
                userName.textContent = user.displayName || user.email;
                userId.textContent = user.email;
                anonymousActions.classList.add('hidden');
                authenticatedActions.classList.remove('hidden');
            }
        } else {
            userInfo.className = 'user-info offline';
            userName.textContent = 'オフライン';
            userId.textContent = '';
            anonymousActions.classList.add('hidden');
            authenticatedActions.classList.add('hidden');
        }
    }

    // 認証パネル表示
    showAuthPanel() {
        document.getElementById('authPanel').classList.remove('hidden');
        this.updateAuthStatus(this.authManager.getCurrentUser().user);
    }

    // 認証パネル非表示
    hideAuthPanel() {
        document.getElementById('authPanel').classList.add('hidden');
        this.hideAuthForm();
    }

    // 認証フォーム表示
    showAuthForm(mode) {
        const form = document.querySelector('.auth-form');
        const displayNameGroup = document.querySelector('#displayName').parentElement;
        const submitBtn = document.querySelector('.submit-btn');
        
        form.classList.remove('hidden');
        
        if (mode === 'signup') {
            displayNameGroup.style.display = 'block';
            submitBtn.textContent = 'アカウント作成';
        } else {
            displayNameGroup.style.display = 'none';
            submitBtn.textContent = 'ログイン';
        }
        
        this.switchAuthTab(mode);
    }

    // 認証フォーム非表示
    hideAuthForm() {
        document.querySelector('.auth-form').classList.add('hidden');
        this.clearAuthForm();
    }

    // 認証タブ切り替え
    switchAuthTab(tab) {
        document.querySelectorAll('.auth-panel .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        const displayNameGroup = document.querySelector('#displayName').parentElement;
        const submitBtn = document.querySelector('.submit-btn');
        
        if (tab === 'signup') {
            displayNameGroup.style.display = 'block';
            submitBtn.textContent = 'アカウント作成';
        } else {
            displayNameGroup.style.display = 'none';
            submitBtn.textContent = 'ログイン';
        }
    }

    // 認証フォーム送信処理
    async handleAuthFormSubmit() {
        const activeTab = document.querySelector('.auth-panel .tab-btn.active').dataset.tab;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const displayName = document.getElementById('displayName').value;
        
        if (!email || !password) {
            this.uiManager.showMessage('メールアドレスとパスワードを入力してください', 2000, 'error-message');
            return;
        }
        
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = '処理中...';
        
        try {
            let result;
            
            if (activeTab === 'signup') {
                if (this.authManager.isAnonymousUser()) {
                    // 匿名アカウントのアップグレード
                    result = await this.authManager.upgradeAnonymousAccount(email, password, displayName);
                } else {
                    // 新規アカウント作成
                    result = await this.authManager.createAccount(email, password, displayName);
                }
            } else {
                // ログイン
                result = await this.authManager.signInWithEmail(email, password);
            }
            
            if (result.success) {
                this.uiManager.showMessage(
                    activeTab === 'signup' ? 'アカウントが作成されました' : 'ログインしました',
                    2000, 'exchange-message'
                );
                this.hideAuthForm();
                
                // アカウントアップグレード後の処理
                if (activeTab === 'signup' && this.onlineScoreManager) {
                    await this.onlineScoreManager.handleAccountUpgrade();
                }
            } else {
                this.uiManager.showMessage(result.error, 3000, 'error-message');
            }
        } catch (error) {
            this.uiManager.showMessage('エラーが発生しました', 2000, 'error-message');
            console.error('認証エラー:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = activeTab === 'signup' ? 'アカウント作成' : 'ログイン';
        }
    }

    // サインアウト処理
    async handleSignOut() {
        try {
            const result = await this.authManager.signOut();
            if (result.success) {
                this.uiManager.showMessage('ログアウトしました', 2000, 'exchange-message');
                this.hideAuthPanel();
            }
        } catch (error) {
            this.uiManager.showMessage('ログアウトに失敗しました', 2000, 'error-message');
            console.error('サインアウトエラー:', error);
        }
    }

    // 認証フォームクリア
    clearAuthForm() {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('displayName').value = '';
    }

    // オンラインランキング表示
    async showOnlineRanking() {
        const panel = document.getElementById('onlineRankingPanel');
        panel.classList.remove('hidden');
        
        // グローバルランキングを読み込み
        await this.loadGlobalRanking();
    }

    // オンラインランキング非表示
    hideOnlineRanking() {
        document.getElementById('onlineRankingPanel').classList.add('hidden');
    }

    // ランキングタブ切り替え
    switchRankingTab(tab) {
        document.querySelectorAll('.ranking-tabs .tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        document.getElementById('globalRanking').classList.toggle('hidden', tab !== 'global');
        document.getElementById('danRanking').classList.toggle('hidden', tab !== 'dan');
        
        if (tab === 'dan') {
            this.loadDanSelector();
        }
    }

    // グローバルランキング読み込み
    async loadGlobalRanking() {
        const container = document.querySelector('#globalRanking');
        container.innerHTML = '<div class="loading">ランキングを読み込み中...</div>';
        
        try {
            const result = await this.onlineScoreManager.getOnlineLeaderboard(50);
            
            if (result.success && result.data.length > 0) {
                container.innerHTML = this.renderRankingList(result.data);
                document.getElementById('lastUpdateTime').textContent = new Date().toLocaleString();
            } else {
                container.innerHTML = '<div class="no-data">ランキングデータがありません</div>';
            }
        } catch (error) {
            container.innerHTML = '<div class="error">ランキングの読み込みに失敗しました</div>';
            console.error('ランキング読み込みエラー:', error);
        }
    }

    // ランキングリストのレンダリング
    renderRankingList(data) {
        return data.map((player, index) => `
            <div class="ranking-item ${index < 3 ? 'top-rank' : ''}">
                <div class="rank">${index + 1}</div>
                <div class="player-info">
                    <div class="player-name">${player.displayName || 'Anonymous'}</div>
                    <div class="player-details">
                        <span class="score">${player.highScore?.toLocaleString() || 0}</span>
                        <span class="dan">${player.bestDan || '無段'}</span>
                        <span class="games">${player.totalGames || 0}ゲーム</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ユーザープロフィール表示
    async showUserProfile() {
        const panel = document.getElementById('userProfilePanel');
        panel.classList.remove('hidden');
        
        await this.loadUserProfile();
    }

    // ユーザープロフィール非表示
    hideUserProfile() {
        document.getElementById('userProfilePanel').classList.add('hidden');
    }

    // ユーザープロフィール読み込み
    async loadUserProfile() {
        const user = this.authManager.getCurrentUser();
        
        if (!user.isSignedIn) {
            this.hideUserProfile();
            return;
        }
        
        // プロフィール情報の更新
        document.querySelector('.profile-name').textContent = user.displayName || user.email || '匿名ユーザー';
        document.querySelector('.profile-id').textContent = user.email || `ID: ${user.uid?.slice(-8)}`;
        
        try {
            const stats = await this.onlineScoreManager.getUserStats();
            
            // 統計情報の更新
            document.getElementById('profileHighScore').textContent = stats.highScore?.toLocaleString() || '0';
            document.getElementById('profileTotalGames').textContent = stats.totalGames || '0';
            document.getElementById('profileTotalLines').textContent = stats.totalLines || '0';
            document.getElementById('profileBestDan').textContent = stats.bestDan || '無段';
            
            // 最高段位の表示
            const currentDan = this.onlineScoreManager.getCurrentDan(stats.highScore || 0);
            document.querySelector('.profile-rank').textContent = currentDan.name;
            document.querySelector('.profile-rank').style.color = currentDan.color;
            
        } catch (error) {
            console.error('プロフィール読み込みエラー:', error);
        }
    }

    // オンラインスタイルの追加
    addOnlineStyles() {
        if (document.getElementById('onlineStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'onlineStyles';
        style.textContent = `
            /* オンライン状態インジケーター */
            .online-status-indicator {
                position: fixed;
                top: 20px;
                right: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                background: var(--glass-bg);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 1000;
                font-size: 0.9em;
            }
            
            .online-status-indicator:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            
            .status-icon {
                font-size: 1.2em;
                transition: color 0.3s ease;
            }
            
            .status-text {
                color: var(--text-primary);
                font-weight: 600;
            }
            
            /* 認証パネル */
            .auth-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            
            .auth-container {
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 0;
                width: 90%;
                max-width: 480px;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .auth-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .auth-header h3 {
                margin: 0;
                color: var(--text-primary);
                font-size: 1.4em;
            }
            
            .close-button {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.8em;
                cursor: pointer;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                transition: all 0.2s ease;
            }
            
            .close-button:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary);
            }
            
            .auth-content {
                padding: 24px;
            }
            
            .user-info {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                margin-bottom: 20px;
            }
            
            .user-icon {
                font-size: 2em;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--accent-green);
                border-radius: 50%;
            }
            
            .user-info.anonymous .user-icon {
                background: var(--text-secondary);
            }
            
            .user-details {
                flex: 1;
            }
            
            .user-name {
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 4px;
            }
            
            .user-id {
                font-size: 0.85em;
                color: var(--text-secondary);
                font-family: 'Consolas', monospace;
            }
            
            .auth-actions {
                margin-bottom: 24px;
            }
            
            .primary-btn, .secondary-btn {
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                border: none;
                margin: 0 8px 8px 0;
            }
            
            .primary-btn {
                background: var(--accent-green);
                color: var(--primary-dark);
            }
            
            .primary-btn:hover {
                background: #00cc70;
                transform: translateY(-1px);
            }
            
            .secondary-btn {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .secondary-btn:hover {
                background: rgba(255, 255, 255, 0.15);
            }
            
            /* フォーム関連 */
            .form-tabs {
                display: flex;
                margin-bottom: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .tab-btn {
                flex: 1;
                padding: 12px;
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                border-bottom: 2px solid transparent;
                transition: all 0.2s ease;
            }
            
            .tab-btn.active {
                color: var(--accent-green);
                border-bottom-color: var(--accent-green);
            }
            
            .form-group {
                margin-bottom: 16px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 6px;
                color: var(--text-primary);
                font-weight: 600;
                font-size: 0.9em;
            }
            
            .form-group input {
                width: 100%;
                padding: 12px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                color: var(--text-primary);
                font-size: 1em;
                transition: border-color 0.2s ease;
            }
            
            .form-group input:focus {
                outline: none;
                border-color: var(--accent-green);
            }
            
            .form-actions {
                display: flex;
                gap: 12px;
                margin-top: 24px;
            }
            
            .submit-btn {
                flex: 1;
            }
            
            .auth-benefits {
                margin-top: 24px;
                padding-top: 24px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .auth-benefits h4 {
                margin: 0 0 12px 0;
                color: var(--text-primary);
            }
            
            .auth-benefits ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .auth-benefits li {
                padding: 6px 0;
                color: var(--text-secondary);
                position: relative;
                padding-left: 20px;
            }
            
            .auth-benefits li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--accent-green);
                font-weight: bold;
            }
            
            /* ランキングパネル */
            .online-ranking-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            
            .ranking-container {
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
            }
            
            .ranking-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .ranking-tabs {
                display: flex;
                gap: 8px;
            }
            
            .ranking-content {
                flex: 1;
                overflow-y: auto;
                padding: 20px 24px;
            }
            
            .ranking-item {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 12px;
                margin-bottom: 8px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                transition: background 0.2s ease;
            }
            
            .ranking-item:hover {
                background: rgba(255, 255, 255, 0.08);
            }
            
            .ranking-item.top-rank {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.05));
                border: 1px solid rgba(255, 215, 0, 0.3);
            }
            
            .rank {
                font-size: 1.2em;
                font-weight: 700;
                color: var(--accent-green);
                min-width: 32px;
                text-align: center;
            }
            
            .top-rank .rank {
                color: #ffd700;
            }
            
            .player-info {
                flex: 1;
            }
            
            .player-name {
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 4px;
            }
            
            .player-details {
                display: flex;
                gap: 16px;
                font-size: 0.85em;
                color: var(--text-secondary);
            }
            
            .score {
                font-family: 'Consolas', monospace;
                font-weight: 600;
                color: var(--accent-green);
            }
            
            /* 段位ランキング専用スタイル */
            .dan-ranking-header {
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .dan-ranking-header h4 {
                margin: 0 0 8px 0;
                color: var(--text-primary);
                font-size: 1.2em;
            }
            
            .ranking-count {
                font-size: 0.9em;
                color: var(--text-secondary);
            }
            
            .dan-selector {
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .dan-selector label {
                color: var(--text-primary);
                font-weight: 600;
            }
            
            .dan-selector select {
                padding: 8px 12px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                color: var(--text-primary);
                font-size: 0.9em;
            }
            
            .avg-score {
                font-size: 0.8em;
                color: var(--text-secondary);
            }
            
            /* その他のユーティリティクラス */
            .hidden {
                display: none !important;
            }
            
            .loading, .no-data, .error {
                text-align: center;
                padding: 40px 20px;
                color: var(--text-secondary);
                font-style: italic;
            }
            
            .error {
                color: #ff6b6b;
            }
        `;
        
        document.head.appendChild(style);
    }

    // 段位選択の設定
    loadDanSelector() {
        const danSelect = document.getElementById('danSelect');
        danSelect.innerHTML = '<option value="all">全段位</option>';
        
        // 段位データを追加
        const danRanks = [
            '無段', '初段', '二段', '三段', '四段', '五段', '六段', '七段',
            '八段', '九段', '十段', '名人', '竜王', '永世名人'
        ];
        
        danRanks.forEach(dan => {
            const option = document.createElement('option');
            option.value = dan;
            option.textContent = dan;
            danSelect.appendChild(option);
        });
        
        // 初期読み込み
        this.loadDanRanking('all');
    }

    // 段位別ランキング読み込み
    async loadDanRanking(selectedDan) {
        const container = document.querySelector('#danRanking .dan-ranking-content');
        container.innerHTML = '<div class="loading">ランキングを読み込み中...</div>';
        
        try {
            const result = await this.onlineScoreManager.getOnlineLeaderboard(100);
            
            if (result.success && result.data.length > 0) {
                let filteredData = result.data;
                
                // 段位でフィルタリング
                if (selectedDan !== 'all') {
                    filteredData = result.data.filter(player => 
                        player.bestDan === selectedDan
                    );
                }
                
                if (filteredData.length > 0) {
                    container.innerHTML = this.renderDanRankingList(filteredData, selectedDan);
                } else {
                    container.innerHTML = `<div class="no-data">${selectedDan === 'all' ? 'ランキングデータがありません' : `${selectedDan}のプレイヤーが見つかりません`}</div>`;
                }
                
                document.getElementById('lastUpdateTime').textContent = new Date().toLocaleString();
            } else {
                container.innerHTML = '<div class="no-data">ランキングデータがありません</div>';
            }
        } catch (error) {
            container.innerHTML = '<div class="error">ランキングの読み込みに失敗しました</div>';
            console.error('段位別ランキング読み込みエラー:', error);
        }
    }

    // 段位別ランキングリストのレンダリング
    renderDanRankingList(data, selectedDan) {
        const title = selectedDan === 'all' ? '全段位ランキング' : `${selectedDan} ランキング`;
        
        const listHtml = data.map((player, index) => `
            <div class="ranking-item ${index < 3 ? 'top-rank' : ''}">
                <div class="rank">${index + 1}</div>
                <div class="player-info">
                    <div class="player-name">${player.displayName || 'Anonymous'}</div>
                    <div class="player-details">
                        <span class="score">${player.highScore?.toLocaleString() || 0}</span>
                        <span class="dan">${player.bestDan || '無段'}</span>
                        <span class="games">${player.totalGames || 0}ゲーム</span>
                        <span class="avg-score">平均: ${Math.floor((player.totalScore || 0) / Math.max(1, player.totalGames || 1)).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        return `
            <div class="dan-ranking-header">
                <h4>${title}</h4>
                <div class="ranking-count">${data.length}人のプレイヤー</div>
            </div>
            ${listHtml}
        `;
    }
}

// グローバルアクセス用
window.onlineUI = null;

export default OnlineUI;