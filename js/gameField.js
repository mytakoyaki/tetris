const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;

class GameField {
    constructor() {
        this.field = this.createEmptyField();
        this.currentTetromino = null;
        this.nextTetromino = null;
        this.holdSlots = [null, null]; // 2つのホールドスロット
        this.usedHoldSlots = new Set(); // 使用済みホールド枠
        this.canHold = true;
        
        // 独立したタイマーシステム
        this.dropTimer = 0;
        this.dropInterval = 1000;
        this.lockDelay = 500;
        this.lockTimer = 0;
        this.isLocking = false;
        this.lockResetCount = 0; // ロックリセット回数制限
        this.maxLockResets = 15; // 最大リセット回数
        
        this.softDropDistance = 0;
        this.hardDropDistance = 0;
    }

    createEmptyField() {
        return Array(FIELD_HEIGHT).fill().map(() => Array(FIELD_WIDTH).fill(null));
    }

    spawnTetromino() {
        if (!this.nextTetromino) {
            this.nextTetromino = Tetromino.createRandom();
        }
        
        this.currentTetromino = this.nextTetromino;
        this.nextTetromino = Tetromino.createRandom();
        this.canHold = true;
        this.resetUsedHoldSlots(); // 使用済みホールドスロットをリセット
        this.isLocking = false;
        this.lockTimer = 0;
        this.lockResetCount = 0; // ロックリセット回数をリセット
        this.softDropDistance = 0;
        this.hardDropDistance = 0;

        // 標準的なテトリスのゲームオーバー判定：デフォルトスポーン位置での衝突チェック
        if (this.isColliding(this.currentTetromino)) {
            // スポーン位置での衝突＝ゲームオーバー
            return false;
        }

        return true;
    }

    isColliding(tetromino) {
        const blocks = tetromino.getBlocks();
        
        for (const block of blocks) {
            if (block.x < 0 || block.x >= FIELD_WIDTH || 
                block.y >= FIELD_HEIGHT || 
                (block.y >= 0 && this.field[block.y][block.x] !== null)) {
                return true;
            }
        }
        
        return false;
    }

    canMove(tetromino, dx, dy) {
        const testTetromino = tetromino.clone();
        testTetromino.x += dx;
        testTetromino.y += dy;
        return !this.isColliding(testTetromino);
    }

    canRotate(tetromino) {
        const testTetromino = tetromino.clone();
        testTetromino.rotate();
        
        if (!this.isColliding(testTetromino)) {
            return { canRotate: true, tetromino: testTetromino };
        }

        // 標準的なテトリスの壁キックパターン（上方向への移動は含まない）
        const wallKicks = [
            { x: -1, y: 0 },  // 左
            { x: 1, y: 0 },   // 右
            { x: -2, y: 0 },  // 左2マス
            { x: 2, y: 0 },   // 右2マス
            { x: -1, y: 1 },  // 左下
            { x: 1, y: 1 },   // 右下
            { x: 0, y: 1 }    // 下
        ];

        for (const kick of wallKicks) {
            const kickedTetromino = testTetromino.clone();
            kickedTetromino.x += kick.x;
            kickedTetromino.y += kick.y;
            
            if (!this.isColliding(kickedTetromino)) {
                return { canRotate: true, tetromino: kickedTetromino };
            }
        }

        return { canRotate: false };
    }

    moveTetrominoLeft() {
        if (this.currentTetromino && this.canMove(this.currentTetromino, -1, 0)) {
            this.currentTetromino.moveLeft();
            // 地面にいる場合のみロックタイマーをリセット
            if (!this.canMove(this.currentTetromino, 0, 1)) {
                this.resetLockTimer();
            }
            return true;
        }
        return false;
    }

    moveTetrominoRight() {
        if (this.currentTetromino && this.canMove(this.currentTetromino, 1, 0)) {
            this.currentTetromino.moveRight();
            // 地面にいる場合のみロックタイマーをリセット
            if (!this.canMove(this.currentTetromino, 0, 1)) {
                this.resetLockTimer();
            }
            return true;
        }
        return false;
    }

    moveTetrominoDown(isManualSoftDrop = false) {
        if (!this.currentTetromino) return false;

        if (this.canMove(this.currentTetromino, 0, 1)) {
            this.currentTetromino.moveDown();
            if (isManualSoftDrop) {
                this.softDropDistance++;
            }
            this.resetLockTimer();
            return true;
        } else {
            if (!this.isLocking) {
                this.isLocking = true;
                this.lockTimer = 0;
            }
            return false;
        }
    }

    rotateTetromino() {
        if (!this.currentTetromino) return false;

        const rotationResult = this.canRotate(this.currentTetromino);
        if (rotationResult.canRotate) {
            this.currentTetromino = rotationResult.tetromino;
            // 地面にいる場合のみロックタイマーをリセット
            if (!this.canMove(this.currentTetromino, 0, 1)) {
                this.resetLockTimer();
            }
            return true;
        }
        return false;
    }

