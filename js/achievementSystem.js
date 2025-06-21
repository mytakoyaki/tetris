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
        name: '数字マニア',
        description: '100点に到達しました',
        icon: '🎯',
        category: 'score',
        condition: { type: 'score', value: 100 },
        points: 5,
        unlocked: false
    },
    score_500: {
        id: 'score_500',
        name: 'スコア初心者',
        description: '500点に到達しました',
        icon: '⭐',
        category: 'score',
        condition: { type: 'score', value: 500 },
        points: 10,
        unlocked: false
    },
    score_1000: {
        id: 'score_1000',
        name: 'スコアハンター',
        description: '1000点に到達しました',
        icon: '💫',
        category: 'score',
        condition: { type: 'score', value: 1000 },
        points: 20,
        unlocked: false
    },
    score_2000: {
        id: 'score_2000',
        name: 'スコアコレクター',
        description: '2000点に到達しました',
        icon: '🎊',
        category: 'score',
        condition: { type: 'score', value: 2000 },
        points: 25,
        unlocked: false
    },
    score_3000: {
        id: 'score_3000',
        name: 'スコアマスター',
        description: '3000点に到達しました',
        icon: '🎉',
        category: 'score',
        condition: { type: 'score', value: 3000 },
        points: 30,
        unlocked: false
    },
    score_4000: {
        id: 'score_4000',
        name: 'スコアエキスパート',
        description: '4000点に到達しました',
        icon: '✨',
        category: 'score',
        condition: { type: 'score', value: 4000 },
        points: 35,
        unlocked: false
    },
    score_5000: {
        id: 'score_5000',
        name: 'スコアウィザード',
        description: '5000点に到達しました',
        icon: '🌟',
        category: 'score',
        condition: { type: 'score', value: 5000 },
        points: 40,
        unlocked: false
    },
    score_6000: {
        id: 'score_6000',
        name: 'スコアソーサラー',
        description: '6000点に到達しました',
        icon: '💫',
        category: 'score',
        condition: { type: 'score', value: 6000 },
        points: 45,
        unlocked: false
    },
    score_7000: {
        id: 'score_7000',
        name: 'スコアネクロマンサー',
        description: '7000点に到達しました',
        icon: '🌠',
        category: 'score',
        condition: { type: 'score', value: 7000 },
        points: 50,
        unlocked: false
    },
    score_8000: {
        id: 'score_8000',
        name: 'スコアアーキメイジ',
        description: '8000点に到達しました',
        icon: '⭐',
        category: 'score',
        condition: { type: 'score', value: 8000 },
        points: 55,
        unlocked: false
    },
    score_9000: {
        id: 'score_9000',
        name: 'スコアオーバーロード',
        description: '9000点に到達しました',
        icon: '🔥',
        category: 'score',
        condition: { type: 'score', value: 9000 },
        points: 60,
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
        points: 20,
        unlocked: false
    },
    dan_nidan: {
        id: 'dan_nidan',
        name: '二段位獲得',
        description: '二段に昇格しました',
        icon: '🥋',
        category: 'rank',
        condition: { type: 'dan_rank', value: '二段' },
        points: 30,
        unlocked: false
    },
    dan_sandan: {
        id: 'dan_sandan',
        name: '三段位獲得',
        description: '三段に昇格しました',
        icon: '🏅',
        category: 'rank',
        condition: { type: 'dan_rank', value: '三段' },
        points: 50,
        unlocked: false
    },
    dan_yondan: {
        id: 'dan_yondan',
        name: '四段位獲得',
        description: '四段に昇格しました',
        icon: '🎖️',
        category: 'rank',
        condition: { type: 'dan_rank', value: '四段' },
        points: 80,
        unlocked: false
    },
    dan_godan: {
        id: 'dan_godan',
        name: '五段位獲得',
        description: '五段に昇格しました',
        icon: '🏆',
        category: 'rank',
        condition: { type: 'dan_rank', value: '五段' },
        points: 100,
        unlocked: false
    },
    dan_rokudan: {
        id: 'dan_rokudan',
        name: '六段位獲得',
        description: '六段に昇格しました',
        icon: '🏆',
        category: 'rank',
        condition: { type: 'dan_rank', value: '六段' },
        points: 120,
        unlocked: false
    },
    dan_shichidan: {
        id: 'dan_shichidan',
        name: '七段位獲得',
        description: '七段に昇格しました',
        icon: '👑',
        category: 'rank',
        condition: { type: 'dan_rank', value: '七段' },
        points: 150,
        unlocked: false
    },
    dan_hachidan: {
        id: 'dan_hachidan',
        name: '八段位獲得',
        description: '八段に昇格しました',
        icon: '👑',
        category: 'rank',
        condition: { type: 'dan_rank', value: '八段' },
        points: 200,
        unlocked: false
    },
    dan_kyudan: {
        id: 'dan_kyudan',
        name: '九段位獲得',
        description: '九段に昇格しました',
        icon: '🌟',
        category: 'rank',
        condition: { type: 'dan_rank', value: '九段' },
        points: 250,
        unlocked: false
    },
    dan_judan: {
        id: 'dan_judan',
        name: '十段位獲得',
        description: '十段に昇格しました',
        icon: '🌟',
        category: 'rank',
        condition: { type: 'dan_rank', value: '十段' },
        points: 280,
        unlocked: false
    },
    dan_meijin: {
        id: 'dan_meijin',
        name: '名人位獲得',
        description: '名人に昇格しました',
        icon: '🌟',
        category: 'rank',
        condition: { type: 'dan_rank', value: '名人' },
        points: 300,
        unlocked: false
    },
    dan_ryuuou: {
        id: 'dan_ryuuou',
        name: '竜王位獲得',
        description: '竜王に昇格しました',
        icon: '🐉',
        category: 'rank',
        condition: { type: 'dan_rank', value: '竜王' },
        points: 500,
        unlocked: false
    },
    dan_eisei: {
        id: 'dan_eisei',
        name: '永世名人位獲得',
        description: '永世名人に昇格しました（最高位！）',
        icon: '👑',
        category: 'rank',
        condition: { type: 'dan_rank', value: '永世名人' },
        points: 1000,
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
    },
    // ネタ実績
    tetris_master: {
        id: 'tetris_master',
        name: 'テトリスマスター',
        description: 'テトリス（4ライン同時消去）を10回達成',
        icon: '🏆',
        category: 'fun',
        condition: { type: 'tetris', value: 10 },
        points: 77,
        unlocked: false
    },
    combo_artist: {
        id: 'combo_artist',
        name: 'コンボアーティスト',
        description: '7コンボ以上を達成しました',
        icon: '🎨',
        category: 'fun',
        condition: { type: 'max_combo', value: 7 },
        points: 44,
        unlocked: false
    },
    tspin_wizard: {
        id: 'tspin_wizard',
        name: 'T-Spin魔法使い',
        description: 'T-Spinを5回以上決めました',
        icon: '🧙',
        category: 'fun',
        condition: { type: 'tspin', value: 5 },
        points: 56,
        unlocked: false
    },
    line_destroyer: {
        id: 'line_destroyer',
        name: 'ライン破壊王',
        description: '50ライン以上消去しました',
        icon: '💥',
        category: 'basic',
        condition: { type: 'lines_cleared', value: 50 },
        points: 30,
        unlocked: false
    },
    line_veteran: {
        id: 'line_veteran',
        name: 'ライン除去ベテラン',
        description: '25ライン消去達成',
        icon: '🛡️',
        category: 'basic',
        condition: { type: 'lines_cleared', value: 25 },
        points: 20,
        unlocked: false
    },
    line_apprentice: {
        id: 'line_apprentice', 
        name: 'ライン除去見習い',
        description: '10ライン消去達成',
        icon: '🔰',
        category: 'basic',
        condition: { type: 'lines_cleared', value: 10 },
        points: 15,
        unlocked: false
    },
    speed_runner: {
        id: 'speed_runner',
        name: 'スピードランナー',
        description: '3分以内に1000点達成',
        icon: '🏃',
        category: 'fun',
        condition: { type: 'speed_score', score: 1000, time: 180000 },
        points: 69,
        unlocked: false
    },
    level_climber: {
        id: 'level_climber',
        name: 'レベルクライマー',
        description: 'レベル20に到達しました',
        icon: '🧗',
        category: 'fun',
        condition: { type: 'level', value: 20 },
        points: 130,
        unlocked: false
    },
    perfect_cleaner: {
        id: 'perfect_cleaner',
        name: 'パーフェクトクリーナー',
        description: 'パーフェクトクリアを3回達成',
        icon: '✨',
        category: 'fun',
        condition: { type: 'perfect_clear', value: 3 },
        points: 66,
        unlocked: false
    },
    block_builder: {
        id: 'block_builder',
        name: 'ブロック建築家',
        description: '500個以上のブロックを配置しました',
        icon: '🏗️',
        category: 'fun',
        condition: { type: 'blocks_placed', value: 500 },
        points: 39,
        unlocked: false
    },
    over_9000: {
        id: 'over_9000',
        name: 'IT\'S OVER 9000!',
        description: '9000点を超えました',
        icon: '💪',
        category: 'fun',
        condition: { type: 'score', value: 9001 },
        points: 90,
        unlocked: false
    },
    exchange_enthusiast: {
        id: 'exchange_enthusiast',
        name: '交換愛好家',
        description: '100回以上ブロック交換しました',
        icon: '🤓',
        category: 'fun',
        condition: { type: 'exchange_count', value: 100 },
        points: 133,
        unlocked: false
    },
    hold_master: {
        id: 'hold_master',
        name: 'ホールドマスター',
        description: '50回以上ホールドしました',
        icon: '🍕',
        category: 'fun',
        condition: { type: 'hold_count', value: 50 },
        points: 31,
        unlocked: false
    },
    marathon_player: {
        id: 'marathon_player',
        name: 'マラソンプレイヤー',
        description: '10分以上プレイしました',
        icon: '💻',
        category: 'fun',
        condition: { type: 'play_time', value: 600000 },
        points: 102,
        unlocked: false
    },
    fever_lover: {
        id: 'fever_lover',
        name: 'フィーバー愛好家',
        description: '20回以上フィーバーしました',
        icon: '🚫',
        category: 'fun',
        condition: { type: 'fever_count', value: 20 },
        points: 40,
        unlocked: false
    },
    dan_challenger: {
        id: 'dan_challenger',
        name: '段位挑戦者',
        description: '五段以上に到達しました',
        icon: '🌡️',
        category: 'fun',
        condition: { type: 'dan_rank', value: '五段' },
        points: 100,
        unlocked: false
    },
    combo_king: {
        id: 'combo_king',
        name: 'コンボキング',
        description: '10コンボ以上達成（すごい！）',
        icon: '👑',
        category: 'fun',
        condition: { type: 'max_combo', value: 10 },
        points: 100,
        unlocked: false
    },
    super_scorer: {
        id: 'super_scorer',
        name: 'スーパースコアラー',
        description: '8000点以上獲得しました',
        icon: '📞',
        category: 'fun',
        condition: { type: 'score', value: 8000 },
        points: 80,
        unlocked: false
    },
    high_achiever: {
        id: 'high_achiever',
        name: '高得点達成者',
        description: '1600点以上獲得しました',
        icon: '🏛️',
        category: 'fun',
        condition: { type: 'score', value: 1600 },
        points: 161,
        unlocked: false
    },
    line_machine: {
        id: 'line_machine',
        name: 'ライン製造機',
        description: '200ライン以上消去しました',
        icon: '😈',
        category: 'fun',
        condition: { type: 'lines_cleared', value: 200 },
        points: 66,
        unlocked: false
    },
    quick_player: {
        id: 'quick_player',
        name: 'クイックプレイヤー',
        description: '30秒以内にゲームオーバーしました',
        icon: '😭',
        category: 'fun',
        condition: { type: 'quick_death', time: 30000 },
        points: 5,
        unlocked: false
    },
    // 隠し段位アチーブメント
    dan_tentei: {
        id: 'dan_tentei',
        name: '天帝位発見',
        description: '隠し段位「天帝」を発見しました',
        icon: '🌟',
        category: 'rank',
        condition: { type: 'dan_rank', value: '天帝' },
        points: 1500,
        unlocked: false,
        hidden: true
    },
    dan_shin_i: {
        id: 'dan_shin_i',
        name: '神威位発見',
        description: '隠し段位「神威」を発見しました',
        icon: '⭐',
        category: 'rank',
        condition: { type: 'dan_rank', value: '神威' },
        points: 3000,
        unlocked: false,
        hidden: true
    },
    dan_sousei: {
        id: 'dan_sousei',
        name: '創世位発見',
        description: '隠し段位「創世」を発見しました（究極の段位！）',
        icon: '✨',
        category: 'rank',
        condition: { type: 'dan_rank', value: '創世' },
        points: 5000,
        unlocked: false,
        hidden: true
    },
    score_milestone_10k: {
        id: 'score_milestone_10k',
        name: '1万点突破',
        description: '10000点以上獲得しました',
        icon: '💯',
        category: 'score',
        condition: { type: 'score', value: 10000 },
        points: 65,
        unlocked: false
    },
    score_12k: {
        id: 'score_12k',
        name: '12000点到達',
        description: '12000点に到達しました',
        icon: '🎯',
        category: 'score',
        condition: { type: 'score', value: 12000 },
        points: 70,
        unlocked: false
    },
    score_15k: {
        id: 'score_15k',
        name: '15000点到達',
        description: '15000点に到達しました',
        icon: '🏆',
        category: 'score',
        condition: { type: 'score', value: 15000 },
        points: 75,
        unlocked: false
    },
    score_18k: {
        id: 'score_18k',
        name: '18000点到達',
        description: '18000点に到達しました',
        icon: '🎖️',
        category: 'score',
        condition: { type: 'score', value: 18000 },
        points: 80,
        unlocked: false
    },
    score_milestone_20k: {
        id: 'score_milestone_20k',
        name: '2万点の壁',
        description: '20000点以上獲得しました',
        icon: '🎊',
        category: 'score',
        condition: { type: 'score', value: 20000 },
        points: 85,
        unlocked: false
    },
    score_25k: {
        id: 'score_25k',
        name: '25000点到達',
        description: '25000点に到達しました',
        icon: '🥇',
        category: 'score',
        condition: { type: 'score', value: 25000 },
        points: 90,
        unlocked: false
    },
    score_30k: {
        id: 'score_30k',
        name: '30000点到達',
        description: '30000点に到達しました',
        icon: '👑',
        category: 'score',
        condition: { type: 'score', value: 30000 },
        points: 95,
        unlocked: false
    },
    score_35k: {
        id: 'score_35k',
        name: '35000点到達',
        description: '35000点に到達しました',
        icon: '💎',
        category: 'score',
        condition: { type: 'score', value: 35000 },
        points: 100,
        unlocked: false
    },
    score_40k: {
        id: 'score_40k',
        name: '40000点到達',
        description: '40000点に到達しました',
        icon: '🌟',
        category: 'score',
        condition: { type: 'score', value: 40000 },
        points: 105,
        unlocked: false
    },
    score_45k: {
        id: 'score_45k',
        name: '45000点到達',
        description: '45000点に到達しました',
        icon: '✨',
        category: 'score',
        condition: { type: 'score', value: 45000 },
        points: 110,
        unlocked: false
    },
    score_milestone_50k: {
        id: 'score_milestone_50k',
        name: '5万点の境地',
        description: '50000点以上獲得しました',
        icon: '⭐',
        category: 'score',
        condition: { type: 'score', value: 50000 },
        points: 115,
        unlocked: false
    },
    score_60k: {
        id: 'score_60k',
        name: '60000点到達',
        description: '60000点に到達しました',
        icon: '🎆',
        category: 'score',
        condition: { type: 'score', value: 60000 },
        points: 120,
        unlocked: false
    },
    score_70k: {
        id: 'score_70k',
        name: '70000点到達',
        description: '70000点に到達しました',
        icon: '🎇',
        category: 'score',
        condition: { type: 'score', value: 70000 },
        points: 125,
        unlocked: false
    },
    score_80k: {
        id: 'score_80k',
        name: '80000点到達',
        description: '80000点に到達しました',
        icon: '🏅',
        category: 'score',
        condition: { type: 'score', value: 80000 },
        points: 130,
        unlocked: false
    },
    score_90k: {
        id: 'score_90k',
        name: '90000点到達',
        description: '90000点に到達しました',
        icon: '🔥',
        category: 'score',
        condition: { type: 'score', value: 90000 },
        points: 135,
        unlocked: false
    },
    score_milestone_100k: {
        id: 'score_milestone_100k',
        name: '10万点の神域',
        description: '100000点以上獲得しました',
        icon: '🌟',
        category: 'score',
        condition: { type: 'score', value: 100000 },
        points: 140,
        unlocked: false
    },
    score_120k: {
        id: 'score_120k',
        name: '120000点到達',
        description: '120000点に到達しました',
        icon: '🌌',
        category: 'score',
        condition: { type: 'score', value: 120000 },
        points: 145,
        unlocked: false
    },
    score_150k: {
        id: 'score_150k',
        name: '150000点到達',
        description: '150000点に到達しました',
        icon: '💫',
        category: 'score',
        condition: { type: 'score', value: 150000 },
        points: 150,
        unlocked: false
    },
    score_180k: {
        id: 'score_180k',
        name: '180000点到達',
        description: '180000点に到達しました',
        icon: '⭐',
        category: 'score',
        condition: { type: 'score', value: 180000 },
        points: 155,
        unlocked: false
    },
    score_milestone_200k: {
        id: 'score_milestone_200k',
        name: '竜王の境地',
        description: '200000点以上獲得しました（竜王位相当）',
        icon: '🐉',
        category: 'score',
        condition: { type: 'score', value: 200000 },
        points: 160,
        unlocked: false
    },
    score_220k: {
        id: 'score_220k',
        name: '220000点到達',
        description: '220000点に到達しました',
        icon: '🎭',
        category: 'score',
        condition: { type: 'score', value: 220000 },
        points: 165,
        unlocked: false
    },
    score_250k: {
        id: 'score_250k',
        name: '250000点到達',
        description: '250000点に到達しました',
        icon: '🏰',
        category: 'score',
        condition: { type: 'score', value: 250000 },
        points: 170,
        unlocked: false
    },
    score_280k: {
        id: 'score_280k',
        name: '280000点到達',
        description: '280000点に到達しました',
        icon: '👑',
        category: 'score',
        condition: { type: 'score', value: 280000 },
        points: 175,
        unlocked: false
    },
    score_milestone_300k: {
        id: 'score_milestone_300k',
        name: '永世の称号',
        description: '300000点以上獲得しました（永世名人相当）',
        icon: '👑',
        category: 'score',
        condition: { type: 'score', value: 300000 },
        points: 180,
        unlocked: false
    },
    score_400k: {
        id: 'score_400k',
        name: '400000点到達',
        description: '400000点に到達しました',
        icon: '🎪',
        category: 'score',
        condition: { type: 'score', value: 400000 },
        points: 200,
        unlocked: false
    },
    score_milestone_500k: {
        id: 'score_milestone_500k',
        name: '伝説の領域',
        description: '500000点以上獲得しました',
        icon: '🏛️',
        category: 'score',
        condition: { type: 'score', value: 500000 },
        points: 250,
        unlocked: false
    },
    score_750k: {
        id: 'score_750k',
        name: '750000点到達',
        description: '750000点に到達しました',
        icon: '🌠',
        category: 'score',
        condition: { type: 'score', value: 750000 },
        points: 350,
        unlocked: false
    },
    score_milestone_1m: {
        id: 'score_milestone_1m',
        name: 'ミリオンプレイヤー',
        description: '1000000点以上獲得しました',
        icon: '💎',
        category: 'score',
        condition: { type: 'score', value: 1000000 },
        points: 500,
        unlocked: false
    },
    score_1_5m: {
        id: 'score_1_5m',
        name: '150万点の壁',
        description: '1500000点に到達しました',
        icon: '🏛️',
        category: 'score',
        condition: { type: 'score', value: 1500000 },
        points: 600,
        unlocked: false
    },
    score_2m: {
        id: 'score_2m',
        name: '200万点の領域',
        description: '2000000点に到達しました',
        icon: '🌌',
        category: 'score',
        condition: { type: 'score', value: 2000000 },
        points: 700,
        unlocked: false
    },
    score_2_5m: {
        id: 'score_2_5m',
        name: '250万点の境地',
        description: '2500000点に到達しました',
        icon: '⭐',
        category: 'score',
        condition: { type: 'score', value: 2500000 },
        points: 800,
        unlocked: false
    },
    score_3m: {
        id: 'score_3m',
        name: '300万点の神域',
        description: '3000000点に到達しました',
        icon: '👑',
        category: 'score',
        condition: { type: 'score', value: 3000000 },
        points: 900,
        unlocked: false
    },
    score_3_5m: {
        id: 'score_3_5m',
        name: '350万点の伝説',
        description: '3500000点に到達しました',
        icon: '🌟',
        category: 'score',
        condition: { type: 'score', value: 3500000 },
        points: 1000,
        unlocked: false
    },
    score_4m: {
        id: 'score_4m',
        name: '400万点の神話',
        description: '4000000点に到達しました',
        icon: '✨',
        category: 'score',
        condition: { type: 'score', value: 4000000 },
        points: 1200,
        unlocked: false
    },
    score_4_5m: {
        id: 'score_4_5m',
        name: '450万点の絶対',
        description: '4500000点に到達しました',
        icon: '💫',
        category: 'score',
        condition: { type: 'score', value: 4500000 },
        points: 1400,
        unlocked: false
    },
    score_milestone_5m: {
        id: 'score_milestone_5m',
        name: '500万点の究極',
        description: '5000000点以上獲得しました（究極のやりこみ達成！）',
        icon: '🌠',
        category: 'score',
        condition: { type: 'score', value: 5000000 },
        points: 2000,
        unlocked: false
    },
    time_lord: {
        id: 'time_lord',
        name: 'タイムロード',
        description: '30分以上プレイしました（お疲れ様！）',
        icon: '⌚',
        category: 'fun',
        condition: { type: 'play_time', value: 1800000 },
        points: 180,
        unlocked: false
    },
    line_sniper: {
        id: 'line_sniper',
        name: 'ライン狙撃手',
        description: '100ライン消去達成',
        icon: '🎯',
        category: 'fun',
        condition: { type: 'lines_cleared', value: 100 },
        points: 100,
        unlocked: false
    },
    exchange_addict: {
        id: 'exchange_addict',
        name: '交換中毒',
        description: '1ゲーム中に20回以上交換しました',
        icon: '🔄',
        category: 'fun',
        condition: { type: 'single_game_exchange', value: 20 },
        points: 20,
        unlocked: false
    },
    hold_hoarder: {
        id: 'hold_hoarder',
        name: 'ホールド貯金家',
        description: '1ゲーム中に10回以上ホールドしました',
        icon: '💰',
        category: 'fun',
        condition: { type: 'single_game_hold', value: 10 },
        points: 10,
        unlocked: false
    },
    fever_fanatic: {
        id: 'fever_fanatic',
        name: 'フィーバー狂',
        description: '1ゲーム中に5回以上フィーバーしました',
        icon: '🔥',
        category: 'fun',
        condition: { type: 'single_game_fever', value: 5 },
        points: 50,
        unlocked: false
    },
    minimalist: {
        id: 'minimalist',
        name: 'ミニマリスト',
        description: 'たった20個のブロックで1000点達成',
        icon: '🎯',
        category: 'fun',
        condition: { type: 'efficient_score', score: 1000, max_blocks: 20 },
        points: 100,
        unlocked: false
    },
    // 狙わないとできない実績
    no_exchange_master: {
        id: 'no_exchange_master',
        name: '無交換主義者',
        description: '1度も交換せずに1000点達成',
        icon: '🚫',
        category: 'challenge',
        condition: { type: 'no_exchange_score', score: 1000 },
        points: 150,
        unlocked: false
    },
    no_hold_warrior: {
        id: 'no_hold_warrior',
        name: 'ノーホールド戦士',
        description: '1度もホールドせずに500点達成',
        icon: '⚔️',
        category: 'challenge',
        condition: { type: 'no_hold_score', score: 500 },
        points: 120,
        unlocked: false
    },
    single_tetris_only: {
        id: 'single_tetris_only',
        name: 'テトリス原理主義者',
        description: 'テトリス以外でラインを消去せずに3回テトリス達成',
        icon: '🔳',
        category: 'challenge',
        condition: { type: 'tetris_only', value: 3 },
        points: 200,
        unlocked: false
    },
    fever_failure: {
        id: 'fever_failure',
        name: 'フィーバー無駄遣い',
        description: 'フィーバー中に1ラインも消去できずに終了',
        icon: '💸',
        category: 'challenge',
        condition: { type: 'fever_no_lines' },
        points: 50,
        unlocked: false
    },
    fever_death: {
        id: 'fever_death',
        name: 'フィーバー即死',
        description: 'フィーバー中にゲームオーバーしました',
        icon: '💀',
        category: 'fun',
        condition: { type: 'gameover_during_fever' },
        points: 30,
        unlocked: false
    },
    fever_perfectionist: {
        id: 'fever_perfectionist',
        name: 'フィーバー完璧主義者',
        description: 'フィーバー中に交換を一度も使わず高スコア',
        icon: '✨',
        category: 'challenge',
        condition: { type: 'fever_no_exchange_highscore', score: 500 },
        points: 120,
        unlocked: false
    },
    // basic系実績
    lucky_line_clear: {
        id: 'lucky_line_clear',
        name: 'ラッキー消去',
        description: 'たまたま3ライン同時消去を5回達成',
        icon: '🍀',
        category: 'basic',
        condition: { type: 'triple_lines', value: 5 },
        points: 30,
        unlocked: false
    },
    accidental_tspin: {
        id: 'accidental_tspin',
        name: '偶然のT-Spin',
        description: 'たまたまT-Spinが決まりました',
        icon: '🎲',
        category: 'technical',
        condition: { type: 'tspin', value: 1 },
        points: 25,
        unlocked: false
    },
    surprise_perfect: {
        id: 'surprise_perfect',
        name: 'まさかのパーフェクト',
        description: 'まさかのパーフェクトクリア達成',
        icon: '😲',
        category: 'technical',
        condition: { type: 'perfect_clear', value: 1 },
        points: 80,
        unlocked: false
    },
    natural_combo: {
        id: 'natural_combo',
        name: 'ナチュラルコンボ',
        description: '自然に5コンボ以上が繋がりました',
        icon: '🌿',
        category: 'technical',
        condition: { type: 'max_combo', value: 5 },
        points: 35,
        unlocked: false
    },
    // basic系実績（プレイ回数・基本）
    first_game: {
        id: 'first_game',
        name: 'はじめの一歩',
        description: '初回プレイ完了',
        icon: '👶',
        category: 'basic',
        condition: { type: 'games_played', value: 1 },
        points: 10,
        unlocked: false
    },
    game_addict: {
        id: 'game_addict',
        name: 'ゲーム中毒',
        description: '50回プレイしました',
        icon: '🎮',
        category: 'basic',
        condition: { type: 'games_played', value: 50 },
        points: 50,
        unlocked: false
    },
    veteran_player: {
        id: 'veteran_player',
        name: 'ベテランプレイヤー',
        description: '100回プレイしました',
        icon: '🎖️',
        category: 'basic',
        condition: { type: 'games_played', value: 100 },
        points: 100,
        unlocked: false
    },
    legend_player: {
        id: 'legend_player',
        name: '伝説のプレイヤー',
        description: '500回プレイしました',
        icon: '🏛️',
        category: 'progress',
        condition: { type: 'games_played', value: 500 },
        points: 500,
        unlocked: false
    },
    total_playtime_1h: {
        id: 'total_playtime_1h',
        name: '1時間プレイヤー',
        description: '累計1時間プレイしました',
        icon: '⏰',
        category: 'basic',
        condition: { type: 'total_playtime', value: 3600000 },
        points: 60,
        unlocked: false
    },
    total_playtime_10h: {
        id: 'total_playtime_10h',
        name: '10時間マスター',
        description: '累計10時間プレイしました',
        icon: '⏱️',
        category: 'progress',
        condition: { type: 'total_playtime', value: 36000000 },
        points: 600,
        unlocked: false
    },
    daily_visitor: {
        id: 'daily_visitor',
        name: '毎日訪問者',
        description: '3日連続でプレイしました',
        icon: '📅',
        category: 'basic',
        condition: { type: 'consecutive_days', value: 3 },
        points: 30,
        unlocked: false
    },
    weekly_warrior: {
        id: 'weekly_warrior',
        name: '週間戦士',
        description: '7日連続でプレイしました',
        icon: '🗓️',
        category: 'progress',
        condition: { type: 'consecutive_days', value: 7 },
        points: 70,
        unlocked: false
    },
    // special系実績（特殊条件）
    block_waster: {
        id: 'block_waster',
        name: 'ブロック無駄遣い',
        description: '1000個ブロックを置いても100点以下',
        icon: '🗑️',
        category: 'special',
        condition: { type: 'inefficient_play', blocks: 1000, max_score: 100 },
        points: 10,
        unlocked: false
    },
    unlucky_player: {
        id: 'unlucky_player',
        name: '不運なプレイヤー',
        description: '10回連続で100点以下でゲームオーバー',
        icon: '😅',
        category: 'special',
        condition: { type: 'consecutive_low_scores', count: 10, max_score: 100 },
        points: 20,
        unlocked: false
    },
    night_owl: {
        id: 'night_owl',
        name: '夜更かしプレイヤー',
        description: '深夜2時〜5時にプレイしました',
        icon: '🦉',
        category: 'special',
        condition: { type: 'late_night_play' },
        points: 25,
        unlocked: false
    },
    early_bird: {
        id: 'early_bird',
        name: '早起きプレイヤー',
        description: '朝5時〜7時にプレイしました',
        icon: '🐦',
        category: 'special',
        condition: { type: 'early_morning_play' },
        points: 25,
        unlocked: false
    },
    weekend_warrior: {
        id: 'weekend_warrior',
        name: '週末戦士',
        description: '土日両方でプレイしました',
        icon: '🛡️',
        category: 'basic',
        condition: { type: 'weekend_play' },
        points: 15,
        unlocked: false
    },
    comeback_player: {
        id: 'comeback_player',
        name: 'カムバックプレイヤー',
        description: '1週間ぶりにプレイしました',
        icon: '🔄',
        category: 'basic',
        condition: { type: 'long_absence_return', days: 7 },
        points: 40,
        unlocked: false
    },
    // 隠し実績（条件不明）
    mystery_master: {
        id: 'mystery_master',
        name: '???',
        description: '???',
        icon: '❓',
        category: 'challenge',
        condition: { type: 'mystery_combo', value: 13 },
        points: 130,
        unlocked: false,
        hidden: true
    },
    secret_sequence: {
        id: 'secret_sequence',
        name: '???',
        description: '???',
        icon: '🔐',
        category: 'challenge',
        condition: { type: 'secret_pattern' },
        points: 77,
        unlocked: false,
        hidden: true
    },
    hidden_champion: {
        id: 'hidden_champion',
        name: '???',
        description: '???',
        icon: '👑',
        category: 'challenge',
        condition: { type: 'perfect_game', tetris: 5, no_single: true },
        points: 200,
        unlocked: false,
        hidden: true
    },
    time_wizard: {
        id: 'time_wizard',
        name: '???',
        description: '???',
        icon: '🧙‍♂️',
        category: 'challenge',
        condition: { type: 'exact_time_finish', minute: 3, second: 33 },
        points: 333,
        unlocked: false,
        hidden: true
    },
    // 成長を感じられる実績
    score_improvement: {
        id: 'score_improvement',
        name: '成長の証',
        description: '過去のベストスコアを500点以上更新',
        icon: '📈',
        category: 'progress',
        condition: { type: 'score_improvement', improvement: 500 },
        points: 50,
        unlocked: false
    },
    consistency_master: {
        id: 'consistency_master',
        name: '安定感マスター',
        description: '直近10ゲームで平均500点以上を維持',
        icon: '⚖️',
        category: 'progress',
        condition: { type: 'consistent_scores', games: 10, average: 500 },
        points: 100,
        unlocked: false
    },
    skill_evolution: {
        id: 'skill_evolution',
        name: 'スキル進化',
        description: '初回プレイから1000点以上成長',
        icon: '🦋',
        category: 'progress',
        condition: { type: 'total_improvement', improvement: 1000 },
        points: 100,
        unlocked: false
    },
    breakthrough: {
        id: 'breakthrough',
        name: 'ブレイクスルー',
        description: '1日で過去最高を3回更新',
        icon: '💥',
        category: 'progress',
        condition: { type: 'daily_records', count: 3 },
        points: 75,
        unlocked: false
    },
    gradual_climber: {
        id: 'gradual_climber',
        name: '着実な登山家',
        description: '5ゲーム連続でスコア向上',
        icon: '🏔️',
        category: 'progress',
        condition: { type: 'consecutive_improvements', count: 5 },
        points: 80,
        unlocked: false
    },
    // プレイ履歴を感じられる実績
    season_player: {
        id: 'season_player',
        name: '四季を超えて',
        description: '3ヶ月間プレイを継続',
        icon: '🌸',
        category: 'basic',
        condition: { type: 'play_duration_months', months: 3 },
        points: 300,
        unlocked: false
    },
    year_veteran: {
        id: 'year_veteran',
        name: '1年ベテラン',
        description: '初回プレイから1年経過',
        icon: '🎂',
        category: 'progress',
        condition: { type: 'play_duration_years', years: 1 },
        points: 365,
        unlocked: false
    },
    memory_keeper: {
        id: 'memory_keeper',
        name: '記憶の番人',
        description: '過去100ゲームの記録を蓄積',
        icon: '📚',
        category: 'basic',
        condition: { type: 'game_history', count: 100 },
        points: 100,
        unlocked: false
    },
    monthly_challenger: {
        id: 'monthly_challenger',
        name: '月間チャレンジャー',
        description: '1ヶ月間毎日プレイ',
        icon: '📅',
        category: 'progress',
        condition: { type: 'monthly_daily_play' },
        points: 300,
        unlocked: false
    },
    nostalgic_return: {
        id: 'nostalgic_return',
        name: 'ノスタルジック',
        description: '1ヶ月ぶりにプレイして過去のベストに近いスコア',
        icon: '🌅',
        category: 'special',
        condition: { type: 'nostalgic_performance', absence_days: 30, score_ratio: 0.8 },
        points: 120,
        unlocked: false
    },
    evolution_witness: {
        id: 'evolution_witness',
        name: '進化の目撃者',
        description: '自分の最低スコアと最高スコアの差が5000点以上',
        icon: '👁️',
        category: 'progress',
        condition: { type: 'score_range', range: 5000 },
        points: 150,
        unlocked: false
    },
    milestone_collector: {
        id: 'milestone_collector',
        name: 'マイルストーンコレクター',
        description: '様々な記念すべき瞬間を体験',
        icon: '🏆',
        category: 'special',
        condition: { type: 'milestone_variety', count: 10 },
        points: 200,
        unlocked: false
    },
    data_scientist: {
        id: 'data_scientist',
        name: 'データサイエンティスト',
        description: '累計統計データが充実',
        icon: '📊',
        category: 'progress',
        condition: { type: 'rich_statistics' },
        points: 100,
        unlocked: false
    },
    time_capsule: {
        id: 'time_capsule',
        name: 'タイムカプセル',
        description: '初回プレイから大きく成長した証拠',
        icon: '⏳',
        category: 'progress',
        condition: { type: 'long_term_growth' },
        points: 250,
        unlocked: false
    },
    // 高スコア向けチャレンジ実績
    speed_demon_pro: {
        id: 'speed_demon_pro',
        name: 'スピードデーモンPro',
        description: '10分以内に10000点達成',
        icon: '⚡',
        category: 'challenge',
        condition: { type: 'speed_score', score: 10000, time: 600000 },
        points: 300,
        unlocked: false
    },
    speed_god: {
        id: 'speed_god',
        name: 'スピード神',
        description: '3分以内に5000点達成',
        icon: '🌪️',
        category: 'challenge',
        condition: { type: 'speed_score', score: 5000, time: 180000 },
        points: 500,
        unlocked: false
    },
    efficiency_master: {
        id: 'efficiency_master',
        name: '効率マスター',
        description: '100個のブロックで5000点達成',
        icon: '🎯',
        category: 'challenge',
        condition: { type: 'efficient_score', score: 5000, max_blocks: 100 },
        points: 400,
        unlocked: false
    },
    efficiency_god: {
        id: 'efficiency_god',
        name: '効率の神',
        description: '50個のブロックで3000点達成',
        icon: '🏹',
        category: 'challenge',
        condition: { type: 'efficient_score', score: 3000, max_blocks: 50 },
        points: 800,
        unlocked: false
    },
    tetris_virtuoso: {
        id: 'tetris_virtuoso',
        name: 'テトリス名人',
        description: '累計50回テトリス達成',
        icon: '🎼',
        category: 'technical',
        condition: { type: 'total_tetris', value: 50 },
        points: 60,
        unlocked: false
    },
    combo_legend: {
        id: 'combo_legend',
        name: 'コンボレジェンド',
        description: '10コンボ以上達成',
        icon: '⚡',
        category: 'technical',
        condition: { type: 'max_combo', value: 10 },
        points: 150,
        unlocked: false
    },
    line_destroyer_pro: {
        id: 'line_destroyer_pro',
        name: 'ライン破壊神',
        description: '累計1000ライン消去達成',
        icon: '💥',
        category: 'technical',
        condition: { type: 'total_lines', value: 1000 },
        points: 80,
        unlocked: false
    },
    fever_emperor: {
        id: 'fever_emperor',
        name: 'フィーバー皇帝',
        description: '累計100回フィーバー発動',
        icon: '👑',
        category: 'special',
        condition: { type: 'total_fever', value: 100 },
        points: 100,
        unlocked: false
    },
    exchange_tycoon: {
        id: 'exchange_tycoon',
        name: '交換大富豪',
        description: '累計1000回交換使用',
        icon: '💰',
        category: 'special',
        condition: { type: 'total_exchange', value: 1000 },
        points: 80,
        unlocked: false
    },
    marathon_champion: {
        id: 'marathon_champion',
        name: 'マラソンチャンピオン',
        description: '2時間以上の超長時間プレイ',
        icon: '🏃‍♂️',
        category: 'challenge',
        condition: { type: 'play_time', value: 7200000 },
        points: 80,
        unlocked: false
    },
    consistency_god: {
        id: 'consistency_god',
        name: '安定性の神',
        description: '直近20ゲームで平均5000点以上維持',
        icon: '🎯',
        category: 'progress',
        condition: { type: 'consistent_scores', games: 20, average: 5000 },
        points: 800,
        unlocked: false
    },
    score_evolution: {
        id: 'score_evolution',
        name: 'スコア進化論',
        description: '過去最高を10000点以上更新',
        icon: '🧬',
        category: 'progress',
        condition: { type: 'score_improvement', improvement: 10000 },
        points: 600,
        unlocked: false
    },
    tspin_master: {
        id: 'tspin_master',
        name: 'T-Spin至高',
        description: '累計100回T-Spin決定',
        icon: '🌪️',
        category: 'technical',
        condition: { type: 'total_tspin', value: 100 },
        points: 90,
        unlocked: false
    },
    perfect_storm: {
        id: 'perfect_storm',
        name: 'パーフェクトストーム',
        description: '3回以上パーフェクトクリア達成',
        icon: '🌩️',
        category: 'technical',
        condition: { type: 'perfect_clear', value: 3 },
        points: 150,
        unlocked: false
    },
    // 高度な技術系実績
    back_to_back_master: {
        id: 'back_to_back_master',
        name: 'Back-to-Backマスター',
        description: 'Back-to-Backを50回連続で維持',
        icon: '🔗',
        category: 'technical',
        condition: { type: 'back_to_back_chain', value: 50 },
        points: 800,
        unlocked: false
    },
    tspin_triple_expert: {
        id: 'tspin_triple_expert',
        name: 'T-Spin Triple Expert',
        description: 'T-Spin Tripleを20回決める',
        icon: '🌀',
        category: 'technical',
        condition: { type: 'tspin_triple', value: 20 },
        points: 80,
        unlocked: false
    },
    quad_combo_king: {
        id: 'quad_combo_king',
        name: 'クワッドコンボキング',
        description: '4回連続でテトリス達成',
        icon: '4️⃣',
        category: 'technical',
        condition: { type: 'consecutive_tetris', value: 4 },
        points: 100,
        unlocked: false
    },
    skimming_specialist: {
        id: 'skimming_specialist',
        name: 'スキミング専門家',
        description: 'シングルライン消去を100回以上',
        icon: '1️⃣',
        category: 'technical',
        condition: { type: 'single_lines', value: 100 },
        points: 300,
        unlocked: false
    },
    opening_master: {
        id: 'opening_master',
        name: '序盤構築マスター',
        description: 'ゲーム開始50ブロック以内でテトリス',
        icon: '🏗️',
        category: 'technical',
        condition: { type: 'early_tetris', max_blocks: 50 },
        points: 80,
        unlocked: false
    },
    stacking_virtuoso: {
        id: 'stacking_virtuoso',
        name: '積み上げ名人',
        description: '20段以上の高さまで積み上げて生存',
        icon: '🏗️',
        category: 'technical',
        condition: { type: 'max_height_survival', height: 20 },
        points: 600,
        unlocked: false
    },
    // 隠し技術系実績
    invisible_master: {
        id: 'invisible_master',
        name: '???',
        description: '???',
        icon: '👻',
        category: 'technical',
        condition: { type: 'invisible_tetris', value: 10 },
        points: 120,
        unlocked: false,
        hidden: true
    },
    god_mode: {
        id: 'god_mode',
        name: '???',
        description: '???',
        icon: '🌌',
        category: 'technical',
        condition: { type: 'perfect_efficiency', score: 20000, blocks: 100 },
        points: 200,
        unlocked: false,
        hidden: true
    },
    matrix_controller: {
        id: 'matrix_controller',
        name: '???',
        description: '???',
        icon: '🔮',
        category: 'technical',
        condition: { type: 'no_rotate_challenge', score: 5000 },
        points: 150,
        unlocked: false,
        hidden: true
    },
    zen_master: {
        id: 'zen_master',
        name: '???',
        description: '???',
        icon: '🧘‍♂️',
        category: 'technical',
        condition: { type: 'minimalist_style', score: 10000, actions: 500 },
        points: 180,
        unlocked: false,
        hidden: true
    },
    phantom_clearer: {
        id: 'phantom_clearer',
        name: '???',
        description: '???',
        icon: '👤',
        category: 'technical',
        condition: { type: 'ghost_clear_only', lines: 100 },
        points: 140,
        unlocked: false,
        hidden: true
    },
    // 追加技術系実績
    combo_chains_master: {
        id: 'combo_chains_master',
        name: 'コンボチェーンマスター',
        description: '10コンボを5回達成',
        icon: '⛓️',
        category: 'technical',
        condition: { type: 'combo_achievements', combo_level: 10, count: 5 },
        points: 80,
        unlocked: false
    },
    line_clear_variety: {
        id: 'line_clear_variety',
        name: 'ライン消去バラエティ',
        description: '1ゲームでシングル・ダブル・トリプル・テトリス全て達成',
        icon: '🎨',
        category: 'technical',
        condition: { type: 'all_line_types' },
        points: 400,
        unlocked: false
    },
    precision_placement: {
        id: 'precision_placement',
        name: '精密配置',
        description: '連続100ブロックでミス配置なし',
        icon: '🎯',
        category: 'technical',
        condition: { type: 'perfect_placement', blocks: 100 },
        points: 600,
        unlocked: false
    },
    rhythm_master: {
        id: 'rhythm_master',
        name: 'リズムマスター',
        description: '一定間隔でブロック配置を50回連続',
        icon: '🎵',
        category: 'technical',
        condition: { type: 'rhythmic_play', count: 50 },
        points: 500,
        unlocked: false
    },
    field_artist: {
        id: 'field_artist',
        name: 'フィールドアーティスト',
        description: '美しい積み方で高スコア達成',
        icon: '🎨',
        category: 'technical',
        condition: { type: 'aesthetic_field', score: 5000 },
        points: 400,
        unlocked: false
    },
    surface_cleaner: {
        id: 'surface_cleaner',
        name: 'サーフェスクリーナー',
        description: 'フィールド上部のみでライン消去20回',
        icon: '🧹',
        category: 'technical',
        condition: { type: 'top_only_clears', count: 20 },
        points: 700,
        unlocked: false
    },
    danger_zone_master: {
        id: 'danger_zone_master',
        name: 'デンジャーゾーンマスター',
        description: 'フィールド上部5行以内で30回ライン消去',
        icon: '⚠️',
        category: 'technical',
        condition: { type: 'high_zone_clears', count: 30 },
        points: 70,
        unlocked: false
    },
    // 特殊・隠しアチーブメント追加
    lucky_seven: {
        id: 'lucky_seven',
        name: 'ラッキーセブン',
        description: 'スコアが770点ちょうどでゲームオーバー',
        icon: '🎰',
        category: 'special',
        condition: { type: 'exact_score_gameover', score: 770 },
        points: 77,
        unlocked: false
    },
    palindrome_score: {
        id: 'palindrome_score',
        name: '回文スコア',
        description: '回文スコア（1221、3443等）達成',
        icon: '🔄',
        category: 'special',
        condition: { type: 'palindrome_score' },
        points: 50,
        unlocked: false
    },
    same_digits: {
        id: 'same_digits',
        name: '同一数字マニア',
        description: 'スコアが同じ数字のみ（111、2222等）',
        icon: '🔢',
        category: 'special',
        condition: { type: 'same_digit_score' },
        points: 60,
        unlocked: false
    },
    zero_points_master: {
        id: 'zero_points_master',
        name: 'ポイント完全消費',
        description: 'ゲーム終了時にポイントが0点ちょうど',
        icon: '💰',
        category: 'special',
        condition: { type: 'zero_points_finish' },
        points: 40,
        unlocked: false
    },
    birthday_player: {
        id: 'birthday_player',
        name: '誕生日プレイヤー',
        description: '月日の数字がスコアに含まれる日にプレイ',
        icon: '🎂',
        category: 'special',
        condition: { type: 'birthday_coincidence' },
        points: 80,
        unlocked: false
    },
    new_year_champion: {
        id: 'new_year_champion',
        name: '新年チャンピオン',
        description: '1月1日にプレイ',
        icon: '🎊',
        category: 'special',
        condition: { type: 'new_year_play' },
        points: 50,
        unlocked: false
    },
    christmas_spirit: {
        id: 'christmas_spirit',
        name: 'クリスマススピリット',
        description: '12月25日にプレイ',
        icon: '🎄',
        category: 'special',
        condition: { type: 'christmas_play' },
        points: 50,
        unlocked: false
    },
    friday_13th: {
        id: 'friday_13th',
        name: '13日の金曜日',
        description: '13日の金曜日にプレイ',
        icon: '🖤',
        category: 'special',
        condition: { type: 'friday_13th_play' },
        points: 130,
        unlocked: false
    },
    full_moon_player: {
        id: 'full_moon_player',
        name: '満月プレイヤー',
        description: '満月の夜にプレイ（推定）',
        icon: '🌕',
        category: 'special',
        condition: { type: 'full_moon_play' },
        points: 75,
        unlocked: false
    },
    exact_minute_player: {
        id: 'exact_minute_player',
        name: 'きっちりプレイヤー',
        description: '00秒ちょうどにゲーム開始',
        icon: '⏰',
        category: 'special',
        condition: { type: 'exact_minute_start' },
        points: 30,
        unlocked: false
    },
    reverse_tetris: {
        id: 'reverse_tetris',
        name: '逆転テトリス',
        description: 'フィールド下部から上に向かってライン消去',
        icon: '🔄',
        category: 'special',
        condition: { type: 'bottom_up_clear', lines: 5 },
        points: 80,
        unlocked: false
    },
    ghost_gamer: {
        id: 'ghost_gamer',
        name: 'ゴーストゲーマー',
        description: 'キー入力なしで10秒間生存',
        icon: '👻',
        category: 'special',
        condition: { type: 'no_input_survival', seconds: 10 },
        points: 90,
        unlocked: false
    },
    button_masher: {
        id: 'button_masher',
        name: 'ボタン連打王',
        description: '1秒間に20回以上キー入力',
        icon: '⚡',
        category: 'special',
        condition: { type: 'rapid_inputs', per_second: 20 },
        points: 70,
        unlocked: false
    },
    patience_master: {
        id: 'patience_master',
        name: '忍耐の達人',
        description: 'ブロックを30秒間同じ位置で待機',
        icon: '🧘',
        category: 'special',
        condition: { type: 'patience_wait', seconds: 30 },
        points: 60,
        unlocked: false
    },
    symmetry_lover: {
        id: 'symmetry_lover',
        name: 'シンメトリー愛好家',
        description: 'フィールドが左右対称の状態を作成',
        icon: '⚖️',
        category: 'special',
        condition: { type: 'symmetric_field' },
        points: 100,
        unlocked: false
    },
    edge_only_player: {
        id: 'edge_only_player',
        name: 'エッジオンリープレイヤー',
        description: 'フィールド端のみでテトリス達成',
        icon: '📐',
        category: 'special',
        condition: { type: 'edge_only_tetris' },
        points: 120,
        unlocked: false
    },
    center_master: {
        id: 'center_master',
        name: 'センターマスター',
        description: 'フィールド中央のみでライン消去',
        icon: '🎯',
        category: 'special',
        condition: { type: 'center_only_clear', lines: 5 },
        points: 90,
        unlocked: false
    },
    multitasker: {
        id: 'multitasker',
        name: 'マルチタスカー',
        description: '他のタブを開きながらプレイ',
        icon: '📱',
        category: 'special',
        condition: { type: 'multitab_play' },
        points: 40,
        unlocked: false
    },
    pause_abuser: {
        id: 'pause_abuser',
        name: 'ポーズ乱用者',
        description: '1ゲーム中に20回以上ポーズ',
        icon: '⏸️',
        category: 'special',
        condition: { type: 'excessive_pause', count: 20 },
        points: 25,
        unlocked: false
    },
    // 隠しアチーブメント追加
    secret_konami: {
        id: 'secret_konami',
        name: '???',
        description: '???',
        icon: '🕹️',
        category: 'special',
        condition: { type: 'konami_code' },
        points: 300,
        unlocked: false,
        hidden: true
    },
    secret_pi: {
        id: 'secret_pi',
        name: '???',
        description: '???',
        icon: '🥧',
        category: 'special',
        condition: { type: 'pi_score', score: 3140 },
        points: 314,
        unlocked: false,
        hidden: true
    },
    secret_fibonacci: {
        id: 'secret_fibonacci',
        name: '???',
        description: '???',
        icon: '🌀',
        category: 'special',
        condition: { type: 'fibonacci_sequence', count: 5 },
        points: 233,
        unlocked: false,
        hidden: true
    },
    secret_binary: {
        id: 'secret_binary',
        name: '???',
        description: '???',
        icon: '💻',
        category: 'special',
        condition: { type: 'binary_score' },
        points: 128,
        unlocked: false,
        hidden: true
    },
    secret_developer: {
        id: 'secret_developer',
        name: '???',
        description: '???',
        icon: '👨‍💻',
        category: 'special',
        condition: { type: 'developer_mode' },
        points: 999,
        unlocked: false,
        hidden: true
    },
    secret_matrix: {
        id: 'secret_matrix',
        name: '???',
        description: '???',
        icon: '🔢',
        category: 'special',
        condition: { type: 'matrix_pattern', rows: 10 },
        points: 404,
        unlocked: false,
        hidden: true
    },
    secret_midnight: {
        id: 'secret_midnight',
        name: '???',
        description: '???',
        icon: '🌙',
        category: 'special',
        condition: { type: 'exact_midnight_play' },
        points: 240,
        unlocked: false,
        hidden: true
    },
    secret_rainbow: {
        id: 'secret_rainbow',
        name: '???',
        description: '???',
        icon: '🌈',
        category: 'special',
        condition: { type: 'all_piece_types_sequence' },
        points: 175,
        unlocked: false,
        hidden: true
    },
    secret_perfectionist: {
        id: 'secret_perfectionist',
        name: '???',
        description: '???',
        icon: '💎',
        category: 'special',
        condition: { type: 'no_mistakes_game', score: 5000 },
        points: 500,
        unlocked: false,
        hidden: true
    },
    secret_time_traveler: {
        id: 'secret_time_traveler',
        name: '???',
        description: '???',
        icon: '⏳',
        category: 'special',
        condition: { type: 'time_paradox_play' },
        points: 888,
        unlocked: false,
        hidden: true
    },
    // 失敗系アチーブメント
    broke_player: {
        id: 'broke_player',
        name: '無一文プレイヤー',
        description: 'ポイント不足で交換に10回失敗',
        icon: '💸',
        category: 'special',
        condition: { type: 'exchange_failures', count: 10 },
        points: 30,
        unlocked: false
    },
    desperate_exchanger: {
        id: 'desperate_exchanger',
        name: '必死な交換者',
        description: '1ゲーム中にポイント不足で5回交換失敗',
        icon: '😰',
        category: 'special',
        condition: { type: 'single_game_exchange_failures', count: 5 },
        points: 25,
        unlocked: false
    },
    hold_denied: {
        id: 'hold_denied',
        name: 'ホールド拒否',
        description: 'ポイント不足でホールドに10回失敗',
        icon: '🚫',
        category: 'special',
        condition: { type: 'hold_failures', count: 10 },
        points: 20,
        unlocked: false
    },
    line_clear_broke: {
        id: 'line_clear_broke',
        name: 'ライン消去貧乏',
        description: 'ポイント不足でライン消去に5回失敗',
        icon: '💔',
        category: 'special',
        condition: { type: 'line_clear_failures', count: 5 },
        points: 35,
        unlocked: false
    },
    button_spammer: {
        id: 'button_spammer',
        name: 'ボタン連打失敗王',
        description: '無効な操作を50回実行',
        icon: '🔄',
        category: 'special',
        condition: { type: 'invalid_actions', count: 50 },
        points: 40,
        unlocked: false
    },
    poor_planner: {
        id: 'poor_planner',
        name: '計画性ゼロ',
        description: '必要な時にポイントが足りない状況20回',
        icon: '🤦',
        category: 'special',
        condition: { type: 'poor_planning', count: 20 },
        points: 50,
        unlocked: false
    },
    exchange_addict_broke: {
        id: 'exchange_addict_broke',
        name: '交換中毒（破産）',
        description: '交換失敗でゲームオーバー直結3回',
        icon: '💊',
        category: 'special',
        condition: { type: 'exchange_caused_gameover', count: 3 },
        points: 60,
        unlocked: false
    },
    regret_master: {
        id: 'regret_master',
        name: '後悔マスター',
        description: '絶好のタイミングでポイント不足10回',
        icon: '😤',
        category: 'special',
        condition: { type: 'missed_opportunities', count: 10 },
        points: 45,
        unlocked: false
    },
    false_hope: {
        id: 'false_hope',
        name: '偽りの希望',
        description: 'あと少しでポイントが足りない状況15回',
        icon: '💭',
        category: 'special',
        condition: { type: 'almost_enough_points', count: 15 },
        points: 35,
        unlocked: false
    },
    spam_king: {
        id: 'spam_king',
        name: 'スパム王',
        description: '同じ失敗操作を10回連続実行',
        icon: '👑',
        category: 'special',
        condition: { type: 'repeated_failures', count: 10 },
        points: 55,
        unlocked: false
    },
    budget_gamer: {
        id: 'budget_gamer',
        name: '節約ゲーマー',
        description: 'ポイントを温存しすぎて1000P以上余らせて終了',
        icon: '💰',
        category: 'special',
        condition: { type: 'point_hoarder', remaining: 1000 },
        points: 40,
        unlocked: false
    },
    panic_exchanger: {
        id: 'panic_exchanger',
        name: 'パニック交換者',
        description: 'ゲームオーバー直前の交換失敗5回',
        icon: '😱',
        category: 'special',
        condition: { type: 'panic_exchange_failures', count: 5 },
        points: 50,
        unlocked: false
    },
    wrong_timing: {
        id: 'wrong_timing',
        name: 'タイミング音痴',
        description: 'フィーバー直後にポイント不足で交換失敗5回',
        icon: '⏰',
        category: 'special',
        condition: { type: 'post_fever_failures', count: 5 },
        points: 30,
        unlocked: false
    },
    // 隠し失敗系アチーブメント
    secret_failure_king: {
        id: 'secret_failure_king',
        name: '???',
        description: '???',
        icon: '👑',
        category: 'special',
        condition: { type: 'ultimate_failure', total_failures: 100 },
        points: 666,
        unlocked: false,
        hidden: true
    },
    secret_broke_legend: {
        id: 'secret_broke_legend',
        name: '???',
        description: '???',
        icon: '💸',
        category: 'special',
        condition: { type: 'broke_legend', consecutive_games: 10 },
        points: 404,
        unlocked: false,
        hidden: true
    },
    // チャレンジ系アチーブメント追加
    speedrun_novice: {
        id: 'speedrun_novice',
        name: 'スピードラン初心者',
        description: '1分以内に300点達成',
        icon: '⚡',
        category: 'challenge',
        condition: { type: 'speed_score', score: 300, time: 60000 },
        points: 40,
        unlocked: false
    },
    speedrun_intermediate: {
        id: 'speedrun_intermediate',
        name: 'スピードラン中級者',
        description: '2分以内に800点達成',
        icon: '🏃‍♂️',
        category: 'challenge',
        condition: { type: 'speed_score', score: 800, time: 120000 },
        points: 60,
        unlocked: false
    },
    speedrun_expert: {
        id: 'speedrun_expert',
        name: 'スピードラン上級者',
        description: '3分以内に1500点達成',
        icon: '🚀',
        category: 'challenge',
        condition: { type: 'speed_score', score: 1500, time: 180000 },
        points: 80,
        unlocked: false
    },
    marathon_starter: {
        id: 'marathon_starter',
        name: 'マラソン入門者',
        description: '15分以上プレイして生存',
        icon: '🏃',
        category: 'challenge',
        condition: { type: 'survival_time', time: 900000 },
        points: 50,
        unlocked: false
    },
    marathon_veteran: {
        id: 'marathon_veteran',
        name: 'マラソンベテラン',
        description: '45分以上プレイして生存',
        icon: '🏃‍♀️',
        category: 'challenge',
        condition: { type: 'survival_time', time: 2700000 },
        points: 100,
        unlocked: false
    },
    level_rusher: {
        id: 'level_rusher',
        name: 'レベルラッシャー',
        description: '5分以内にレベル15達成',
        icon: '📈',
        category: 'challenge',
        condition: { type: 'level_speed', level: 15, time: 300000 },
        points: 70,
        unlocked: false
    },
    combo_specialist: {
        id: 'combo_specialist',
        name: 'コンボスペシャリスト',
        description: '15コンボ以上達成',
        icon: '🔥',
        category: 'challenge',
        condition: { type: 'max_combo', value: 15 },
        points: 100,
        unlocked: false
    },
    tetris_only_challenge: {
        id: 'tetris_only_challenge',
        name: 'テトリスオンリーチャレンジ',
        description: 'テトリス以外のライン消去なしで1000点',
        icon: '🟦',
        category: 'challenge',
        condition: { type: 'tetris_only_score', score: 1000 },
        points: 120,
        unlocked: false
    },
    no_soft_drop: {
        id: 'no_soft_drop',
        name: 'ソフトドロップ禁止',
        description: 'ソフトドロップなしで500点達成',
        icon: '🚫',
        category: 'challenge',
        condition: { type: 'no_soft_drop', score: 500 },
        points: 80,
        unlocked: false
    },
    minimal_rotation: {
        id: 'minimal_rotation',
        name: 'ミニマル回転',
        description: '回転を50回以下で1000点達成',
        icon: '↻',
        category: 'challenge',
        condition: { type: 'limited_rotations', score: 1000, max_rotations: 50 },
        points: 90,
        unlocked: false
    },
    edge_master: {
        id: 'edge_master',
        name: 'エッジマスター',
        description: 'フィールド端2列のみで500点達成',
        icon: '📏',
        category: 'challenge',
        condition: { type: 'edge_only_score', score: 500 },
        points: 100,
        unlocked: false
    },
    center_only: {
        id: 'center_only',
        name: 'センターオンリー',
        description: 'フィールド中央4列のみで300点達成',
        icon: '🎯',
        category: 'challenge',
        condition: { type: 'center_only_score', score: 300 },
        points: 85,
        unlocked: false
    },
    height_limiter: {
        id: 'height_limiter',
        name: '高さ制限チャレンジ',
        description: 'フィールド下半分のみで800点達成',
        icon: '📐',
        category: 'challenge',
        condition: { type: 'height_limited_score', score: 800, max_height: 10 },
        points: 110,
        unlocked: false
    },
    fever_abstainer: {
        id: 'fever_abstainer',
        name: 'フィーバー禁欲者',
        description: 'フィーバーを意図的に避けて1000点達成',
        icon: '🧘‍♂️',
        category: 'challenge',
        condition: { type: 'fever_avoidance', score: 1000 },
        points: 120,
        unlocked: false
    },
    single_session_master: {
        id: 'single_session_master',
        name: 'シングルセッションマスター',
        description: '1回のプレイで5000点達成',
        icon: '🎯',
        category: 'challenge',
        condition: { type: 'single_game_score', score: 5000 },
        points: 150,
        unlocked: false
    },
    consistency_challenge: {
        id: 'consistency_challenge',
        name: '安定性チャレンジ',
        description: '5ゲーム連続で500点以上達成',
        icon: '📊',
        category: 'challenge',
        condition: { type: 'consecutive_scores', games: 5, min_score: 500 },
        points: 80,
        unlocked: false
    },
    improvement_challenge: {
        id: 'improvement_challenge',
        name: '改善チャレンジ',
        description: '10ゲーム連続でスコア向上',
        icon: '📈',
        category: 'challenge',
        condition: { type: 'consecutive_improvements', games: 10 },
        points: 100,
        unlocked: false
    },
    precision_master: {
        id: 'precision_master',
        name: 'プレシジョンマスター',
        description: '無駄な操作なしで500点達成',
        icon: '🎯',
        category: 'challenge',
        condition: { type: 'precision_play', score: 500, efficiency: 95 },
        points: 120,
        unlocked: false
    },
    risk_taker: {
        id: 'risk_taker',
        name: 'リスクテイカー',
        description: 'フィールド80%埋まった状態で1000点達成',
        icon: '⚠️',
        category: 'challenge',
        condition: { type: 'high_risk_score', score: 1000, field_fill: 80 },
        points: 130,
        unlocked: false
    },
    comeback_king: {
        id: 'comeback_king',
        name: 'カムバックキング',
        description: 'ゲームオーバー寸前から逆転で1000点',
        icon: '👑',
        category: 'challenge',
        condition: { type: 'comeback_victory', score: 1000 },
        points: 140,
        unlocked: false
    },
    line_variety_master: {
        id: 'line_variety_master',
        name: 'ライン多様性マスター',
        description: '1ゲームでシングル・ダブル・トリプル・テトリス各5回',
        icon: '🌈',
        category: 'challenge',
        condition: { type: 'line_variety', single: 5, double: 5, triple: 5, tetris: 5 },
        points: 150,
        unlocked: false
    },
    tspin_specialist: {
        id: 'tspin_specialist',
        name: 'T-Spinスペシャリスト',
        description: '1ゲームでT-Spinを5回決める',
        icon: '🌪️',
        category: 'challenge',
        condition: { type: 'single_game_tspin', count: 5 },
        points: 160,
        unlocked: false
    },
    hold_minimalist: {
        id: 'hold_minimalist',
        name: 'ホールドミニマリスト',
        description: 'ホールド5回以下で1000点達成',
        icon: '🤏',
        category: 'challenge',
        condition: { type: 'limited_hold', score: 1000, max_holds: 5 },
        points: 110,
        unlocked: false
    },
    exchange_master: {
        id: 'exchange_master',
        name: 'エクスチェンジマスター',
        description: '1ゲームで50回以上交換使用',
        icon: '🔄',
        category: 'challenge',
        condition: { type: 'single_game_exchanges', count: 50 },
        points: 90,
        unlocked: false
    },
    // 超高難度チャレンジ
    legendary_speedrun: {
        id: 'legendary_speedrun',
        name: 'レジェンダリースピードラン',
        description: '1分30秒以内に2000点達成',
        icon: '⚡',
        category: 'challenge',
        condition: { type: 'speed_score', score: 2000, time: 90000 },
        points: 200,
        unlocked: false
    },
    perfect_efficiency: {
        id: 'perfect_efficiency',
        name: 'パーフェクト効率',
        description: '100ブロック以下で1000点達成',
        icon: '💎',
        category: 'challenge',
        condition: { type: 'efficient_blocks', score: 1000, max_blocks: 100 },
        points: 180,
        unlocked: false
    },
    ultimate_survival: {
        id: 'ultimate_survival',
        name: 'アルティメットサバイバル',
        description: '1時間以上プレイして生存',
        icon: '🛡️',
        category: 'challenge',
        condition: { type: 'survival_time', time: 3600000 },
        points: 300,
        unlocked: false
    },
    godlike_combo: {
        id: 'godlike_combo',
        name: 'ゴッドライクコンボ',
        description: '12コンボ以上達成',
        icon: '👑',
        category: 'challenge',
        condition: { type: 'max_combo', value: 12 },
        points: 250,
        unlocked: false
    },
    // 隠しチャレンジ
    secret_zen_master: {
        id: 'secret_zen_master',
        name: '???',
        description: '???',
        icon: '🧘',
        category: 'challenge',
        condition: { type: 'zen_perfection', score: 3000, moves: 200 },
        points: 500,
        unlocked: false,
        hidden: true
    },
    secret_time_attack: {
        id: 'secret_time_attack',
        name: '???',
        description: '???',
        icon: '⏱️',
        category: 'challenge',
        condition: { type: 'time_attack_god', score: 5000, time: 300000 },
        points: 777,
        unlocked: false,
        hidden: true
    },
    // --- 新規失敗系アチーブメント ---
    hold_failer: {
        id: 'hold_failer',
        name: 'ホールド失敗王',
        description: 'ホールドしようとしてポイント不足で10回失敗',
        icon: '🛑',
        category: 'special',
        condition: { type: 'hold_fail_count', value: 10 },
        points: 20,
        unlocked: false
    },
    line_clear_failer: {
        id: 'line_clear_failer',
        name: 'ライン削除失敗王',
        description: 'ライン削除しようとしてポイント不足で10回失敗',
        icon: '🚫',
        category: 'special',
        condition: { type: 'line_clear_fail_count', value: 10 },
        points: 20,
        unlocked: false
    },
    multi_failer: {
        id: 'multi_failer',
        name: '有料機能失敗コレクター',
        description: 'ホールド・交換・ライン削除の失敗を合計30回',
        icon: '❌',
        category: 'special',
        condition: { type: 'paid_action_fail_count', value: 30 },
        points: 30,
        unlocked: false
    },
    fail_streak: {
        id: 'fail_streak',
        name: '失敗連鎖',
        description: '1ゲーム中に有料機能失敗を5回連続で発生',
        icon: '💥',
        category: 'special',
        condition: { type: 'fail_streak_count', value: 5 },
        points: 25,
        unlocked: false
    },
    gameover_streak: {
        id: 'gameover_streak',
        name: '連続ゲームオーバー',
        description: '3ゲーム連続でゲームオーバー',
        icon: '🔁',
        category: 'special',
        condition: { type: 'gameover_streak_count', value: 3 },
        points: 30,
        unlocked: false
    },
    panic_hold: {
        id: 'panic_hold',
        name: 'パニックホールド',
        description: 'ゲームオーバー直前にホールド失敗3回',
        icon: '😱',
        category: 'special',
        condition: { type: 'panic_hold_fail_count', value: 3 },
        points: 25,
        unlocked: false
    },
    fail_combo: {
        id: 'fail_combo',
        name: '失敗コンボ',
        description: '1ゲーム中にホールド・交換・ライン削除の失敗をすべて経験',
        icon: '🔄',
        category: 'special',
        condition: { type: 'fail_combo_flag', value: true },
        points: 40,
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
            perfectClearCount: 0,
            blocksPlaced: 0,
            holdCount: 0,
            gameOverScore: null,
            gameOverLines: null,
            gameOverTime: null,
            tripleLineCount: 0,
            nonTetrisLines: 0,
            feverLinesCleared: 0,
            feverExchangeUsed: 0,
            gameOverDuringFever: false
        };
        
        // グローバル統計（localStorage）
        this.globalStats = {
            gamesPlayed: 0,
            totalPlaytime: 0,
            consecutiveDays: 0,
            lastPlayDate: null,
            consecutiveLowScores: 0,
            weekendPlayed: { saturday: false, sunday: false },
            firstPlayDate: null,
            bestScore: 0,
            worstScore: Infinity,
            recentScores: [],
            dailyRecordBreaks: 0,
            lastRecordBreakDate: null,
            consecutiveImprovements: 0,
            milestoneEvents: [],
            secretPattern: []
        };
        this.callbacks = {
            onAchievementUnlocked: null
        };
        
        this.loadProgress();
        this.loadGlobalStats();
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

    loadGlobalStats() {
        try {
            const saved = localStorage.getItem('tetris_global_stats');
            if (saved) {
                this.globalStats = { ...this.globalStats, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('グローバル統計の読み込みに失敗:', error);
        }
    }

    saveGlobalStats() {
        try {
            localStorage.setItem('tetris_global_stats', JSON.stringify(this.globalStats));
        } catch (error) {
            console.warn('グローバル統計の保存に失敗:', error);
        }
    }

    startSession() {
        // 時間統計を更新
        const now = new Date();
        const today = now.toDateString();
        
        // プレイ回数増加
        this.globalStats.gamesPlayed++;
        
        // 初回プレイ日記録
        if (!this.globalStats.firstPlayDate) {
            this.globalStats.firstPlayDate = today;
        }
        
        // 連続日数計算
        if (this.globalStats.lastPlayDate !== today) {
            const lastDate = this.globalStats.lastPlayDate ? new Date(this.globalStats.lastPlayDate) : null;
            const todayDate = new Date(today);
            
            if (lastDate && (todayDate - lastDate) / (1000 * 60 * 60 * 24) === 1) {
                this.globalStats.consecutiveDays++;
            } else if (!lastDate || (todayDate - lastDate) / (1000 * 60 * 60 * 24) > 1) {
                this.globalStats.consecutiveDays = 1;
            }
            this.globalStats.lastPlayDate = today;
        }
        
        // 週末プレイ判定
        const dayOfWeek = now.getDay();
        if (dayOfWeek === 6) this.globalStats.weekendPlayed.saturday = true;
        if (dayOfWeek === 0) this.globalStats.weekendPlayed.sunday = true;
        
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
            perfectClearCount: 0,
            blocksPlaced: 0,
            holdCount: 0,
            gameOverScore: null,
            gameOverLines: null,
            gameOverTime: null,
            tripleLineCount: 0,
            nonTetrisLines: 0,
            feverLinesCleared: 0,
            feverExchangeUsed: 0,
            gameOverDuringFever: false
        };
        
        this.saveGlobalStats();
    }

    updateStats(statType, value) {
        switch (statType) {
            case 'lines_cleared':
                this.sessionStats.linesCleared += value;
                if (value === 3) {
                    this.sessionStats.tripleLineCount++;
                }
                if (value > 0 && value !== 4) {
                    this.sessionStats.nonTetrisLines += value;
                }
                break;
            case 'score':
                this.sessionStats.score = value;
                // スコア更新時に段位も更新
                this.updateDanRank(value);
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
            case 'blocks_placed':
                this.sessionStats.blocksPlaced += value;
                break;
            case 'hold':
                this.sessionStats.holdCount += 1;
                break;
            case 'fever_lines':
                this.sessionStats.feverLinesCleared += value;
                break;
            case 'fever_exchange':
                this.sessionStats.feverExchangeUsed += 1;
                break;
        }

        this.checkAchievements();
    }

    // 段位更新メソッドを追加
    updateDanRank(score) {
        const danRanks = ['無段', '初段', '二段', '三段', '四段', '五段', '六段', '七段', '八段', '九段', '十段', '名人', '竜王', '永世名人', '天帝', '神威', '創世'];
        const danScores = [0, 200, 800, 2000, 4000, 8000, 15000, 25000, 40000, 60000, 90000, 130000, 200000, 300000, 500000, 1000000, 2000000];
        
        // スコアに応じて段位を決定
        for (let i = danScores.length - 1; i >= 0; i--) {
            if (score >= danScores[i]) {
                this.sessionStats.currentDan = danRanks[i];
                break;
            }
        }
    }

    // ゲームオーバー時の統計更新
    updateGameOverStats(score, lines, playTime) {
        this.sessionStats.gameOverScore = score;
        this.sessionStats.gameOverLines = lines;
        this.sessionStats.gameOverTime = playTime;
        
        // 累計プレイ時間更新
        this.globalStats.totalPlaytime += playTime;
        
        // スコア記録更新
        const isNewRecord = score > this.globalStats.bestScore;
        if (isNewRecord) {
            this.globalStats.bestScore = score;
            
            // 1日の記録更新回数チェック
            const today = new Date().toDateString();
            if (this.globalStats.lastRecordBreakDate !== today) {
                this.globalStats.dailyRecordBreaks = 1;
                this.globalStats.lastRecordBreakDate = today;
            } else {
                this.globalStats.dailyRecordBreaks++;
            }
        }
        
        // 最低スコア更新
        if (score < this.globalStats.worstScore) {
            this.globalStats.worstScore = score;
        }
        
        // 直近スコア管理（最大10ゲーム）
        this.globalStats.recentScores.push(score);
        if (this.globalStats.recentScores.length > 10) {
            this.globalStats.recentScores.shift();
        }
        
        // 連続改善チェック
        if (this.globalStats.recentScores.length >= 2) {
            const lastScore = this.globalStats.recentScores[this.globalStats.recentScores.length - 2];
            if (score > lastScore) {
                this.globalStats.consecutiveImprovements++;
            } else {
                this.globalStats.consecutiveImprovements = 0;
            }
        }
        
        // 連続低スコア判定
        if (score <= 100) {
            this.globalStats.consecutiveLowScores++;
        } else {
            this.globalStats.consecutiveLowScores = 0;
        }
        
        // マイルストーンイベント記録
        this.recordMilestoneEvent(score, playTime);
        
        this.saveGlobalStats();
        this.checkAchievements();
    }

    // フィーバー中のゲームオーバー判定
    setGameOverDuringFever(isFeverActive) {
        this.sessionStats.gameOverDuringFever = isFeverActive;
    }

    // マイルストーンイベント記録
    recordMilestoneEvent(score, playTime) {
        const event = {
            score,
            playTime,
            date: new Date().toDateString(),
            gameNumber: this.globalStats.gamesPlayed
        };
        
        this.globalStats.milestoneEvents.push(event);
        
        // 最大100イベントまで保持
        if (this.globalStats.milestoneEvents.length > 100) {
            this.globalStats.milestoneEvents.shift();
        }
    }

    // 秘密パターンチェック
    checkSecretPattern(action) {
        this.globalStats.secretPattern.push(action);
        
        // パターンが長すぎる場合は最初を削除
        if (this.globalStats.secretPattern.length > 10) {
            this.globalStats.secretPattern.shift();
        }
        
        // 特定パターンをチェック（例：上上下下左右左右BA）
        const pattern = this.globalStats.secretPattern.join('');
        if (pattern.includes('UUDDLRLRBA')) {
            this.unlockSecretAchievement('secret_sequence');
        }
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
                case 'exact_score':
                    unlocked = this.sessionStats.score === condition.value;
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
                    // 段位の到達判定（その段位以上に到達したかチェック）
                    const danRanks = ['無段', '初段', '二段', '三段', '四段', '五段', '六段', '七段', '八段', '九段', '十段', '名人', '竜王', '永世名人', '天帝', '神威', '創世'];
                    const currentIndex = danRanks.indexOf(this.sessionStats.currentDan);
                    const targetIndex = danRanks.indexOf(condition.value);
                    unlocked = currentIndex >= targetIndex && targetIndex > 0;
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
                case 'gameover_score':
                    unlocked = this.sessionStats.gameOverScore === condition.value;
                    break;
                case 'gameover_lines':
                    unlocked = this.sessionStats.gameOverLines === condition.value;
                    break;
                case 'quick_death':
                    unlocked = this.sessionStats.gameOverTime !== null && 
                               this.sessionStats.gameOverTime <= condition.time;
                    break;
                case 'zero_blocks_placed':
                    unlocked = this.sessionStats.gameOverScore !== null && 
                               this.sessionStats.blocksPlaced === 0;
                    break;
                case 'single_game_exchange':
                    unlocked = this.sessionStats.exchangeCount >= condition.value;
                    break;
                case 'single_game_hold':
                    unlocked = this.sessionStats.holdCount >= condition.value;
                    break;
                case 'hold_count':
                    unlocked = this.sessionStats.holdCount >= condition.value;
                    break;
                case 'blocks_placed':
                    unlocked = this.sessionStats.blocksPlaced >= condition.value;
                    break;
                case 'single_game_fever':
                    unlocked = this.sessionStats.feverCount >= condition.value;
                    break;
                case 'efficient_score':
                    unlocked = this.sessionStats.score >= condition.score && 
                               this.sessionStats.blocksPlaced <= condition.max_blocks;
                    break;
                case 'no_exchange_score':
                    unlocked = this.sessionStats.score >= condition.score && 
                               this.sessionStats.exchangeCount === 0;
                    break;
                case 'no_hold_score':
                    unlocked = this.sessionStats.score >= condition.score && 
                               this.sessionStats.holdCount === 0;
                    break;
                case 'tetris_only':
                    unlocked = this.sessionStats.tetrisCount >= condition.value && 
                               this.sessionStats.nonTetrisLines === 0;
                    break;
                case 'fever_no_lines':
                    unlocked = this.sessionStats.feverCount > 0 && 
                               this.sessionStats.feverLinesCleared === 0 &&
                               this.sessionStats.gameOverScore !== null;
                    break;
                case 'gameover_during_fever':
                    unlocked = this.sessionStats.gameOverDuringFever;
                    break;
                case 'fever_no_exchange_highscore':
                    unlocked = this.sessionStats.feverCount > 0 && 
                               this.sessionStats.feverExchangeUsed === 0 &&
                               this.sessionStats.score >= condition.score;
                    break;
                case 'triple_lines':
                    unlocked = this.sessionStats.tripleLineCount >= condition.value;
                    break;
                case 'games_played':
                    unlocked = this.globalStats.gamesPlayed >= condition.value;
                    break;
                case 'total_playtime':
                    unlocked = this.globalStats.totalPlaytime >= condition.value;
                    break;
                case 'consecutive_days':
                    unlocked = this.globalStats.consecutiveDays >= condition.value;
                    break;
                case 'inefficient_play':
                    unlocked = this.sessionStats.blocksPlaced >= condition.blocks && 
                               this.sessionStats.gameOverScore !== null &&
                               this.sessionStats.gameOverScore <= condition.max_score;
                    break;
                case 'consecutive_low_scores':
                    unlocked = this.globalStats.consecutiveLowScores >= condition.count;
                    break;
                case 'late_night_play':
                    const lateHour = new Date(this.sessionStats.playStartTime).getHours();
                    unlocked = lateHour >= 2 && lateHour < 5;
                    break;
                case 'early_morning_play':
                    const earlyHour = new Date(this.sessionStats.playStartTime).getHours();
                    unlocked = earlyHour >= 5 && earlyHour < 7;
                    break;
                case 'weekend_play':
                    unlocked = this.globalStats.weekendPlayed.saturday && 
                               this.globalStats.weekendPlayed.sunday;
                    break;
                case 'long_absence_return':
                    const daysSinceLastPlay = this.globalStats.lastPlayDate ? 
                        Math.floor((new Date() - new Date(this.globalStats.lastPlayDate)) / (1000 * 60 * 60 * 24)) : 0;
                    unlocked = daysSinceLastPlay >= condition.days;
                    break;
                // 隠し実績条件
                case 'mystery_combo':
                    unlocked = this.sessionStats.maxCombo === condition.value;
                    break;
                case 'secret_pattern':
                    // 秘密パターンは専用メソッドで解除
                    unlocked = false;
                    break;
                case 'perfect_game':
                    unlocked = this.sessionStats.tetrisCount >= condition.tetris && 
                               this.sessionStats.nonTetrisLines === 0 && condition.no_single;
                    break;
                case 'exact_time_finish':
                    const finishTime = new Date(this.sessionStats.playStartTime + this.sessionStats.gameOverTime);
                    unlocked = finishTime.getMinutes() === condition.minute && 
                               finishTime.getSeconds() === condition.second;
                    break;
                // 成長系実績条件
                case 'score_improvement':
                    const improvement = this.sessionStats.score - this.globalStats.bestScore;
                    unlocked = improvement >= condition.improvement && this.globalStats.bestScore > 0;
                    break;
                case 'consistent_scores':
                    if (this.globalStats.recentScores.length >= condition.games) {
                        const average = this.globalStats.recentScores.reduce((a, b) => a + b) / this.globalStats.recentScores.length;
                        unlocked = average >= condition.average;
                    }
                    break;
                case 'total_improvement':
                    unlocked = this.globalStats.bestScore - this.globalStats.worstScore >= condition.improvement;
                    break;
                case 'daily_records':
                    unlocked = this.globalStats.dailyRecordBreaks >= condition.count;
                    break;
                case 'consecutive_improvements':
                    unlocked = this.globalStats.consecutiveImprovements >= condition.count;
                    break;
                // 履歴系実績条件
                case 'play_duration_months':
                    if (this.globalStats.firstPlayDate) {
                        const months = (new Date() - new Date(this.globalStats.firstPlayDate)) / (1000 * 60 * 60 * 24 * 30);
                        unlocked = months >= condition.months;
                    }
                    break;
                case 'play_duration_years':
                    if (this.globalStats.firstPlayDate) {
                        const years = (new Date() - new Date(this.globalStats.firstPlayDate)) / (1000 * 60 * 60 * 24 * 365);
                        unlocked = years >= condition.years;
                    }
                    break;
                case 'game_history':
                    unlocked = this.globalStats.gamesPlayed >= condition.count;
                    break;
                case 'monthly_daily_play':
                    unlocked = this.globalStats.consecutiveDays >= 30;
                    break;
                case 'nostalgic_performance':
                    const absenceDays = this.globalStats.lastPlayDate ? 
                        Math.floor((new Date() - new Date(this.globalStats.lastPlayDate)) / (1000 * 60 * 60 * 24)) : 0;
                    unlocked = absenceDays >= condition.absence_days && 
                               this.sessionStats.score >= this.globalStats.bestScore * condition.score_ratio;
                    break;
                case 'score_range':
                    unlocked = this.globalStats.bestScore - this.globalStats.worstScore >= condition.range;
                    break;
                case 'milestone_variety':
                    unlocked = this.globalStats.milestoneEvents.length >= condition.count;
                    break;
                case 'rich_statistics':
                    unlocked = this.globalStats.gamesPlayed >= 50 && 
                               this.globalStats.totalPlaytime >= 3600000 && 
                               this.globalStats.milestoneEvents.length >= 20;
                    break;
                case 'long_term_growth':
                    if (this.globalStats.firstPlayDate) {
                        const daysSinceFirst = (new Date() - new Date(this.globalStats.firstPlayDate)) / (1000 * 60 * 60 * 24);
                        unlocked = daysSinceFirst >= 30 && this.globalStats.bestScore >= 2000;
                    }
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

    // 隠し実績の解除メソッド
    unlockSecretAchievement(achievementId) {
        const achievement = this.achievements[achievementId];
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            
            // 隠し実績の真の名前と説明を設定
            if (achievementId === 'secret_sequence') {
                achievement.name = 'コナミコマンダー';
                achievement.description = '秘密のコマンドを入力しました';
            } else if (achievementId === 'mystery_master') {
                achievement.name = '13の魔法使い';
                achievement.description = 'ちょうど13コンボを達成しました';
            } else if (achievementId === 'hidden_champion') {
                achievement.name = '純粋主義者';
                achievement.description = 'テトリスのみで5回達成（他ライン消去なし）';
            } else if (achievementId === 'time_wizard') {
                achievement.name = '時の魔法使い';
                achievement.description = 'ちょうど3分33秒でゲーム終了';
            } else if (achievementId === 'invisible_master') {
                achievement.name = 'インビジブルマスター';
                achievement.description = '見えない手でテトリスを10回達成';
            } else if (achievementId === 'god_mode') {
                achievement.name = 'ゴッドモード';
                achievement.description = '100ブロックで20000点の神効率達成';
            } else if (achievementId === 'matrix_controller') {
                achievement.name = 'マトリックスコントローラー';
                achievement.description = '回転なしで5000点達成';
            } else if (achievementId === 'zen_master') {
                achievement.name = '禅マスター';
                achievement.description = '最小操作で10000点達成';
            } else if (achievementId === 'phantom_clearer') {
                achievement.name = 'ファントムクリアラー';
                achievement.description = 'ゴーストピースのみで100ライン消去';
            } else if (achievementId === 'secret_konami') {
                achievement.name = 'コナミ・レジェンド';
                achievement.description = 'あの伝説のコマンドを入力';
            } else if (achievementId === 'secret_pi') {
                achievement.name = 'π（パイ）マスター';
                achievement.description = '3140点でゲーム終了（π≈3.14）';
            } else if (achievementId === 'secret_fibonacci') {
                achievement.name = 'フィボナッチ探求者';
                achievement.description = 'フィボナッチ数列のスコアを5回達成';
            } else if (achievementId === 'secret_binary') {
                achievement.name = 'バイナリ・ウィザード';
                achievement.description = '2進数パターンのスコア達成';
            } else if (achievementId === 'secret_developer') {
                achievement.name = 'シークレット・デベロッパー';
                achievement.description = '開発者モードを発見しました';
            } else if (achievementId === 'secret_matrix') {
                achievement.name = 'マトリックス・アーキテクト';
                achievement.description = '10行の完璧なパターンを構築';
            } else if (achievementId === 'secret_midnight') {
                achievement.name = 'ミッドナイト・ゲーマー';
                achievement.description = '00:00:00ちょうどにプレイ開始';
            } else if (achievementId === 'secret_rainbow') {
                achievement.name = 'レインボー・マスター';
                achievement.description = '全ピース種類を順番通りに配置';
            } else if (achievementId === 'secret_perfectionist') {
                achievement.name = 'アルティメット・パーフェクショニスト';
                achievement.description = '完璧な操作で5000点達成';
            } else if (achievementId === 'secret_time_traveler') {
                achievement.name = 'タイムトラベラー';
                achievement.description = '時空の歪みを発見しました';
            } else if (achievementId === 'secret_failure_king') {
                achievement.name = '失敗の帝王';
                achievement.description = '100回の失敗を経て真の王となった';
            } else if (achievementId === 'secret_broke_legend') {
                achievement.name = '破産伝説';
                achievement.description = '10ゲーム連続でポイント不足の伝説を築いた';
            } else if (achievementId === 'secret_zen_master') {
                achievement.name = '禅の極意';
                achievement.description = '最小限の操作で3000点の悟りを開いた';
            } else if (achievementId === 'secret_time_attack') {
                achievement.name = 'タイムアタック神';
                achievement.description = '5分で5000点の神速プレイを達成';
            }
            
            this.showAchievementUnlock(achievement);
            this.saveProgress();
            
            if (this.callbacks.onAchievementUnlocked) {
                this.callbacks.onAchievementUnlocked(achievement);
            }
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
            // 隠し実績で未解除のものは表示しない
            if (achievement.hidden && !achievement.unlocked) return;
            
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