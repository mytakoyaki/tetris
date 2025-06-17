class FeverMode {
    constructor() {
        this.isActive = false;
        this.timeRemaining = 0;
        this.duration = 20000;
        this.updateTimer = null;
        this.callbacks = {
            onStart: null,
            onEnd: null,
            onTick: null
        };
    }

    start() {
        if (this.isActive) return false;

        this.isActive = true;
        this.timeRemaining = this.duration;
        
        this.showFeverOverlay();
        this.startTimer();
        
        if (this.callbacks.onStart) {
            this.callbacks.onStart();
        }

        return true;
    }

    end() {
        if (!this.isActive) return false;

        this.isActive = false;
        this.timeRemaining = 0;
        
        this.hideFeverOverlay();
        this.stopTimer();
        
        if (this.callbacks.onEnd) {
            this.callbacks.onEnd();
        }

        return true;
    }

    startTimer() {
        this.stopTimer();
        
        this.updateTimer = setInterval(() => {
            this.timeRemaining -= 1000;
            
            if (this.timeRemaining <= 0) {
                this.end();
            } else {
                this.updateDisplay();
                if (this.callbacks.onTick) {
                    this.callbacks.onTick(this.timeRemaining);
                }
            }
        }, 1000);
    }

    stopTimer() {
        if (this.updateTimer) {
            clearInterval(this.updateTimer);
            this.updateTimer = null;
        }
    }

    showFeverOverlay() {
        const overlay = document.getElementById('feverOverlay');
        const feverText = overlay.querySelector('.fever-text');
        const feverTimer = document.getElementById('feverTimer');
        
        if (overlay) {
            overlay.classList.remove('hidden');
            
            if (feverText) {
                feverText.style.animation = 'none';
                feverText.offsetHeight;
                feverText.style.animation = 'feverBounce 0.5s ease-in-out infinite alternate';
            }
        }
        
        this.updateDisplay();
        this.triggerFeverAnimation();
    }

    hideFeverOverlay() {
        const overlay = document.getElementById('feverOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }

    updateDisplay() {
        const timerElement = document.getElementById('feverTimer');
        if (timerElement) {
            const seconds = Math.ceil(this.timeRemaining / 1000);
            timerElement.textContent = seconds;
            
            if (seconds <= 5) {
                timerElement.style.color = '#ff6b6b';
                timerElement.style.animation = 'pulse 0.5s infinite';
            } else {
                timerElement.style.color = '#ff6b6b';
                timerElement.style.animation = 'none';
            }
        }
    }

    triggerFeverAnimation() {
        const gameField = document.getElementById('gameField');
        if (gameField) {
            gameField.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6), inset 0 0 10px rgba(255, 215, 0, 0.1)';
            gameField.style.borderColor = '#ffd700';
        }

        const body = document.body;
        if (body) {
            body.style.background = 'linear-gradient(135deg, #1e3c72, #2a5298, #3a6bb3, #2a5298)';
            body.style.backgroundSize = '200% 200%';
            body.style.animation = 'feverBackground 4s ease infinite';
        }

        this.addFeverCSS();
    }

    removeFeverAnimation() {
        const gameField = document.getElementById('gameField');
        if (gameField) {
            gameField.style.boxShadow = '';
            gameField.style.borderColor = '#ffd700';
        }

        const body = document.body;
        if (body) {
            body.style.background = 'linear-gradient(135deg, #1e3c72, #2a5298)';
            body.style.backgroundSize = '';
            body.style.animation = '';
        }

        this.removeFeverCSS();
    }

    addFeverCSS() {
        if (!document.getElementById('feverStyles')) {
            const style = document.createElement('style');
            style.id = 'feverStyles';
            style.textContent = `
                @keyframes feverBackground {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                .fever-active .cell.filled {
                    box-shadow: 0 0 5px rgba(255, 215, 0, 0.3) !important;
                }
                
                .fever-active .score-popup {
                    color: #ffd700 !important;
                    font-size: 1.3em !important;
                    text-shadow: 2px 2px 4px #000 !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.classList.add('fever-active');
    }

    removeFeverCSS() {
        const style = document.getElementById('feverStyles');
        if (style) {
            style.remove();
        }
        
        document.body.classList.remove('fever-active');
    }

    getTimeRemaining() {
        return this.timeRemaining;
    }

    getTimeRemainingSeconds() {
        return Math.ceil(this.timeRemaining / 1000);
    }

    getProgress() {
        return 1 - (this.timeRemaining / this.duration);
    }

    getIsActive() {
        return this.isActive;
    }

    getRemainingPercentage() {
        return (this.timeRemaining / this.duration) * 100;
    }

    setCallback(event, callback) {
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event] = callback;
        }
    }

    reset() {
        this.end();
        this.removeFeverAnimation();
    }

    update(deltaTime) {
        if (!this.isActive) return;

        this.timeRemaining -= deltaTime;
        
        if (this.timeRemaining <= 0) {
            this.end();
        } else {
            this.updateDisplay();
            if (this.callbacks.onTick) {
                this.callbacks.onTick(this.timeRemaining);
            }
        }
    }

    extendTime(additionalTime) {
        if (this.isActive) {
            this.timeRemaining += additionalTime;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    setDuration(newDuration) {
        this.duration = newDuration;
    }

    getDuration() {
        return this.duration;
    }

    showFeverStartMessage() {
        const message = document.createElement('div');
        message.className = 'fever-start-message';
        message.innerHTML = `
            <div class="fever-start-text">FEVER MODE!</div>
            <div class="fever-start-description">無料交換 & 2倍スコア!</div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
        
        const style = document.createElement('style');
        style.textContent = `
            .fever-start-message {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: #ffd700;
                padding: 30px;
                border-radius: 15px;
                border: 3px solid #ffd700;
                text-align: center;
                z-index: 10000;
                animation: feverStartAnim 3s ease-out forwards;
            }
            
            .fever-start-text {
                font-size: 3em;
                font-weight: bold;
                margin-bottom: 10px;
                text-shadow: 3px 3px 6px #000;
            }
            
            .fever-start-description {
                font-size: 1.2em;
                color: #fff;
            }
            
            @keyframes feverStartAnim {
                0% { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(0.5); 
                }
                20% { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1.2); 
                }
                30% { 
                    transform: translate(-50%, -50%) scale(1); 
                }
                90% { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1); 
                }
                100% { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(0.8); 
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 3000);
    }
}