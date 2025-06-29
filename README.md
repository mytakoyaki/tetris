# 🎮 ClaudeTetris

**PCユーザー専用の革新的テトリスゲーム**

[🎮 **今すぐプレイ**](https://mytakoyaki.github.io/tetris/)

従来のテトリスに「ポイントシステム」「フィーバーモード」「実績システム」を追加した、戦略性と長期プレイを重視した次世代テトリス体験。

## ✨ 特徴

### 🎯 コアシステム
- **ポイント&エクスチェンジシステム**: 運に左右されない戦略的プレイ
- **フィーバーモード**: 20ブロック設置で発動する30秒間の超得点チャンス
- **段位システム**: 無段～永世名人までの明確なプレイヤー成長指標
- **実績システム**: 基本・技術・特殊・チャレンジ実績で長期モチベーション
- **レスポンシブレイアウト**: 縦横切り替え可能なPC最適化デザイン

### 🎮 推奨環境
- **対象**: PCユーザー専用（デスクトップ・ノートPC）
- **画面サイズ**: 1200px以上推奨（全画面プレイ最適化）
- **ブラウザ**: Chrome, Firefox, Safari, Edge（最新版）
- **操作**: キーボード操作専用

## 🕹️ 操作方法

### 基本操作
| キー | 動作 | 詳細 |
|------|------|------|
| `←` `→` | 左右移動 | テトリミノを左右に移動 |
| `↑` | 回転 | テトリミノを時計回りに回転（ウォールキック対応） |
| `↓` | ソフトドロップ | 加速落下（0.5P/行のボーナス付き） |
| `スペース` | ハードドロップ | 即座に底まで落下（1P/行のボーナス付き） |
| `C` | ホールド1 | テトリミノを1番目のホールドスロットに保留（15P） |
| `V` | ホールド2 | テトリミノを2番目のホールドスロットに保留（15P） |
| `E` | 交換 | NEXTテトリミノを変更（累積コスト制） |
| `L` | ライン削除 | 最下段のラインを削除（200P） |

### UI操作
| 操作 | 動作 |
|------|------|
| `⟲` ボタン（右上） | 縦横レイアウト切り替え |
| 各種ボタン | 実績・ランキング・設定画面アクセス |

## 🎲 ゲームシステム詳細

### 💰 ポイントシステム
#### ポイント獲得
- **ブロック設置**: 10ポイント
- **ソフトドロップ**: 0.5ポイント/行
- **ハードドロップ**: 1ポイント/行
- **実績達成**: 実績に応じて5～200ポイント

#### 有料機能
- **ホールド**: 15ポイント（2スロット利用可能）
- **交換**: 累積コスト制（45P → 65P → 90P → 120P → 160P）
- **ライン削除**: 200ポイント（最下段のラインを削除）

#### 交換システム
- **累積コスト制**: 45P → 65P → 90P → 120P → 160P
- **ブロック設置でリセット**: 新しいテトリミノ設置時にコストがリセット
- **フィーバー中は無料**: フィーバーモード中は無制限に無料交換可能

### 🔥 フィーバーモード
- **発動条件**: 20ブロック設置（自動発動）
- **持続時間**: 30秒間
- **効果**:
  - スコア4倍
  - 無制限無料交換
  - 専用視覚エフェクト

### 📊 スコアシステム
#### 基本スコア
| ライン数 | 基本スコア | 説明 |
|----------|------------|------|
| 1ライン | 100点 | シングル |
| 2ライン | 400点 | ダブル |
| 3ライン | 1000点 | トリプル |
| 4ライン | 2000点 | テトリス |

#### ボーナス計算
- **レベル倍率**: 1.0～2.0倍（レベル1～30）
- **フィーバー倍率**: 4倍
- **T-Spinボーナス**: 
  - T-Spin Single: 2000点
  - T-Spin Double: 5000点
  - T-Spin Triple: 10000点
- **Back-to-Backボーナス**: 2.0倍（テトリス・T-Spin連続時）
- **コンボボーナス**: 連続ライン消去で最大2.0倍まで加算
- **パーフェクトクリアボーナス**: 30000点

### 🏆 段位システム
```
無段(0点) → 初段(200点) → 二段(800点) → 三段(2,000点)
→ 四段(4,000点) → 五段(8,000点) → 六段(15,000点) → 七段(25,000点)
→ 八段(40,000点) → 九段(60,000点) → 十段(90,000点)
→ 名人(130,000点) → 竜王(200,000点) → 永世名人(300,000点)
```

### ⏱️ レベル＆時間システム
- **自動レベルアップ**: 30秒ごと（最大レベル30）
- **落下速度**: レベルに応じて段階的に加速
- **スコア倍率**: レベル上昇と共に増加（最大2.0倍）

## 🎯 実績システム

### 実績カテゴリ（シンプル版）
- 基本
- スコア
- 技術
- チャレンジ
- 特殊/やりこみ

※各カテゴリで多様な達成目標・称号が用意されています。

## 📱 レイアウト切り替え

### 横向きレイアウト（デフォルト・3エリア構成）
```
┌─────────┬─────────────────┬─────────┐
│ HOLD 1  │                 │ SCORE   │
│ HOLD 2  │   ゲームフィールド    │ POINTS  │
│ LEVEL   │     (10×20)     │ NEXT    │
│ FEVER   │                 │ 統計情報 │
│ 段位表示 │                 │         │
└─────────┴─────────────────┴─────────┘
```

### 縦向きレイアウト（縦積み構成）
```
┌─────────────────────────┐
│      ゲームフィールド        │
│        (10×20)           │
├─────────────────────────┤
│HOLD1│HOLD2│LEVEL│FEVER │
├─────┼─────┼─────┼──────┤
│SCORE│POINTS│NEXT│段位表示│
└─────┴─────┴─────┴──────┘
```

## 🎯 攻略ガイド

### 初心者向け戦略
1. **ポイント蓄積重視**
   - まずは安定してブロック設置でポイント獲得
   - 45ポイント貯まったら積極的に交換使用
   - 無理にライン消去を狙わない

2. **フィーバーモード活用**
   - 20ブロック設置後のフィーバーが最重要
   - フィーバー中は無料交換でベストな形を追求
   - スコア4倍のチャンスを最大活用

3. **基本実績の達成**
   - 簡単な実績から順番にクリア
   - 実績ポイントボーナスを活用

### 中級者向け戦略
1. **技術習得**
   - T-Spin技術のマスター
   - コンボシステムの理解と活用
   - Back-to-Backボーナスの狙い方

2. **効率的なポイント管理**
   - フィーバー前は交換を控えめに
   - 累積コストを考慮した計画的使用
   - ホールド機能との使い分け

3. **中級実績の攻略**
   - テクニカル実績への挑戦
   - 特定スコア実績の達成

### 上級者向け戦略
1. **高スコア攻略**
   - パーフェクトクリア狙い
   - 複数フィーバーモードの活用
   - 最高段位（永世名人）への到達

2. **チャレンジ実績**
   - 制限プレイでの高スコア
   - スピードラン記録
   - 効率性チャレンジ

3. **有料機能の戦略的活用**
   - ライン削除のタイミング
   - ホールドスロットの効率的な使い分け

## 🔧 技術仕様

### データ管理
- **ローカルストレージ**: スコア・実績・統計情報をブラウザに保存
- **プライバシー**: 完全なオフライン動作、外部データ送信なし
- **パフォーマンス**: 60fps保証、GPU加速対応

### 対応機能
- **レスポンシブデザイン**: PC大画面専用最適化
- **キーボードショートカット**: 全操作キーボード対応
- **視覚エフェクト**: フィーバーモード・段位昇格等の特殊演出

### 今後の実装予定
- **サウンドシステム**: BGM・効果音・音量調整
- **キーカスタマイズ**: キーバインド変更機能
- **追加実績**: さらなる多様な実績
- **詳細統計**: プレイ分析・グラフ表示

## 🏆 目標とやりこみ要素

### 短期目標
- 初段昇格（200点）
- 基本実績10個達成
- フィーバーモード10回発動

### 中期目標
- 名人昇格（130,000点）
- テクニカル実績の習得
- チャレンジ実績への挑戦

### 長期目標
- 永世名人到達（300,000点）
- 全実績コンプリート
- パーフェクトクリアマスター達成

### 究極目標
- 1,000,000点（ミリオンプレイヤー）
- 完全制覇

---

## 🎮 今すぐプレイを始めよう！

**ClaudeTetris**で新しいテトリス体験を楽しもう！
戦略的にポイントを貯めて、フィーバーモードで大量得点を狙い、実績達成を目指そう！

🏆 **永世名人への道のりが、今始まる！**

- **多彩な実績システム**（スコア・技術・チャレンジ・やりこみ称号など）