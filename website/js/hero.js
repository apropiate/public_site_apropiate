// Enhanced Hero Section JavaScript - js/hero.js

class EnhancedHero {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initProgressBars();
        this.simulatePaymentProcessing();
        this.initFloatingAnimations();
    }

    bindEvents() {
        // Calculate savings button
        const calculateBtn = document.querySelector('.calculate-button');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateSavings());
        }

        // Input field interactions
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.onInputFocus(e));
            input.addEventListener('blur', (e) => this.onInputBlur(e));
            input.addEventListener('input', (e) => this.onInputChange(e));
        });

        // Auto-calculate on input change
        const rentInput = document.getElementById('monthlyRent');
        const initialInput = document.getElementById('initialPayment');
        
        if (rentInput) {
            rentInput.addEventListener('input', () => this.autoCalculate());
        }
        
        if (initialInput) {
            initialInput.addEventListener('input', () => this.autoCalculate());
        }
    }

    onInputFocus(e) {
        const inputGroup = e.target.closest('.input-group');
        if (inputGroup) {
            inputGroup.classList.add('focused');
        }
    }

    onInputBlur(e) {
        const inputGroup = e.target.closest('.input-group');
        if (inputGroup) {
            inputGroup.classList.remove('focused');
        }
    }

    onInputChange(e) {
        // Format currency inputs
        if (e.target.placeholder.includes('$') || e.target.value.includes('$')) {
            let value = e.target.value.replace(/[^\d]/g, '');
            if (value) {
                e.target.value = '$' + parseInt(value).toLocaleString();
            }
        }
    }

    async calculateSavings() {
        const calculateBtn = document.querySelector('.calculate-button');
        const buttonText = calculateBtn.querySelector('span');
        const buttonLoading = calculateBtn.querySelector('.button-loading');
        
        // Show loading state
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'flex';
        calculateBtn.disabled = true;

        // Get input values
        const rentValue = this.parseMoneyValue(document.getElementById('monthlyRent')?.value || '$1,200');
        const initialValue = this.parseMoneyValue(document.getElementById('initialPayment')?.value || '$15,000');
        
        // Simulate calculation time
        await this.delay(2000);

        // Calculate results
        const results = this.performCalculations(rentValue, initialValue);
        
        // Update displays
        this.updateResults(results);
        this.animateProgressBars(results);
        this.triggerPaymentProcessing();

        // Hide loading state
        buttonLoading.style.display = 'none';
        buttonText.style.display = 'block';
        calculateBtn.disabled = false;

        // Show success feedback
        this.showCalculationSuccess();
    }

    parseMoneyValue(value) {
        return parseInt(value.replace(/[^\d]/g, '')) || 0;
    }

    performCalculations(rent, initial) {
        const homePrice = 300000; // Default home price
        const savingsRate = 0.75; // 75% of rent goes to savings
        const monthlySavings = Math.round(rent * savingsRate);
        const remainingAmount = homePrice - initial;
        const monthsToOwn = Math.ceil(remainingAmount / monthlySavings);
        const yearsToOwn = (monthsToOwn / 12).toFixed(1);
        const totalSaved = initial + (monthlySavings * monthsToOwn);
        const currentProgress = Math.round((initial / homePrice) * 100);
        const timeProgress = Math.max(0, Math.min(100, 100 - (monthsToOwn / 60) * 100)); // 5 years max

        return {
            monthlySavings,
            yearsToOwn,
            totalSaved,
            currentProgress,
            timeProgress,
            monthsToOwn
        };
    }

    updateResults(results) {
        // Update total savings
        const totalSavingsEl = document.getElementById('totalSavings');
        if (totalSavingsEl) {
            this.animateValue(totalSavingsEl, 0, results.totalSaved, 1500, (value) => {
                return '$' + Math.round(value).toLocaleString();
            });
        }

        // Update savings indicator
        const savingsAmount = document.querySelector('.savings-amount');
        if (savingsAmount) {
            this.animateValue(savingsAmount, 0, results.currentProgress, 1000, (value) => {
                return Math.round(value) + '% completado';
            });
        }

        // Update time remaining
        const progressPercent = document.querySelectorAll('.progress-percent');
        if (progressPercent[1]) {
            progressPercent[1].textContent = Math.round(results.monthsToOwn) + ' meses';
        }
    }

    animateProgressBars(results) {
        const progressFills = document.querySelectorAll('.progress-fill');
        
        // Animate progress bar 1 (savings progress)
        if (progressFills[0]) {
            setTimeout(() => {
                progressFills[0].style.width = results.currentProgress + '%';
                progressFills[0].setAttribute('data-progress', results.currentProgress);
            }, 500);
        }

        // Animate progress bar 2 (time progress)
        if (progressFills[1]) {
            setTimeout(() => {
                progressFills[1].style.width = results.timeProgress + '%';
                progressFills[1].setAttribute('data-progress', results.timeProgress);
            }, 1000);
        }
    }

    async triggerPaymentProcessing() {
        const paymentSteps = document.querySelectorAll('.progress-step');
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');

        // Reset all steps
        paymentSteps.forEach(step => {
            step.classList.remove('active', 'processing');
        });

        // Step 1: Validation (already active)
        paymentSteps[0].classList.add('active');
        
        await this.delay(1000);
        
        // Step 2: Processing
        paymentSteps[1].classList.add('processing');
        if (statusText) statusText.textContent = 'Procesando...';
        if (statusDot) {
            statusDot.style.background = '#fbbf24';
        }
        
        await this.delay(2000);
        
        // Step 3: Completed
        paymentSteps[1].classList.remove('processing');
        paymentSteps[1].classList.add('active');
        paymentSteps[2].classList.add('active');
        
        if (statusText) statusText.textContent = 'Completado';
        if (statusDot) {
            statusDot.style.background = '#10b981';
        }

        // Celebrate completion
        this.celebrateCompletion();
    }

    autoCalculate() {
        // Debounce auto-calculation
        clearTimeout(this.autoCalculateTimeout);
        this.autoCalculateTimeout = setTimeout(() => {
            const rentValue = this.parseMoneyValue(document.getElementById('monthlyRent')?.value || '$1,200');
            const initialValue = this.parseMoneyValue(document.getElementById('initialPayment')?.value || '$15,000');
            
            if (rentValue && initialValue) {
                const results = this.performCalculations(rentValue, initialValue);
                this.updateResults(results);
            }
        }, 1000);
    }

    initProgressBars() {
        // Initialize progress bars with animations
        setTimeout(() => {
            const progressFills = document.querySelectorAll('.progress-fill');
            progressFills.forEach((fill, index) => {
                const progress = fill.getAttribute('data-progress') || 72;
                setTimeout(() => {
                    fill.style.width = progress + '%';
                }, index * 500);
            });
        }, 1000);
    }

    simulatePaymentProcessing() {
        // Simulate realistic payment processing cycle
        setInterval(() => {
            this.cyclePaymentStatus();
        }, 15000); // Every 15 seconds
    }

    cyclePaymentStatus() {
        const statusOptions = [
            { text: 'Validando...', color: '#fbbf24', class: 'processing' },
            { text: 'Procesando...', color: '#3b82f6', class: 'processing' },
            { text: 'Completado', color: '#10b981', class: 'active' },
            { text: 'Listo para nuevo pago', color: '#6b7280', class: '' }
        ];

        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        const steps = document.querySelectorAll('.progress-step');

        let currentStep = 0;

        const updateStatus = () => {
            if (currentStep < statusOptions.length) {
                const status = statusOptions[currentStep];
                
                if (statusText) statusText.textContent = status.text;
                if (statusDot) statusDot.style.background = status.color;
                
                // Update step classes
                steps.forEach((step, index) => {
                    step.classList.remove('active', 'processing');
                    if (index <= currentStep) {
                        step.classList.add(status.class || 'active');
                    }
                });

                currentStep++;
                
                if (currentStep < statusOptions.length) {
                    setTimeout(updateStatus, 2000);
                } else {
                    // Reset after completion
                    setTimeout(() => {
                        currentStep = 0;
                        this.cyclePaymentStatus();
                    }, 3000);
                }
            }
        };

        updateStatus();
    }

    initFloatingAnimations() {
        // Add subtle interactions to floating cards
        const floatingCards = document.querySelectorAll('.floating-card-payment-processor');
        
        floatingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add parallax effect to floating elements
        this.initParallaxEffect();
    }

    initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const floatingElements = document.querySelector('.floating-elements');
            
            if (floatingElements) {
                const speed = 0.1;
                floatingElements.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    }


    createConfetti() {
        const colors = ['#10b981', '#00d924', '#635bff', '#00d4ff', '#ff5470'];
        const container = document.querySelector('.floating-elements');
        
        if (!container) return;

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 8px;
                    height: 8px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    pointer-events: none;
                    border-radius: 50%;
                    animation: confettiFall 3s ease-out forwards;
                    z-index: 1000;
                `;
                
                container.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
    }

    showCalculationSuccess() {
        // Show success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.9rem;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-out 2.5s forwards;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        `;
        notification.textContent = '✅ Cálculo completado exitosamente';
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    animateValue(element, start, end, duration, formatter = null) {
        if (!element) return;

        const startTime = performance.now();
        const range = end - start;

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const value = start + range * easeOut;

            if (formatter) {
                element.textContent = formatter(value);
            } else {
                element.textContent = Math.round(value).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize enhanced hero functionality
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedHero = new EnhancedHero();
    console.log('✅ Enhanced Hero initialized successfully');
});

// Global function for calculate button (if needed)
window.calculateSavings = function() {
    if (window.enhancedHero) {
        window.enhancedHero.calculateSavings();
    }
};