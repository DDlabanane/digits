const CONSTANTS = {
    pi: {
        name: 'Pi',
        symbol: 'π',
        digits: '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989'
    },
    e: {
        name: 'Euler\'s Number',
        symbol: 'e',
        digits: '2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354'
    },
    phi: {
        name: 'Golden Ratio',
        symbol: 'φ',
        digits: '1.6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374847540880753868917521266338622235369317931800607667263544333890865959395829056383226613199282902678806752087668925017116962070322210432162695486262963136144381497587012203408058879544547492461856953648644492410443207713449470495658467885098743394422125448770664780915884607499887124007652170575179788341662562494075890697040002812104276217711177780531531714101170466659914669798731761356006708748071013179523689427521948435305678300228785699782977834784587822891109762500302696156170025046433824377648610283831268330372429267526311653392473167111211588186385133162038400522216579128667529465490681131715993432359734949850904094762132229810172610705961164562990981629055520852479035240602017279974717534277759277862561943208275051312181562855122248093947123414517022373580577278616008688382952304592647878017889921990270776903895321968198615143780314997411069260886742962267575605231727775203536139362'
    },
    sqrt2: {
        name: 'Square Root 2',
        symbol: '√2',
        digits: '1.4142135623730950488016887242096980785696718753769480731766797379907324784621070388503875343276415727350138462309122970249248360558507372126441214970999358314132226659275055927557999505011527820605714701095599716059702745345968620147285174186408891986095523292304843087143214508397626036279952514079896872533965463318088296406206152583523950547457502877599617298355752203375318570113543746034084988471603868999706990048150305440277903164542478230684929369186215805784631115966687130130156185689872372352885092648612494977154218334204285686060146824720771435854874155657069677653720226485447015858801620758474922657226002085584466521458398893944370926591800311388246468157082630100594858704003186480342194897278290641045072636881313739855256117322040245091227700226941127573627280495738108967504018369868368450725799364729060762996941380475654823728997180326802474420629269124859052181004459842150591120249441341728531478105803603371077309182869314710171111683916581726889419758716582152128229518488472'
    },
    tau: {
        name: 'Tau',
        symbol: 'τ',
        digits: '6.28318530717958647692528676655900576839433879875021164194988918461563281257241799725606965068423413596429617302656461329418768921910116446345071881625696223490056820540387704221111928924589790986076392885762195133186689225695129646757356633054240381829129713384692069722090865329642678721452049828254744917401321263117634976304184192565850818343072873578518072002266106109764093304276829390388302321886611454073151918390618437223476386522358621023709614892475992549913470377150544978245587636602389825966734672488131328617204278989279044947438140435972188740554107843435258635350476934963693533881026400113625429052712165557154268551557921834727435744293688180244990686029309917074210158455937851784708403991222425804392172806883631962725954954261992103741442269999999674'
    }
};