    hardDrop() {
        if (!this.currentTetromino) return 0;

        let dropDistance = 0;
        while (this.canMove(this.currentTetromino, 0, 1)) {
            this.currentTetromino.moveDown();
            dropDistance++;
        }
        
        this.hardDropDistance = dropDistance;
        return dropDistance;
    }

    holdTetrominoAction(pointSystem, slotIndex = 0) {
        if (!this.currentTetromino) {
            return false;
        }
        
        if (!this.canHold) {
            return false;
        }

        // スロットインデックスの検証
        if (slotIndex < 0 || slotIndex >= this.holdSlots.length) {
            return false;
        }

        // ポイントシステムとの連携
        if (pointSystem && !pointSystem.canHold()) {
            return false;
        }
        
        if (this.holdSlots[slotIndex]) {
            // ホールドエリアに既にブロックがある場合
            const temp = this.holdSlots[slotIndex];
            this.holdSlots[slotIndex] = new Tetromino(this.currentTetromino.type);
            this.currentTetromino = temp;
            
            // ホールドしたブロックを適切な位置に配置
            this.currentTetromino.x = 3;
            this.currentTetromino.y = 0;
            this.currentTetromino.rotation = 0;
            
            // 衝突が発生した場合、適切な位置を探す
            if (this.isColliding(this.currentTetromino)) {
                let foundValidPosition = false;
                
                // 上から順番に適切な位置を探す
                for (let y = 0; y < 3; y++) {
                    for (let x = 3; x < 7; x++) {
                        this.currentTetromino.x = x;
                        this.currentTetromino.y = y;
                        
                        if (!this.isColliding(this.currentTetromino)) {
                            foundValidPosition = true;
                            break;
                        }
                    }
                    if (foundValidPosition) break;
                }
                
                // それでも見つからない場合、ゲームオーバー
                if (!foundValidPosition) {
                    return false;
                }
            }
        } else {
            // ホールドエリアが空の場合
            this.holdSlots[slotIndex] = new Tetromino(this.currentTetromino.type);
            this.currentTetromino = this.nextTetromino;
            this.nextTetromino = Tetromino.createRandom();
        }

        // ポイント消費
        if (pointSystem) {
            pointSystem.holdNext();
        }

        this.canHold = false;
        this.softDropDistance = 0;
        this.hardDropDistance = 0;
        this.resetLockTimer();
        
        return true;
    }

    // 最初の空きスロットにホールド
    holdToFirstAvailableSlot(pointSystem) {
        for (let i = 0; i < this.holdSlots.length; i++) {
            if (!this.holdSlots[i]) {
                return this.holdTetrominoAction(pointSystem, i);
            }
        }
        // すべてのスロットが埋まっている場合、最初のスロットと交換
        return this.holdTetrominoAction(pointSystem, 0);
    }

    // 特定のスロットにホールド
    holdToSpecificSlot(pointSystem, slotIndex) {
        return this.holdTetrominoAction(pointSystem, slotIndex);
    }

    // ホールドスロットの状態を取得
    getHoldSlots() {
        return this.holdSlots;
    }

    // 使用済みスロットをリセット
    resetUsedHoldSlots() {
        this.usedHoldSlots.clear();
    }

    lockTetromino() {
        if (!this.currentTetromino) return { 
            linesCleared: 0, 
            blocksPlaced: 0, 
            softDropDistance: 0,
            hardDropDistance: 0,
            isHardDrop: false,
            isTSpin: false,
            isAllClear: false
        };

        const blocks = this.currentTetromino.getBlocks();
        let blocksPlaced = 0;
        const currentSoftDropDistance = this.softDropDistance;
        const currentHardDropDistance = this.hardDropDistance;
        
        // Check for T-Spin before placing the piece
        const isTSpin = this.detectTSpin();

        for (const block of blocks) {
            if (block.y >= 0 && block.y < FIELD_HEIGHT && 
                block.x >= 0 && block.x < FIELD_WIDTH) {
                this.field[block.y][block.x] = {
                    type: this.currentTetromino.type,
                    color: this.currentTetromino.shape.color,
                    className: this.currentTetromino.shape.className
                };
                blocksPlaced++;
            }
        }

        this.currentTetromino = null;
        this.isLocking = false;
        this.lockTimer = 0;
        this.softDropDistance = 0;
        this.hardDropDistance = 0;

        const linesCleared = this.clearLines();
        
        // Check for All Clear (Perfect Clear)
        const isAllClear = this.isFieldEmpty();
        
        return { 
            linesCleared, 
            blocksPlaced,
            softDropDistance: currentSoftDropDistance,
            hardDropDistance: currentHardDropDistance,
            isHardDrop: false, // This will be set by the caller for hard drops
            isTSpin,
            isAllClear
        };
    }

