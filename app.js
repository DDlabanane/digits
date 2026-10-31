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
        digits: '6.283185307179586476925286766559005768394338798750211641949889184615632812도572417997256066898134813445'
    }
};

async function initApp() {
    let activeConstant = null;
    let currentStep = 0;
    let score = 0;
    let startTime = null;
    let timerInterval = null;

    const screenMenu = document.getElementById('screen-menu');
    const screenStudy = document.getElementById('screen-study');
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

        // Instead of starting game directly, we show a choice: Study or Play
        card.onclick = () => showConstantOptions(key);
        constantsGrid.appendChild(card);
    });

    function showConstantOptions(constantKey) {
        const data = CONSTANTS[constantKey];
        activeConstant = data;

        // We'll reuse the Study screen as the "landing page" for a constant
        // but let's just go straight to study since it's what the user asked for
        startStudy();
    }

    function startStudy() {
        const studyDigitsEl = document.getElementById('study-digits');
        studyDigitsEl.textContent = activeConstant.digits;

        screenMenu.classList.add('hidden');
        screenStudy.classList.remove('hidden');
        screenGame.classList.add('hidden');
        screenGameOver.classList.add('hidden');
        headerTitle.textContent = `${activeConstant.name} STUDY`;
    }

    function startGame() {
        currentStep = 2;
        score = 0;
        scoreEl.textContent = '0';
        timerEl.textContent = '0:00';

        digitSequenceEl.innerHTML = `<span class="correct">${activeConstant.digits[0]}</span><span class="correct">${activeConstant.digits[1]}</span>`;
        digitSequenceEl.style.justifyContent = 'center';
        digitSequenceEl.style.paddingLeft = '0';

        screenMenu.classList.add('hidden');
        screenStudy.classList.add('hidden');
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

            if (currentStep > 5) {
                digitSequenceEl.style.justifyContent = 'flex-end';
                digitSequenceEl.style.paddingLeft = `${(currentStep - 5) * 22}px`;
            }

            currentStep++;
            if (currentStep >= activeConstant.digits.length) {
                endGame(true);
            }
        } else {
            const span = document.createElement('span');
            span.className = 'wrong';
            span.textContent = digit;
            digitSequenceEl.appendChild(span);

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
        startGame();
    };

    document.getElementById('btn-menu').onclick = () => {
        screenGameOver.classList.add('hidden');
        screenGame.classList.add('hidden');
        screenStudy.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS';
    };

    // Study screen controls
    document.getElementById('btn-study-play').onclick = () => startGame();
    document.getElementById('btn-study-back').onclick = () => {
        screenStudy.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS';
    };
}

initApp();
