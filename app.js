const CONSTANTS = {
    pi: {
        name: 'Pi',
        symbol: 'π',
        digits: '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679'
    },
    e: {
        name: 'Euler\'s Number',
        symbol: 'e',
        digits: '2.718281828459045235360287471352662497757247093699959574966967627724876753104217985284705868232333586'
    },
    phi: {
        name: 'Golden Ratio',
        symbol: 'φ',
        digits: '1.6180339887498948482045868343656381177203091798057628621354486227052604628189064564402369988747668467'
    },
    sqrt2: {
        name: 'Square Root 2',
        symbol: '√2',
        digits: '1.4142135623730950488016888724209698078569671875376948073176679737990732478462107038850387534327641572'
    },
    tau: {
        name: 'Tau',
        symbol: 'τ',
        digits: '6.283185307179586476925286766559005768394338798750211641949889184615632812572417997256066898134813445'
    }
};

async function initApp() {
    let activeConstant = null;
    let currentStep = 0;
    let score = 0;
    let startTime = null;
    let timerInterval = null;

    const screenMenu = document.getElementById('screen-menu');
    const screenGame = document.getElementById('screen-game');
    const screenGameOver = document.getElementById('screen-gameover');
    const headerTitle = document.getElementById('header-title');

    const digitSequenceEl = document.getElementById('digit-sequence');
    const scoreEl = document.getElementById('score');
    const timerEl = document.getElementById('timer');

    const finalScoreEl = document.getElementById('final-score');
    const finalTimeEl = document.getElementById('final-time');

    const constantsGrid = document.querySelector('.constants-grid');

    // Render Menu
    Object.entries(CONSTANTS).forEach(([key, data]) => {
        const card = document.createElement('div');
        card.className = 'const-card';
        card.innerHTML = `
            <span class="const-symbol">${data.symbol}</span>
            <span class="const-name">${data.name}</span>
            <span class="const-preview">${data.digits.substring(0, 12)}...</span>
        `;
        card.onclick = () => startGame(key);
        constantsGrid.appendChild(card);
    });

    function startGame(constantKey) {
        activeConstant = CONSTANTS[constantKey];
        currentStep = 2; // Start after the "X."
        score = 0;
        scoreEl.textContent = '0';
        timerEl.textContent = '0:00';

        // Initial display: show the whole number and decimal point
        digitSequenceEl.innerHTML = `<span class="correct">${activeConstant.digits[0]}</span><span class="correct">${activeConstant.digits[1]}</span>`;

        screenMenu.classList.add('hidden');
        screenGameOver.classList.add('hidden');
        screenGame.classList.remove('hidden');
        headerTitle.textContent = activeConstant.name.toUpperCase();
        startTimer();
    }

    function startTimer() {
        startTime = Date.now();
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const mins = Math.floor(elapsed / 60);
            const secs = (elapsed % 60).toString().padStart(2, '0');
            timerEl.textContent = `${mins}:${secs}`;
        }, 1000);
    }

    function handleInput(digit) {
        const targetDigit = activeConstant.digits[currentStep];

        if (digit === targetDigit) {
            score++;
            scoreEl.textContent = score;

            const span = document.createElement('span');
            span.className = 'correct';
            span.textContent = digit;
            digitSequenceEl.appendChild(span);

            // Auto-scroll sequence to the left as it grows
            // We want the latest digit to be roughly in the center
            if (currentStep > 5) {
                digitSequenceEl.style.justifyContent = 'flex-end';
                digitSequenceEl.style.paddingLeft = `${(currentStep - 5) * 22}px`; // Rough estimate of digit width
            }

            currentStep++;
            if (currentStep >= activeConstant.digits.length) {
                endGame(true);
            }
        } else {
            // Flash Wrong Digit
            const span = document.createElement('span');
            span.className = 'wrong';
            span.textContent = digit;
            digitSequenceEl.appendChild(span);

            // Visual feedback for mistake
            digitSequenceEl.classList.add('wrong');
            setTimeout(() => digitSequenceEl.classList.remove('wrong'), 300);

            endGame(false);
        }
    }

    function endGame(won) {
        clearInterval(timerInterval);

        const finalTime = timerEl.textContent;
        finalScoreEl.textContent = score;
        finalTimeEl.textContent = finalTime;

        // Show a preview of the next few digits you missed
        const nextDigits = activeConstant.digits.substring(currentStep, currentStep + 10);
        document.getElementById('gameover-digits').innerHTML =
            `<span class="correct">${activeConstant.digits.substring(0, currentStep)}</span><span class="wrong">${nextDigits[0] || ''}</span>`;

        screenGameOver.classList.remove('hidden');
        headerTitle.textContent = won ? 'PERFECT!' : 'CRASHED!';
    }

    document.querySelectorAll('.key').forEach(btn => {
        btn.onclick = () => handleInput(btn.dataset.val);
    });

    document.getElementById('btn-retry').onclick = () => {
        const constantsKeys = Object.keys(CONSTANTS);
        const lastKey = constantsKeys.find(k => CONSTANTS[k] === activeConstant);
        startGame(lastKey);
    };

    document.getElementById('btn-menu').onclick = () => {
        screenGameOver.classList.add('hidden');
        screenGame.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS';
    };
}

initApp();
