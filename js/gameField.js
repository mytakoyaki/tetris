const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;

class GameField {
    constructor() {
        this.field = this.createEmptyField();
        this.currentTetromino = null;
        this.nextTetromino = null;
        this.holdTetromino = null;
        this.canHold = true;
        this.dropTimer = 0;
        this.dropInterval = 1000;
        this.lockDelay = 500;
        this.lockTimer = 0;
        this.isLocking = false;
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
        this.isLocking = false;
        this.lockTimer = 0;

        if (this.isColliding(this.currentTetromino)) {
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

        const wallKicks = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: -2, y: 0 },
            { x: 2, y: 0 }
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
            this.resetLockTimer();
            return true;
        }
        return false;
    }

    moveTetrominoRight() {
        if (this.currentTetromino && this.canMove(this.currentTetromino, 1, 0)) {
            this.currentTetromino.moveRight();
            this.resetLockTimer();
            return true;
        }
        return false;
    }

    moveTetrominoDown(force = false) {
        if (!this.currentTetromino) return false;

        if (this.canMove(this.currentTetromino, 0, 1)) {
            this.currentTetromino.moveDown();
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
            this.resetLockTimer();
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
        
        this.lockTetromino();
        return dropDistance;
    }

    holdTetromino() {
        if (!this.currentTetromino || !this.canHold) return false;

        if (this.holdTetromino) {
            const temp = this.holdTetromino;
            this.holdTetromino = new Tetromino(this.currentTetromino.type);
            this.currentTetromino = temp;
            this.currentTetromino.x = 3;
            this.currentTetromino.y = 0;
            this.currentTetromino.rotation = 0;
        } else {
            this.holdTetromino = new Tetromino(this.currentTetromino.type);
            this.currentTetromino = this.nextTetromino;
            this.nextTetromino = Tetromino.createRandom();
        }

        this.canHold = false;
        this.resetLockTimer();
        return true;
    }

    lockTetromino() {
        if (!this.currentTetromino) return { linesCleared: 0, blocksPlaced: 0 };

        const blocks = this.currentTetromino.getBlocks();
        let blocksPlaced = 0;

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

        const linesCleared = this.clearLines();
        
        return { linesCleared, blocksPlaced };
    }

    clearLines() {
        const linesToClear = [];
        
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            if (this.field[y].every(cell => cell !== null)) {
                linesToClear.push(y);
            }
        }

        for (const line of linesToClear) {
            this.field.splice(line, 1);
            this.field.unshift(Array(FIELD_WIDTH).fill(null));
        }

        return linesToClear.length;
    }

    resetLockTimer() {
        this.isLocking = false;
        this.lockTimer = 0;
    }

    update(deltaTime) {
        if (!this.currentTetromino) return null;

        this.dropTimer += deltaTime;

        if (this.dropTimer >= this.dropInterval) {
            this.dropTimer = 0;
            this.moveTetrominoDown();
        }

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
        this.holdTetromino = null;
        this.canHold = true;
        this.dropTimer = 0;
        this.lockTimer = 0;
        this.isLocking = false;
    }

    setDropSpeed(level) {
        const baseSpeed = 1000;
        const speedIncrease = Math.min(level * 50, 800);
        this.dropInterval = Math.max(baseSpeed - speedIncrease, 100);
    }
}