    clearLines() {
        let linesCleared = 0;
        
        for (let y = FIELD_HEIGHT - 1; y >= 0; y--) {
            if (this.isLineFull(y)) {
                this.removeLine(y);
                linesCleared++;
            }
        }
        
        return linesCleared;
    }

    clearSpecificLine(targetY) {
        if (targetY < 0 || targetY >= FIELD_HEIGHT) {
            return false;
        }
        
        // 指定された行を削除
        this.removeLine(targetY);
        return true;
    }

    isLineFull(y) {
        for (let x = 0; x < FIELD_WIDTH; x++) {
            if (this.field[y][x] === null) {
                return false;
            }
        }
        return true;
    }

    removeLine(y) {
        // 指定された行を削除して上から下にシフト
        for (let row = y; row > 0; row--) {
            this.field[row] = [...this.field[row - 1]];
        }
        this.field[0] = new Array(FIELD_WIDTH).fill(null);
    }

    resetLockTimer() {
        // ロックリセット回数制限で無限延長を防ぐ
        if (this.lockResetCount < this.maxLockResets) {
            this.isLocking = false;
            this.lockTimer = 0;
            this.lockResetCount++;
        }
        // 制限に達した場合はロックタイマーをリセットしない
    }

    update(deltaTime) {
        if (!this.currentTetromino) {
            // 新しいブロックのスポーンが必要な場合は特別な値を返す
            return { needsSpawn: true };
        }

        // 独立した落下タイマー処理（移動操作に影響されない）
        this.dropTimer += deltaTime;
        if (this.dropTimer >= this.dropInterval) {
            this.dropTimer = 0;
            this.moveTetrominoDown(false); // false = not manual soft drop
        }

        // 独立したロックタイマー処理
        if (this.isLocking) {
            this.lockTimer += deltaTime;
            if (this.lockTimer >= this.lockDelay) {
                return this.lockTetromino();
            }
        }

        return null;
    }

    getFieldWithCurrentTetromino() {
        const displayField = this.field.map(row => [...row]);
        
        if (this.currentTetromino) {
            const blocks = this.currentTetromino.getBlocks();
            for (const block of blocks) {
                if (block.y >= 0 && block.y < FIELD_HEIGHT && 
                    block.x >= 0 && block.x < FIELD_WIDTH) {
                    displayField[block.y][block.x] = {
                        type: this.currentTetromino.type,
                        color: this.currentTetromino.shape.color,
                        className: this.currentTetromino.shape.className,
                        isActive: true
                    };
                }
            }
        }
        
        return displayField;
    }

    getGhostTetromino() {
        if (!this.currentTetromino) return null;

        const ghost = this.currentTetromino.clone();
        while (this.canMove(ghost, 0, 1)) {
            ghost.moveDown();
        }

        return ghost;
    }

    reset() {
        this.field = this.createEmptyField();
        this.currentTetromino = null;
        this.nextTetromino = null;
        this.holdSlots = [null, null]; // 2つのホールドスロット
        this.usedHoldSlots = new Set(); // 使用済みホールド枠
        this.canHold = true;
        this.dropTimer = 0;
        this.lockTimer = 0;
        this.isLocking = false;
        this.softDropDistance = 0;
        this.hardDropDistance = 0;
    }

    setDropSpeed(speed) {
        this.dropInterval = speed;
    }
    
    detectTSpin() {
        if (!this.currentTetromino || this.currentTetromino.type !== 'T') {
            return false;
        }
        
        // Simple T-Spin detection: check if T piece is in a corner configuration
        const blocks = this.currentTetromino.getBlocks();
        const centerBlock = blocks.find(block => 
            block.x === this.currentTetromino.x && 
            block.y === this.currentTetromino.y
        );
        
        if (!centerBlock) return false;
        
        // Check corners around the T center
        const corners = [
            { x: centerBlock.x - 1, y: centerBlock.y - 1 },
            { x: centerBlock.x + 1, y: centerBlock.y - 1 },
            { x: centerBlock.x - 1, y: centerBlock.y + 1 },
            { x: centerBlock.x + 1, y: centerBlock.y + 1 }
        ];
        
        let filledCorners = 0;
        for (const corner of corners) {
            if (corner.x < 0 || corner.x >= FIELD_WIDTH || 
                corner.y < 0 || corner.y >= FIELD_HEIGHT ||
                (corner.y >= 0 && this.field[corner.y][corner.x] !== null)) {
                filledCorners++;
            }
        }
        
        // T-Spin if at least 3 corners are filled
        return filledCorners >= 3;
    }
    
    isFieldEmpty() {
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            for (let x = 0; x < FIELD_WIDTH; x++) {
                if (this.field[y][x] !== null) {
                    return false;
                }
            }
        }
        return true;
    }
}