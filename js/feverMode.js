class FeverMode {
    constructor() {
        this.isActive = false;
        this.timeRemaining = 0;
        this.duration = 25000;
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
        const gameFieldContainer = document.querySelector('.game-field-container');
        const fieldBorderGlow = document.querySelector('.field-border-glow');
        
        if (gameFieldContainer) {
            gameFieldContainer.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 140, 0, 0.05))';
            gameFieldContainer.style.animation = 'feverFieldPulse 2s ease-in-out infinite alternate';
        }
        
        if (fieldBorderGlow) {
            fieldBorderGlow.style.boxShadow = '0 0 40px #ffd700, inset 0 0 40px rgba(255, 215, 0, 0.2)';
            fieldBorderGlow.style.animation = 'feverGlow 1.5s ease-in-out infinite alternate';
        }

        const body = document.body;
        if (body) {
            body.style.background = 'radial-gradient(ellipse at center, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 1) 60%, rgba(15, 15, 15, 1) 100%)';
            body.style.animation = 'feverBackgroundShift 6s ease-in-out infinite';
        }

        this.addParticleEffect();
        this.addFeverCSS();
    }

    removeFeverAnimation() {
        const gameFieldContainer = document.querySelector('.game-field-container');
        const fieldBorderGlow = document.querySelector('.field-border-glow');
        
        if (gameFieldContainer) {
            gameFieldContainer.style.background = 'var(--glass-bg)';
            gameFieldContainer.style.animation = '';
        }
        
        if (fieldBorderGlow) {
            fieldBorderGlow.style.boxShadow = '0 0 30px var(--accent-green), inset 0 0 30px rgba(0, 255, 136, 0.1)';
            fieldBorderGlow.style.animation = '';
        }

        const body = document.body;
        if (body) {
            body.style.background = 'radial-gradient(ellipse at center, var(--secondary-dark) 0%, var(--primary-dark) 100%)';
            body.style.animation = '';
        }

        this.removeParticleEffect();
        this.removeFeverCSS();
    }

    addFeverCSS() {
        if (!document.getElementById('feverStyles')) {
            const style = document.createElement('style');
            style.id = 'feverStyles';
            style.textContent = `
                @keyframes feverBackgroundShift {
                    0% { 
                        background: radial-gradient(ellipse at center, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 1) 60%, rgba(15, 15, 15, 1) 100%);
                    }
                    50% { 
                        background: radial-gradient(ellipse at center, rgba(60, 45, 30, 0.95) 0%, rgba(40, 26, 15, 1) 60%, rgba(25, 15, 10, 1) 100%);
                    }
                    100% { 
                        background: radial-gradient(ellipse at center, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 1) 60%, rgba(15, 15, 15, 1) 100%);
                    }
                }
                
                @keyframes feverFieldPulse {
                    0% { 
                        background: linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 140, 0, 0.04));
                        transform: scale(1);
                    }
                    100% { 
                        background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.08));
                        transform: scale(1.01);
                    }
                }
                
                @keyframes feverGlow {
                    0% { 
                        box-shadow: 0 0 30px #ffd700, inset 0 0 30px rgba(255, 215, 0, 0.15);
                        opacity: 0.6;
                    }
                    100% { 
                        box-shadow: 0 0 50px #ffd700, inset 0 0 50px rgba(255, 215, 0, 0.25);
                        opacity: 0.9;
                    }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                    100% { transform: scale(1); }
                }
                
                @keyframes feverParticleDrift {
                    0% { 
                        transform: translateY(100vh) translateX(-50px) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(-100px) translateX(50px) rotate(360deg);
                        opacity: 0;
                    }
                }
                
                .fever-active .cell.filled {
                    box-shadow: 0 0 8px rgba(255, 215, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
                    border-color: rgba(255, 215, 0, 0.6) !important;
                }
                
                .fever-active .score-popup {
                    background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 140, 0, 0.3)) !important;
                    border-color: rgba(255, 215, 0, 0.8) !important;
                    box-shadow: 0 0 25px rgba(255, 215, 0, 0.5) !important;
                    color: #ffd700 !important;
                }
                
                .fever-active .premium-score {
                    text-shadow: 0 0 15px rgba(255, 215, 0, 0.8) !important;
                    animation: scoreGlow 1.5s ease-in-out infinite alternate !important;
                }
                
                @keyframes scoreGlow {
                    0% { text-shadow: 0 0 15px rgba(255, 215, 0, 0.8); }
                    100% { text-shadow: 0 0 25px rgba(255, 215, 0, 1), 0 0 35px rgba(255, 140, 0, 0.6); }
                }
                
                .fever-particles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }
                
                .fever-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: radial-gradient(circle, #ffd700, #ff8c00);
                    border-radius: 50%;
                    animation: feverParticleDrift 8s linear infinite;
                    box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
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

    addParticleEffect() {
        if (document.querySelector('.fever-particles')) return;
        
        const particleContainer = document.createElement('div');
        particleContainer.className = 'fever-particles';
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'fever-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 4) + 's';
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }
    
    removeParticleEffect() {
        const particles = document.querySelector('.fever-particles');
        if (particles) {
            particles.remove();
        }
    }

    reset() {
        this.end();
        this.removeFeverAnimation();
        this.removeParticleEffect();
        
        const startStyles = document.getElementById('feverStartStyles');
        if (startStyles) {
            startStyles.remove();
        }
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
            <div class="fever-start-container">
                <div class="fever-start-text">FEVER MODE!</div>
                <div class="fever-start-glow"></div>
                <div class="fever-start-description">無料交換 & 2倍スコア!</div>
                <div class="fever-start-sparkles"></div>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'feverStartExit 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 500);
            }
        }, 2500);
        
        if (!document.getElementById('feverStartStyles')) {
            const style = document.createElement('style');
            style.id = 'feverStartStyles';
            style.textContent = `
                .fever-start-message {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 10000;
                    animation: feverStartAnim 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .fever-start-container {
                    background: var(--glass-bg);
                    backdrop-filter: blur(30px);
                    border: 2px solid rgba(255, 215, 0, 0.6);
                    border-radius: 20px;
                    padding: 40px 60px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }
                
                .fever-start-text {
                    font-size: 4em;
                    font-weight: 900;
                    margin-bottom: 20px;
                    background: var(--gold-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: 4px;
                    position: relative;
                    z-index: 3;
                    animation: feverTextPulse 1.5s ease-in-out infinite alternate;
                }
                
                .fever-start-glow {
                    position: absolute;
                    top: 20%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 150%;
                    height: 100%;
                    background: radial-gradient(ellipse, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
                    filter: blur(20px);
                    z-index: 1;
                    animation: feverGlowPulse 2s ease-in-out infinite alternate;
                }
                
                .fever-start-description {
                    font-size: 1.4em;
                    color: var(--text-primary);
                    font-weight: 600;
                    letter-spacing: 1px;
                    z-index: 3;
                    position: relative;
                }
                
                .fever-start-sparkles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 1px, transparent 1px);
                    background-size: 25px 25px;
                    animation: sparkleRotate 4s linear infinite;
                    opacity: 0.7;
                    z-index: 2;
                }
                
                @keyframes feverStartAnim {
                    0% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(0.3) rotateY(-15deg);
                    }
                    100% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1) rotateY(0deg);
                    }
                }
                
                @keyframes feverStartExit {
                    0% { 
                        opacity: 1; 
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(-50%, -50%) scale(1.2) rotateY(15deg);
                    }
                }
                
                @keyframes feverTextPulse {
                    0% { 
                        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
                        transform: scale(1);
                    }
                    100% { 
                        text-shadow: 0 0 35px rgba(255, 215, 0, 1), 0 0 50px rgba(255, 140, 0, 0.8);
                        transform: scale(1.05);
                    }
                }
                
                @keyframes feverGlowPulse {
                    0% { 
                        opacity: 0.3;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% { 
                        opacity: 0.6;
                        transform: translate(-50%, -50%) scale(1.2);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}