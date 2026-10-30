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
    sqrt2: {
        name: 'Square Root 2',
        symbol: '√2',
        digits: '1.414213562373095048801688724209698078569671875376948073176679737990732478462107038850387534327641572'
    }
};

async function initApp() {
    let activeConstant = null;
    let currentStep = 0; // Index of the digit we are expecting
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

    // 1. Initialize Menu
    const constantsGrid = document.querySelector('.constants-grid');
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
        currentStep = 2; // Skip the "3." or "2." part (start at index 2)
        score = 0;

        scoreEl.textContent = '0';
        timerEl.textContent = '0:00';
        digitSequenceEl.innerHTML = '';

        // Show the first digit to start the user off
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
            // Correct!
            score++;
            scoreEl.textContent = score;

            const span = document.createElement('span');
            span.className = 'correct';
            span.textContent = digit;
            digitSequenceEl.appendChild(span);

            currentStep++;

            // End game if we run out of digits
            if (currentStep >= activeConstant.digits.length) {
                endGame();
            }
        } else {
            // Wrong!
            const span = document.createElement('span');
            span.className = 'wrong';
            span.textContent = digit;
            digitSequenceEl.appendChild(span);

            // Show the correct digit next to it
            const correctSpan = document.createElement('span');
            correctSpan.className = 'correct';
            correctSpan.textContent = targetDigit;
            digitSequenceEl.appendChild(correctSpan);

            endGame();
        }
    }

    function endGame() {
        clearInterval(timerInterval);

        const finalTime = timerEl.textContent;
        finalScoreEl.textContent = score;
        finalTimeEl.textContent = finalTime;

        screenGame.classList.add('hidden');
        screenGameOver.classList.remove('hidden');
        headerTitle.textContent = 'GAME OVER';
    }

    // Event Listeners
    document.querySelectorAll('.key').forEach(btn => {
        btn.onclick = () => handleInput(btn.dataset.val);
    });

    document.getElementById('btn-retry').onclick = () => {
        // We need to know which constant was active.
        // For simplicity, let's just go back to menu or restart the last one.
        // Finding the last active constant:
        const constantsKeys = Object.keys(CONSTANTS);
        const lastKey = constantsKeys.find(k => CONSTANTS[k] === activeConstant);
        startGame(lastKey);
    };

    document.getElementById('btn-menu').onclick = () => {
        screenGameOver.classList.add('hidden');
        screenGame.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS LEARNING';
    };
}

initApp();
