const TETROMINO_TYPES = {
    I: {
        color: '#00f0f0',
        className: 'tetromino-I',
        rotations: [
            [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
            [[0,0,1,0], [0,0,1,0], [0,0,1,0], [0,0,1,0]],
            [[0,0,0,0], [0,0,0,0], [1,1,1,1], [0,0,0,0]],
            [[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]]
        ]
    },
    O: {
        color: '#f0f000',
        className: 'tetromino-O',
        rotations: [
            [[0,1,1,0], [0,1,1,0], [0,0,0,0], [0,0,0,0]]
        ]
    },
    T: {
        color: '#a000f0',
        className: 'tetromino-T',
        rotations: [
            [[0,1,0,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]],
            [[0,1,0,0], [0,1,1,0], [0,1,0,0], [0,0,0,0]],
            [[0,0,0,0], [1,1,1,0], [0,1,0,0], [0,0,0,0]],
            [[0,1,0,0], [1,1,0,0], [0,1,0,0], [0,0,0,0]]
        ]
    },
    S: {
        color: '#00f000',
        className: 'tetromino-S',
        rotations: [
            [[0,1,1,0], [1,1,0,0], [0,0,0,0], [0,0,0,0]],
            [[0,1,0,0], [0,1,1,0], [0,0,1,0], [0,0,0,0]],
            [[0,0,0,0], [0,1,1,0], [1,1,0,0], [0,0,0,0]],
            [[1,0,0,0], [1,1,0,0], [0,1,0,0], [0,0,0,0]]
        ]
    },
    Z: {
        color: '#f00000',
        className: 'tetromino-Z',
        rotations: [
            [[1,1,0,0], [0,1,1,0], [0,0,0,0], [0,0,0,0]],
            [[0,0,1,0], [0,1,1,0], [0,1,0,0], [0,0,0,0]],
            [[0,0,0,0], [1,1,0,0], [0,1,1,0], [0,0,0,0]],
            [[0,1,0,0], [1,1,0,0], [1,0,0,0], [0,0,0,0]]
        ]
    },
    J: {
        color: '#0000f0',
        className: 'tetromino-J',
        rotations: [
            [[1,0,0,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]],
            [[0,1,1,0], [0,1,0,0], [0,1,0,0], [0,0,0,0]],
            [[0,0,0,0], [1,1,1,0], [0,0,1,0], [0,0,0,0]],
            [[0,1,0,0], [0,1,0,0], [1,1,0,0], [0,0,0,0]]
        ]
    },
    L: {
        color: '#f0a000',
        className: 'tetromino-L',
        rotations: [
            [[0,0,1,0], [1,1,1,0], [0,0,0,0], [0,0,0,0]],
            [[0,1,0,0], [0,1,0,0], [0,1,1,0], [0,0,0,0]],
            [[0,0,0,0], [1,1,1,0], [1,0,0,0], [0,0,0,0]],
            [[1,1,0,0], [0,1,0,0], [0,1,0,0], [0,0,0,0]]
        ]
    }
};

const TETROMINO_NAMES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

class Tetromino {
    constructor(type, x = 3, y = 0) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.rotation = 0;
        this.shape = TETROMINO_TYPES[type];
    }

    getCurrentRotation() {
        return this.shape.rotations[this.rotation];
    }

    getNextRotation() {
        const nextRotation = (this.rotation + 1) % this.shape.rotations.length;
        return this.shape.rotations[nextRotation];
    }

    rotate() {
        this.rotation = (this.rotation + 1) % this.shape.rotations.length;
    }

    moveDown() {
        this.y++;
    }

    moveLeft() {
        this.x--;
    }

    moveRight() {
        this.x++;
    }

    moveUp() {
        this.y--;
    }

    getBlocks() {
        const blocks = [];
        const rotation = this.getCurrentRotation();
        
        for (let row = 0; row < rotation.length; row++) {
            for (let col = 0; col < rotation[row].length; col++) {
                if (rotation[row][col]) {
                    blocks.push({
                        x: this.x + col,
                        y: this.y + row
                    });
                }
            }
        }
        
        return blocks;
    }

    getBlocksForRotation(rotation) {
        const blocks = [];
        
        for (let row = 0; row < rotation.length; row++) {
            for (let col = 0; col < rotation[row].length; col++) {
                if (rotation[row][col]) {
                    blocks.push({
                        x: this.x + col,
                        y: this.y + row
                    });
                }
            }
        }
        
        return blocks;
    }

    clone() {
        const cloned = new Tetromino(this.type, this.x, this.y);
        cloned.rotation = this.rotation;
        return cloned;
    }

    static getRandomType() {
        return TETROMINO_NAMES[Math.floor(Math.random() * TETROMINO_NAMES.length)];
    }

    static createRandom() {
        return new Tetromino(Tetromino.getRandomType());
    }
}

function createPreviewCanvas(tetromino, size = 20) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 4 * size;
    canvas.height = 4 * size;
    
    const rotation = tetromino.getCurrentRotation();
    
    ctx.fillStyle = tetromino.shape.color;
    
    for (let row = 0; row < rotation.length; row++) {
        for (let col = 0; col < rotation[row].length; col++) {
            if (rotation[row][col]) {
                ctx.fillRect(col * size, row * size, size - 1, size - 1);
            }
        }
    }
    
    return canvas;
}