/* ============================================
   BGC: THE DUAL-BIO SYNERGY — Thank You Page
   Animation Engine & Interactive Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // === CONFIGURATION ===
    const STAGE_TIMINGS = {
        stage1Duration: 3500,   // How long Stage 1 (logo) shows
        stage2Duration: 5000,   // How long Stage 2 (thank you) shows
        transitionTime: 800,    // Fade transition time
    };

    const PARTICLE_CONFIG = {
        count: 40,
        colors: ['#f472b6', '#4ade80', '#06b6d4', '#fbbf24', '#a855f7', '#f9a8d4'],
        minSize: 1,
        maxSize: 3,
        speed: 0.3,
    };

    // === PARTICLE SYSTEM (Background) ===
    const particleCanvas = document.getElementById('particleCanvas');
    const pCtx = particleCanvas.getContext('2d');
    let particles = [];

    function resizeParticleCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = PARTICLE_CONFIG.minSize + Math.random() * (PARTICLE_CONFIG.maxSize - PARTICLE_CONFIG.minSize);
            this.color = PARTICLE_CONFIG.colors[Math.floor(Math.random() * PARTICLE_CONFIG.colors.length)];
            this.speedX = (Math.random() - 0.5) * PARTICLE_CONFIG.speed;
            this.speedY = (Math.random() - 0.5) * PARTICLE_CONFIG.speed;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.opacitySpeed = (Math.random() - 0.5) * 0.005;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulsePhase += 0.02;
            this.opacity += this.opacitySpeed;

            if (this.opacity <= 0.05 || this.opacity >= 0.6) {
                this.opacitySpeed *= -1;
            }

            if (this.x < -10 || this.x > particleCanvas.width + 10 ||
                this.y < -10 || this.y > particleCanvas.height + 10) {
                this.reset();
            }
        }

        draw() {
            const pulse = Math.sin(this.pulsePhase) * 0.5 + 1;
            pCtx.beginPath();
            pCtx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
            pCtx.fillStyle = this.color;
            pCtx.globalAlpha = this.opacity;
            pCtx.fill();
            
            // Glow effect
            pCtx.beginPath();
            pCtx.arc(this.x, this.y, this.size * pulse * 3, 0, Math.PI * 2);
            pCtx.fillStyle = this.color;
            pCtx.globalAlpha = this.opacity * 0.15;
            pCtx.fill();
            
            pCtx.globalAlpha = 1;
        }
    }

    function initParticles() {
        resizeParticleCanvas();
        particles = [];
        for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    // === LOTUS PETAL RAIN ===
    const lotusRainContainer = document.getElementById('lotusRain');
    const petalEmojis = ['🌸', '🪷', '💮', '✿', '❀'];

    function createPetal() {
        const petal = document.createElement('span');
        petal.className = 'lotus-petal';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
        petal.style.animationDuration = (6 + Math.random() * 8) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        lotusRainContainer.appendChild(petal);

        // Cleanup after animation
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 16000);
    }

    function startPetalRain() {
        // Initial burst
        for (let i = 0; i < 8; i++) {
            setTimeout(() => createPetal(), i * 300);
        }
        // Continuous gentle rain
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                createPetal();
            }
        }, 2000);
    }

    // === BUBBLES (Water Hyacinth) ===
    const bubblesContainer = document.getElementById('bubbles');

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = 8 + Math.random() * 25;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = (8 + Math.random() * 12) + 's';
        bubble.style.animationDelay = Math.random() * 3 + 's';
        bubblesContainer.appendChild(bubble);

        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 22000);
    }

    function startBubbles() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createBubble(), i * 500);
        }
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                createBubble();
            }
        }, 3000);
    }

    // === SPARKLES (Stage 2) ===
    const sparkleContainer = document.getElementById('sparkles');

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
        const size = 3 + Math.random() * 5;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkleContainer.appendChild(sparkle);
    }

    function initSparkles() {
        for (let i = 0; i < 15; i++) {
            createSparkle();
        }
    }

    // === CONFETTI SYSTEM ===
    const confettiCanvas = document.getElementById('confettiCanvas');
    const cCtx = confettiCanvas.getContext('2d');
    let confettiPieces = [];
    let confettiActive = false;

    function resizeConfettiCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * confettiCanvas.width;
            this.y = -20 - Math.random() * 100;
            this.width = 6 + Math.random() * 8;
            this.height = 4 + Math.random() * 6;
            this.color = PARTICLE_CONFIG.colors[Math.floor(Math.random() * PARTICLE_CONFIG.colors.length)];
            this.speedY = 1.5 + Math.random() * 3;
            this.speedX = (Math.random() - 0.5) * 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.opacity = 1;
            this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            this.speedX += (Math.random() - 0.5) * 0.1;
            
            if (this.y > confettiCanvas.height - 100) {
                this.opacity -= 0.02;
            }
        }

        draw() {
            cCtx.save();
            cCtx.translate(this.x, this.y);
            cCtx.rotate((this.rotation * Math.PI) / 180);
            cCtx.globalAlpha = Math.max(0, this.opacity);
            cCtx.fillStyle = this.color;

            if (this.shape === 'rect') {
                cCtx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            } else {
                cCtx.beginPath();
                cCtx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                cCtx.fill();
            }

            cCtx.restore();
        }

        isDead() {
            return this.opacity <= 0 || this.y > confettiCanvas.height + 20;
        }
    }

    function launchConfetti() {
        confettiActive = true;
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                confettiPieces.push(new ConfettiPiece());
            }, i * 30);
        }

        // Second wave
        setTimeout(() => {
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    confettiPieces.push(new ConfettiPiece());
                }, i * 50);
            }
        }, 1500);
    }

    function animateConfetti() {
        if (!confettiActive && confettiPieces.length === 0) {
            requestAnimationFrame(animateConfetti);
            return;
        }

        cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiPieces.forEach(p => {
            p.update();
            p.draw();
        });
        confettiPieces = confettiPieces.filter(p => !p.isDead());

        if (confettiPieces.length === 0) {
            confettiActive = false;
        }

        requestAnimationFrame(animateConfetti);
    }

    // === STAGE MANAGEMENT ===
    const stages = {
        stage1: document.getElementById('stage1'),
        stage2: document.getElementById('stage2'),
        stage3: document.getElementById('stage3'),
    };

    function transitionStage(fromId, toId, callback) {
        const from = stages[fromId];
        const to = stages[toId];

        from.classList.add('fade-out');
        
        setTimeout(() => {
            from.classList.remove('active', 'fade-out');
            from.style.display = 'none';
            
            to.style.display = 'flex';
            // Force reflow
            to.offsetHeight;
            to.classList.add('active');
            
            // Trigger animate-items inside the new stage
            setTimeout(() => {
                const items = to.querySelectorAll('.animate-item');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, i * 200);
                });

                // If stage 3, trigger team member animations
                if (toId === 'stage3') {
                    const members = to.querySelectorAll('.team-member');
                    members.forEach(member => {
                        member.classList.add('visible');
                    });
                }
            }, 300);

            if (callback) callback();
        }, STAGE_TIMINGS.transitionTime);
    }

    function startStageSequence() {
        // Stage 1 is already active
        setTimeout(() => {
            transitionStage('stage1', 'stage2', () => {
                initSparkles();
            });
        }, STAGE_TIMINGS.stage1Duration);

        setTimeout(() => {
            transitionStage('stage2', 'stage3', () => {
                // Launch confetti when stage 3 appears
                setTimeout(() => {
                    launchConfetti();
                }, 800);
            });
        }, STAGE_TIMINGS.stage1Duration + STAGE_TIMINGS.stage2Duration);
    }

    // === INITIALIZATION ===
    function init() {
        // Setup canvases
        resizeParticleCanvas();
        resizeConfettiCanvas();

        // Start ambient effects
        initParticles();
        animateParticles();
        startPetalRain();
        startBubbles();
        animateConfetti();

        // Start the stage sequence
        startStageSequence();

        // Handle resize
        window.addEventListener('resize', () => {
            resizeParticleCanvas();
            resizeConfettiCanvas();
        });

        // Re-launch confetti on click/tap (fun interaction!)
        document.addEventListener('click', (e) => {
            // Only if on stage 3
            if (stages.stage3.classList.contains('active')) {
                launchConfetti();
                
                // Create burst of petals at click position
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => createPetal(), i * 100);
                }
            }
        });
    }

    init();
});