async function initApp() {
    let activeConstant = null;
    let currentStep = 0;
    let score = 0;
    let startTime = null;
    let timerInterval = null;
    let currentMenuMode = 'play'; // 'play' or 'study'
    let activeKey = null;

    // --- Meilleurs scores (stockage local) ---
    const STORAGE_KEY = 'digits-best-scores';

    function loadBest() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function saveBest(key, value) {
        try {
            const best = loadBest();
            best[key] = value;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(best));
        } catch (e) { /* stockage indisponible : on ignore */ }
    }

    function updateBestDisplays() {
        const best = loadBest();
        document.querySelectorAll('.const-best').forEach(el => {
            const b = best[el.dataset.key];
            el.textContent = b ? `BEST: ${b}` : '';
        });
    }

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

    Object.entries(CONSTANTS).forEach(([key, data]) => {
        const card = document.createElement('div');
        card.className = 'const-card';
        card.innerHTML = `
            <span class="const-symbol">${data.symbol}</span>
            <span class="const-name">${data.name}</span>
            <span class="const-preview">${data.digits.substring(0, 12)}...</span>
            <span class="const-best" data-key="${key}"></span>
        `;
        card.onclick = () => {
            activeConstant = data;
            activeKey = key;
            if (currentMenuMode === 'study') {
                startStudy();
            } else {
                startGame();
            }
        };
        constantsGrid.appendChild(card);
    });

    updateBestDisplays();

    // Tab switching logic
    const tabPlay = document.getElementById('tab-play');
    const tabStudy = document.getElementById('tab-study');

    tabPlay.onclick = () => {
        currentMenuMode = 'play';
        tabPlay.classList.add('active');
        tabStudy.classList.remove('active');
    };

    tabStudy.onclick = () => {
        currentMenuMode = 'study';
        tabStudy.classList.add('active');
        tabPlay.classList.remove('active');
    };

    function startStudy() {
        const container = document.getElementById('study-digits-container');
        container.innerHTML = '';

        const digits = activeConstant.digits;
        const table = document.createElement('table');
        table.className = 'study-table';

        // Nombre de caractères mémorisés : "3." offerts + meilleur score
        const best = loadBest()[activeKey] || 0;
        const memorizedCount = best > 0 ? best + 2 : 0;

        let row;
        for (let i = 0; i < digits.length; i++) {
            if (i % 4 === 0) {
                row = table.insertRow();
            }
            const cell = row.insertCell();
            cell.textContent = digits[i];
            if (i < memorizedCount) cell.classList.add('memorized');
        }

        container.appendChild(table);
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
        sequenceWrapper = null; // force a fresh build of the sequence

        screenMenu.classList.add('hidden');
        screenStudy.classList.add('hidden');
        screenGameOver.classList.add('hidden');
        screenGame.classList.remove('hidden');
        headerTitle.textContent = activeConstant.name.toUpperCase();

        // Render after the screen is visible so we can measure positions
        renderSequence();
        startTimer();
    }

    let sequenceWrapper = null;

    function createDigitSpan(text, state) {
        const span = document.createElement('span');
        span.className = `digit-char ${state}`;
        span.textContent = text;
        return span;
    }

    // Slide the wrapper so the active digit sits in the middle of the screen.
    // Uses layout positions (offsetLeft) so it stays correct mid-animation.
    function centerSequence(animate) {
        if (!sequenceWrapper || digitSequenceEl.clientWidth === 0) return;
        const last = sequenceWrapper.lastElementChild;
        if (!last) return;

        const digitCenter = sequenceWrapper.offsetLeft + last.offsetLeft + last.offsetWidth / 2;
        const offset = digitSequenceEl.clientWidth / 2 - digitCenter;

        if (animate) {
            sequenceWrapper.style.transform = `translateX(${offset}px)`;
        } else {
            // Jump instantly (no slide) for the very first position
            sequenceWrapper.style.transition = 'none';
            sequenceWrapper.style.transform = `translateX(${offset}px)`;
            void sequenceWrapper.offsetWidth; // force reflow
            sequenceWrapper.style.transition = '';
        }
    }

    function renderSequence() {
        if (!sequenceWrapper) {
            // New game: build the sequence from scratch
            digitSequenceEl.innerHTML = '';
            sequenceWrapper = document.createElement('div');
            sequenceWrapper.className = 'sequence-wrapper';
            for (let i = 0; i < currentStep; i++) {
                sequenceWrapper.appendChild(createDigitSpan(activeConstant.digits[i], 'correct'));
            }
            sequenceWrapper.appendChild(createDigitSpan('_', 'active'));
            digitSequenceEl.appendChild(sequenceWrapper);
            centerSequence(false);
            return;
        }

        // Next digit: turn the cursor into a typed digit, add a new cursor, slide
        const cursor = sequenceWrapper.lastElementChild;
        cursor.className = 'digit-char correct';
        cursor.textContent = activeConstant.digits[currentStep - 1];
        sequenceWrapper.appendChild(createDigitSpan('_', 'active'));
        centerSequence(true);
    }

    window.addEventListener('resize', () => centerSequence(false));

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
            currentStep++;
            renderSequence();
        } else {
            const targetSpan = document.createElement('span');
            targetSpan.className = 'digit-char wrong';
            targetSpan.textContent = digit;
            digitSequenceEl.appendChild(targetSpan);

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

        const previousBest = loadBest()[activeKey] || 0;
        const isRecord = score > previousBest;
        if (isRecord) saveBest(activeKey, score);
        document.getElementById('final-best').textContent = Math.max(score, previousBest);

        // Game over display: "..." + last 4 correct digits + the missed digit in red
        const allDigits = activeConstant.digits;
        const tailStart = Math.max(0, currentStep - 4);
        const ellipsis = tailStart > 0
            ? '<span class="digit-char correct" style="color: var(--text-muted)">...</span>'
            : '';
        const tail = allDigits.substring(tailStart, currentStep).split('')
            .map(d => `<span class="digit-char correct">${d}</span>`).join('');
        const missed = allDigits[currentStep]
            ? `<span class="digit-char wrong">${allDigits[currentStep]}</span>`
            : '';
        document.getElementById('gameover-digits').innerHTML = ellipsis + tail + missed;

        screenGameOver.classList.remove('hidden');
        headerTitle.textContent = won ? 'PERFECT!' : (isRecord ? 'NEW RECORD!' : 'CRASHED!');
    }

    function flashKey(btn) {
        btn.classList.remove('flash');
        void btn.offsetWidth; // restart the animation if tapped again quickly
        btn.classList.add('flash');
    }

    document.querySelectorAll('.key').forEach(btn => {
        btn.addEventListener('pointerdown', () => flashKey(btn));
        btn.onclick = () => handleInput(btn.dataset.val);
    });

    document.getElementById('btn-retry').onclick = () => startGame();
    document.getElementById('btn-menu').onclick = () => {
        screenGameOver.classList.add('hidden');
        screenGame.classList.add('hidden');
        screenStudy.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS';
        updateBestDisplays();
    };

    document.getElementById('btn-study-back').onclick = () => {
        screenStudy.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS';
    };
}

initApp();
