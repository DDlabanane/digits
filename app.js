// =====================================================================
// app.js : toute la logique de l'application (le "cerveau")
// =====================================================================
// Rôle du fichier :
//   - stocker les constantes mathématiques (CONSTANTS)
//   - construire le menu, le jeu, le mode étude et l'écran de fin
//   - réagir aux clics (touches du clavier, boutons, onglets)
//   - sauvegarder les meilleurs scores sur l'appareil
//
// Pour comprendre le fichier, pense en 3 temps :
//   1. les DONNÉES (les décimales de chaque constante)
//   2. les ÉCRANS (menu, étude, jeu, game over) qu'on montre/cache
//   3. les ACTIONS (clic sur une carte, appui sur une touche...)
//
// ---------------------------------------------------------------------
// LES DONNÉES : l'objet CONSTANTS
// ---------------------------------------------------------------------
// Un "objet" JavaScript = une boîte de paires clé: valeur.
// Ici chaque clé (pi, e, phi, sqrt2, tau) contient elle-même un objet avec :
//   - name   : le nom affiché dans l'interface
//   - symbol : le symbole affiché en gros sur la carte
//   - digits : les décimales sous forme de TEXTE (entre guillemets), y compris
//              le "3." du début. Le texte permet d'accéder à un caractère
//              précis avec digits[0], digits[1], etc.

const CONSTANTS = {
    pi: {
        name: 'Pi',
        symbol: 'π',
        digits: '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989...',
        info: "<p> Le nombre π (pi) est une constante mathématique qui correspond au rapport entre la circonférence d’un cercle et son diamètre. <br> Il intervient dans de nombreuses formules en mathématiques, en physique et en ingénierie, notamment pour calculer les périmètres et les aires des cercles. <br> π possède deux propriétés fondamentales : il est irrationnel, car il ne peut pas s’écrire comme une fraction de deux entiers, et transcendant, car il n’est solution d’aucune équation polynomiale non nulle à coefficients entiers. </p><p> L’étude de π remonte à l’Antiquité, lorsque les civilisations cherchaient déjà à en déterminer une valeur approchée. Au fil des siècles, des mathématiciens comme Archimède ont développé des méthodes pour améliorer sa précision. <br>La notation π, proposée au XVIIIᵉ siècle par William Jones, a ensuite été popularisée par Leonhard Euler. <br>Avec l’apparition de l’informatique, le calcul de ses décimales s’est considérablement accéléré. Aujourd’hui, π reste un nombre fascinant, étudié aussi bien pour ses propriétés mathématiques que pour sa place dans la culture populaire.</p>"    
    },
    e: {
        name: 'Euler\'s Number',
        symbol: 'e',
        digits: '2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274274663919320030599218174135966290435729003342952605956307381323286279434907632338298807531952510190115738341879307021540891499348841675092447614606680822648001684774118537423454424371075390777449920695517027618386062613313845830007520449338265602976067371132007093287091274437470472306969772093101416928368190255151086574637721112523897844250569536967707854499699679468644549059879316368892300987931277361782154249992295763514822082698951936680331825288693984964651058209392398294887933203625094431173012381970684161403970198376793206832823764648042953118023287825098194558153017567173613320698112509961818815930416903515988885193458072738667385894228792284998920868058257492796104841984443634632449684875602336248270419786232090021609902353043699418491463140934317381436405462531520961836908887070167683964243781405927145635490613031072085103837505101157477041718986106873969655212671546889570350354...',
        info: "<p>Le nombre e, également appelé nombre d’Euler ou constante de Néper, est une constante mathématique dont la valeur approchée est 2,718. Il constitue la base des logarithmes naturels et joue un rôle essentiel dans l’étude des fonctions exponentielles. Il peut être défini comme la limite de la suite (1+1/n)^n lorsque n tend vers l’infini, ou encore comme la somme de la série infinie des inverses des factorielles. Il possède une propriété remarquable : la fonction exponentielle de base e est égale à sa propre dérivée.</p><p>L'étude de ce nombre débute au XVIIᵉ siècle avec les travaux sur les logarithmes, notamment ceux de John Napier et de Leibniz. C'est le mathématicien Leonhard Euler qui introduit et popularise la notation e au XVIIIᵉ siècle. En 1737, il démontre que e est irrationnel, puis Charles Hermite prouve en 1873 qu'il est également transcendant. Aujourd'hui, e intervient dans de nombreux domaines, notamment l'analyse mathématique, les probabilités, la physique et les sciences économiques, en particulier pour modéliser les phénomènes de croissance et de décroissance exponentielle.</p>"
    },
    sqrt2: {
        name: 'Square Root 2',
        symbol: '√2',
        digits: '1.4142135623730950488016887242096980785696718753769480731766797379907324784621070388503875343276415727350138462309122970249248360558507372126441214970999358314132226659275055927557999505011527820605714701095599716059702745345968620147285174186408891986095523292304843087143214508397626036279952514079896872533965463318088296406206152583523950547457502877599617298355752203375318570113543746034084988471603868999706990048150305440277903164542478230684929369186215805784631115966687130130156185689872372352885092648612494977154218334204285686060146824720771435854874155657069677653720226485447015858801620758474922657226002085584466521458398893944370926591800311388246468157082630100594858704003186480342194897278290641045072636881313739855256117322040245091227700226941127573627280495738108967504018369868368450725799364729060762996941380475654823728997180326802474420629269124859052181004459842150591120249441341728531478105803603371077309182869314710171111683916581726889419758716582152128229518488472...',
        info: "<p>La racine carrée de 2, notée &radic;2, est le nombre positif qui, multiplié par lui-même, donne 2. Sa valeur approchée est 1,414213562. C'est un nombre irrationnel, ce qui signifie qu'il ne peut pas être exprimé sous la forme d'une fraction de deux entiers et que son développement décimal est infini et non périodique. Géométriquement, il correspond au rapport entre la diagonale d'un carré et la longueur de son côté, comme le démontre le théorème de Pythagore.</p><p> Connue depuis l'Antiquité, la racine carrée de 2 était déjà approximée avec une grande précision par les Babyloniens. Les mathématiciens grecs ont ensuite démontré son irrationalité, une découverte importante dans l'histoire des mathématiques. Aujourd'hui, elle intervient dans de nombreux domaines : les formats de papier internationaux (A4, A3…), la musique, l'électricité ou encore la photographie. Elle joue également un rôle historique dans le développement des méthodes de calcul des racines carrées et de la théorie des nombres. </p>"
    },
    phi: {
        name: 'Golden Ratio',
        symbol: 'φ',
        digits: '1.6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374847540880753868917521266338622235369317931800607667263544333890865959395829056383226613199282902678806752087668925017116962070322210432162695486262963136144381497587012203408058879544547492461856953648644492410443207713449470495658467885098743394422125448770664780915884607499887124007652170575179788341662562494075890697040002812104276217711177780531531714101170466659914669798731761356006708748071013179523689427521948435305678300228785699782977834784587822891109762500302696156170025046433824377648610283831268330372429267526311653392473167111211588186385133162038400522216579128667529465490681131715993432359734949850904094762132229810172610705961164562990981629055520852479035240602017279974717534277759277862561943208275051312181562855122248093947123414517022373580577278616008688382952304592647878017889921990270776903895321968198615143780314997411069260886742962267575605231727775203536139362...',
        info: "<p>Le nombre d’or, noté φ (phi), est une constante mathématique dont la valeur approchée est 1,6180339887. Il est défini comme le rapport entre deux longueurs telles que le rapport de leur somme sur la plus grande soit égal au rapport de la plus grande sur la plus petite. Il peut également être obtenu comme l’unique solution positive de l’équation x²-x=1, ce qui donne la formule φ=(1+&radic;5)/2. Il possède des liens mathématiques remarquables avec la suite de Fibonacci et intervient notamment dans la construction du pentagone régulier.</p><p>Connu depuis l'Antiquité, le nombre d'or apparaît notamment dans les travaux du mathématicien grec Euclide. À la Renaissance, Luca Pacioli le popularise sous le nom de « divine proportion ». Il est souvent associé à l'harmonie et à l'esthétique dans l'art, l'architecture et la nature, notamment dans la disposition des graines de tournesol. Cependant, contrairement à certaines idées populaires, sa présence dans les œuvres artistiques, les monuments ou les proportions du corps humain est souvent exagérée et ne repose pas toujours sur des preuves scientifiques solides.</p>"
    },
    tau: {
        name: 'Tau',
        symbol: 'τ',
        digits: '6.28318530717958647692528676655900576839433879875021164194988918461563281257241799725606965068423413596429617302656461329418768921910116446345071881625696223490056820540387704221111928924589790986076392885762195133186689225695129646757356633054240381829129713384692069722090865329642678721452049828254744917401321263117634976304184192565850818343072873578518072002266106109764093304276829390388302321886611454073151918390618437223476386522358621023709614892475992549913470377150544978245587636602389825966734672488131328617204278989279044947438140435972188740554107843435258635350476934963693533881026400113625429052712165557154268551557921834727435744293688180244990686029309917074210158455937851784708403991222425804392172806883631962725954954261992103741442269999999674...',
        info: "<p>La constante tau, notée τ, est un nombre mathématique défini comme étant égal à deux fois le nombre pi : τ = 2π. Sa valeur approchée est 6,283185307179586. Elle correspond au rapport entre la circonférence d'un cercle et son rayon. <br> Comme π, tau est un nombre irrationnel et transcendant, ce qui signifie qu'il ne peut pas être exprimé sous forme de fraction de deux entiers et qu'il n'est solution d'aucune équation polynomiale non nulle à coefficients rationnels. Elle permet notamment d'exprimer plus naturellement les angles en radians : un tour complet correspond à τ radians, un demi-tour à τ/2 et un quart de tour à τ/4.</p><p>La notation τ a été popularisée en 2010 par le mathématicien Michael Hartl dans son Tau Manifesto, à la suite d'une proposition du mathématicien Bob Palais publiée en 2001. L'objectif est de proposer une alternative à π, jugée par ses défenseurs plus intuitive dans de nombreuses formules mathématiques. Par exemple, la circonférence d'un cercle s'écrit simplement C=τr, et l'aire d'un disque devient A = 1/2*τ*r². Cette proposition reste toutefois controversée : π demeure la constante universellement utilisée dans les mathématiques, et τ constitue davantage une alternative de notation qu'une nouvelle découverte mathématique. Le 28 juin (6/28) est même célébré par ses partisans comme le « Tau Day ».</p>"
    },
    psi :{
        name: 'Plastic Number',
        symbol: 'ψ',
        digits: '1.3247179572447460259609088544780973407344040569017333645340150503028278512455475940546993479817872803299109209947422074251089026390458977955943147570967234717541668390388674187517369315842535499082466223545337273504589879909568150627745509802486213012169894157524574548625075626524610368938904839932269952074975962828868556908150704513696109853352577281586033441141927828273765296032993584674231028483241695239006108543338218508398101808957353870473931343967313767646021031652768893963935325943992483103109583953775194260288774092718620338928201615255532182709470613056761239889204637306571962977716886308761533248001117680731166845322774315662899607266383572210363470709838371598022337102130982468490863129693663443924450071541504290008190306705898453390534688728740661957756261670617642889193912308379183117162296038861476358807306315097483767582459270289013195095515560122800385957615401784215176187442159558609966992471147801208237336541397371191292640579624848323226344200959230736361015150913004...',
        info: "<p>Le nombre plastique, noté ψ (psi), est une constante mathématique dont la valeur approchée est 1,324717957. Il est défini comme l'unique solution réelle positive de l'équation x³=x+1. <br>C'est un nombre algébrique de degré 3, qui peut être exprimé à l'aide de racines cubiques. Il possède des liens étroits avec la suite de Padovan, de la même manière que le nombre d'or est lié à la suite de Fibonacci. Il constitue également un nombre de Pisot, une catégorie particulière de nombres algébriques.</p><p>Le nombre plastique a notamment été étudié par le mathématicien français Gérard Cordonnier à partir de 1924, qui l'appelait « nombre radiant ». Il a ensuite été utilisé par l'architecte et moine bénédictin néerlandais Hans van der Laan dans ses travaux sur les proportions architecturales. Il permet de définir des rapports entre les trois dimensions d'un espace, offrant ainsi un système de proportions en trois dimensions, parfois considéré comme un équivalent du nombre d'or dans le domaine architectural. Le mathématicien Ian Stewart le décrit d'ailleurs comme le « cousin du nombre d'or ».</p>"
    },
    frac13: {
        name: 'One third',
        symbol: '⅓',
        digits: '0,33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333',
        info: "<p>Le nombre un tiers, noté 1/3, est un nombre rationnel correspondant au résultat de la division de 1 par 3. Sa valeur décimale est 0.3333333..., avec une infinité de chiffres 3 qui se répètent périodiquement. Contrairement aux autres nombres de cette application comme π ou √2, il est rationnel, puisqu'il peut s'écrire comme le rapport de deux entiers. Son développement décimal est infini, mais périodique, et sa période est constituée d'un seul chiffre : 3.</p><p>Le nombre 1/3 possède une propriété mathématique intéressante : multiplié par 3, il donne exactement 1. Il illustre également le fait qu'un nombre rationnel ne possède pas nécessairement une écriture décimale finie. En effet, contrairement à 1/2=0,5 ou 1/4=0,25, son écriture décimale ne s'arrête jamais. Il est toutefois possible de le représenter exactement sous forme fractionnaire ou grâce à la notation 0,3&#773;. Cette propriété est partagée par toutes les fractions dont le dénominateur, une fois simplifié, possède des facteurs premiers autres que 2 et 5.</p>"
    },
    ii: {
        name: 'i to the i',
        symbol: 'i^i',
        digits: '0,2078795763507619085469556198349787700338778416317696080751358830554198772854821397886002778654260353405217733072350218081906197303746639869999112631786412057317177795200674337664954224638192973743053870376005189066303304970051900555620047586620529435183443184345502747974534476993471417238323081527148180076092107419204715187835348958482189018602958233129566295207082340956769636374203945143939418386190108082089777175170500434817645475171452989434113414201756221548809541992091473585152856795345269763049937295772948259970284775240324808207770291871972175383475208608648587534778655469838325536790138351722118641519595912039044480226696736794359652055843602956960655824943133694017295242996108616198249990451356900573640511026643913735174062790749688490122755719177620377303584528775757603495038129915398658737653591686400515998897106379906160863003099013645709498138143803664034891345628757167799263377000749589344423980292093268230632524978561696934908340259472484771680946553547691686005521521017...',
        info: "<p>Le nombre i^i est une constante mathématique particulièrement surprenante, obtenue en élevant l'unité imaginaire i, définie par i²=-1, à sa propre puissance. Sa valeur principale est un nombre réel positif, approximativement égal à 0,2078795763. Ce résultat peut être démontré grâce à la formule d'Euler : e^{ix}=cos(x)+i*sin(x). En prenant x=π/2, on obtient i=e^(i*π/2), puis i^i=e^(-π/2). Ce nombre est transcendant et donc irrationnel, tout comme π et e.</p><p>Ce résultat, étudié notamment par Leonhard Euler au XVIIIᵉ siècle, illustre une propriété étonnante des nombres complexes : une puissance impliquant uniquement des nombres imaginaires peut donner un résultat réel. Il existe toutefois une subtilité : contrairement aux puissances habituelles, l'exponentiation complexe peut être multivaluée. En effet, puisque i=e^(i*(π/2 + 2kπ)), avec k entier, i^i possède en réalité une infinité de valeurs réelles possibles, de la forme e^(-π/2 -2kπ). La valeur 0,207879… correspond à la valeur principale, c'est-à-dire celle obtenue avec k=0.</p>"
    },
};

// ---------------------------------------------------------------------
// initApp() : fonction principale
// ---------------------------------------------------------------------
// Tout le reste du fichier est À L'INTÉRIEUR de cette fonction. Avantage :
// les variables ci-dessous sont "privées" et partagées par toutes les
// fonctions internes. Elle est appelée tout en bas du fichier (initApp();).
// (Le mot "async" n'est pas utilisé ici : il ne sert à rien dans ce cas,
// mais il ne gêne pas.)
async function initApp() {
    // L'ÉTAT de l'application : des variables qui changent pendant l'utilisation.
    //   activeConstant   : la constante choisie (l'objet de CONSTANTS), ou null
    //   currentStep      : position dans les décimales = index du prochain chiffre à deviner
    //   score            : nombre de bons chiffres tapés pendant la partie
    //   startTime        : heure de début de partie (en millisecondes)
    //   timerInterval    : identifiant du minuteur, pour pouvoir l'arrêter
    //   currentMenuMode  : onglet actif du menu, 'play' (jouer) ou 'study' (étudier) + wiki
    //   activeKey        : clé de la constante choisie ('pi', 'e'...), sert pour les scores
    let activeConstant = null;
    let currentStep = 0;
    let score = 0;
    let startTime = null;
    let timerInterval = null;
    let currentMenuMode = 'play'; // 'play' or 'study' or "wiki"
    let activeKey = null;

    // --- Meilleurs scores (stockage local) ---
    // Les meilleurs scores sont stockés dans le "localStorage" du navigateur :
    // une petite mémoire qui survit à la fermeture de l'app, propre à l'appareil.
    // On y range un seul texte JSON, par exemple : {"pi": 25, "e": 10}
    // STORAGE_KEY est le nom de cette "case" de mémoire.
    const STORAGE_KEY = 'digits-best-scores';

    // Lit les meilleurs scores. JSON.parse transforme le texte stocké en objet.
    // Le "|| {}" donne un objet vide si rien n'est encore sauvegardé.
    // try/catch : si le stockage est inaccessible (mode privé...), on renvoie {}
    // plutôt que de faire planter l'application.
    function loadBest() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    // Enregistre un score pour une constante (ex : saveBest('pi', 30)).
    // On lit tout, on modifie une entrée, puis on réécrit tout (JSON.stringify
    // transforme l'objet en texte pour pouvoir le stocker).
    function saveBest(key, value) {
        try {
            const best = loadBest();
            best[key] = value;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(best));
        } catch (e) { /* stockage indisponible : on ignore */ }
    }

    // Met à jour le texte "BEST: xx" sur chaque carte du menu.
    // querySelectorAll('.const-best') récupère tous les éléments ayant cette classe ;
    // el.dataset.key lit l'attribut data-key="..." posé lors de la création des cartes.
    function updateBestDisplays() {
        const best = loadBest();
        document.querySelectorAll('.const-best').forEach(el => {
            const b = best[el.dataset.key];
            el.textContent = b ? `BEST: ${b}` : '';
        });
    }

    // Raccourcis vers les éléments HTML. document.getElementById('x') cherche
    // l'élément qui a id="x" dans index.html. On le fait une seule fois ici,
    // puis on réutilise les variables.
    const screenMenu = document.getElementById('screen-menu');
    const screenStudy = document.getElementById('screen-study');
    const screenWiki = document.getElementById('screen-wiki');
    const screenGame = document.getElementById('screen-game');
    const screenGameOver = document.getElementById('screen-gameover');
    const headerTitle = document.getElementById('header-title');

    // Éléments de l'écran de jeu : la ligne de chiffres, le score et le chrono.
    const digitSequenceEl = document.getElementById('digit-sequence');
    const scoreEl = document.getElementById('score');
    const timerEl = document.getElementById('timer');

    // Éléments de l'écran de fin de partie.
    const finalScoreEl = document.getElementById('final-score');
    const finalTimeEl = document.getElementById('final-time');

    // La grille du menu dans laquelle on va insérer une carte par constante.
    const constantsGrid = document.querySelector('.constants-grid');

    // CRÉATION DES CARTES DU MENU
    // Object.entries(CONSTANTS) transforme l'objet en liste de paires [clé, données].
    // forEach répète le bloc pour chaque constante : on crée une <div> (une carte),
    // on remplit son HTML avec le symbole, le nom, un aperçu des 12 premiers
    // caractères (substring(0, 12)) et un espace vide pour le meilleur score.
    // Les ${...} dans les backticks insèrent la valeur d'une variable dans le texte.
    Object.entries(CONSTANTS).forEach(([key, data]) => {
        const card = document.createElement('div');
        card.className = 'const-card';
        card.innerHTML = `
            <span class="const-symbol">${data.symbol}</span>
            <span class="const-name">${data.name}</span>
            <span class="const-preview">${data.digits.substring(0, 12)}...</span>
            <span class="const-best" data-key="${key}"></span>
        `;
        // Au clic sur une carte : on retient quelle constante est choisie, puis on
        // lance le mode étude ou le jeu selon l'onglet actif.
        card.onclick = () => {
            activeConstant = data;
            activeKey = key;
            if (currentMenuMode === 'study') {
                startStudy();
            } 
            if (currentMenuMode === 'wiki') {
                startWiki();
            } 
            if (currentMenuMode === 'play') {
                startGame();
            }
        };
        constantsGrid.appendChild(card);
    });

    // Une fois les cartes créées, on affiche les meilleurs scores déjà sauvegardés.
    updateBestDisplays();

    // Tab switching logic
    const tabPlay = document.getElementById('tab-play');
    const tabStudy = document.getElementById('tab-study');
    const tabWiki = document.getElementById('tab-wiki');

    // ONGLETS PLAY / STUDY
    // Un clic change le mode (currentMenuMode) et déplace la classe CSS "active"
    // (l'onglet en surbrillance) d'un bouton à l'autre.
    tabPlay.onclick = () => {
        currentMenuMode = 'play';
        tabPlay.classList.add('active');
        tabStudy.classList.remove('active');
        tabWiki.classList.remove('active');
    };

    tabStudy.onclick = () => {
        currentMenuMode = 'study';
        tabStudy.classList.add('active');
        tabPlay.classList.remove('active');
        tabWiki.classList.remove('active');
    };

    tabWiki.onclick = () => {
        currentMenuMode = 'wiki';
        tabWiki.classList.add('active')
        tabStudy.classList.remove('active');
        tabPlay.classList.remove('active');
    };


    // MODE WIKI 
    function startWiki() {
        const container = document.getElementById('wiki-info-container');
        const info = activeConstant.info;

        container.innerHTML = info;

        screenMenu.classList.add('hidden');
        screenStudy.classList.add('hidden');
        screenWiki.classList.remove('hidden');
        screenGame.classList.add('hidden');
        screenGameOver.classList.add('hidden');
        headerTitle.textContent = `${activeConstant.name} WIKI`;

    }


    // MODE ÉTUDE : affiche toutes les décimales dans un tableau de 4 colonnes.
    // Les chiffres déjà "mémorisés" (selon ton meilleur score) sont colorés.
    //   - on vide le conteneur (innerHTML = '')
    //   - on crée un <table> ; toutes les 4 cases (i % 4 === 0) on ajoute une ligne
    //   - memorizedCount = meilleur score + 2, car le "3" et le "." sont offerts
    //   - puis on affiche l'écran d'étude et on cache les autres (classe "hidden")
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
        screenWiki.classList.add('hidden');
        screenGame.classList.add('hidden');
        screenGameOver.classList.add('hidden');
        headerTitle.textContent = `${activeConstant.name} STUDY`;
    }

    // LANCE UNE PARTIE
    //   - currentStep = 2 : on saute "3" et "." (index 0 et 1), le joueur
    //     commence aux premières vraies décimales
    //   - on remet score et chrono à zéro
    //   - sequenceWrapper = null : force la reconstruction de la ligne de chiffres
    //   - on affiche l'écran de jeu, on dessine la séquence, on démarre le chrono
    function startGame() {
        currentStep = 2;
        score = 0;
        scoreEl.textContent = '0';
        timerEl.textContent = '0:00';
        sequenceWrapper = null; // force a fresh build of the sequence

        screenMenu.classList.add('hidden');
        screenStudy.classList.add('hidden');
        screenWiki.classList.add('hidden');
        screenGameOver.classList.add('hidden');
        screenGame.classList.remove('hidden');
        headerTitle.textContent = activeConstant.name.toUpperCase();

        // Render after the screen is visible so we can measure positions
        renderSequence();
        startTimer();
    }

    // sequenceWrapper : la <div> qui contient tous les chiffres affichés.
    // On la fait glisser vers la gauche pour garder le chiffre actif centré.
    let sequenceWrapper = null;

    // Crée un chiffre à afficher : un <span> avec un texte et des classes CSS
    // ('digit-char' + un état : 'correct', 'active' ou 'wrong').
    function createDigitSpan(text, state) {
        const span = document.createElement('span');
        span.className = `digit-char ${state}`;
        span.textContent = text;
        return span;
    }

    // Slide the wrapper so the active digit sits in the middle of the screen.
    // Uses layout positions (offsetLeft) so it stays correct mid-animation.
    // CENTRAGE : calcule de combien décaler la séquence (translateX) pour que
    // le dernier élément (le curseur "_") soit au milieu de l'écran.
    //   animate = true  : le décalage est animé (transition définie dans le CSS)
    //   animate = false : le décalage est immédiat
    function centerSequence(animate) {
        if (!sequenceWrapper || digitSequenceEl.clientWidth === 0) return;
        const last = sequenceWrapper.lastElementChild;
        if (!last) return;

        const digitCenter = sequenceWrapper.offsetLeft + last.offsetLeft + last.offsetWidth / 2;
        const offset = digitSequenceEl.clientWidth / 2 - digitCenter;

        // Astuce pour un saut instantané : on coupe la transition, on applique la
        // position, puis on force le navigateur à recalculer la mise en page
        // (la ligne "void ...offsetWidth") avant de réactiver la transition.
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

    // AFFICHE / MET À JOUR LA LIGNE DE CHIFFRES
    //   - 1er appel d'une partie : on construit tout (les chiffres déjà
    //     donnés + un curseur "_")
    //   - appels suivants : on transforme le curseur en chiffre correct, on
    //     ajoute un nouveau curseur, et on fait glisser la séquence
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

    // Si la fenêtre change de taille (rotation de l'iPhone...), on recentre.
    window.addEventListener('resize', () => centerSequence(false));

    // CHRONO : setInterval exécute le code toutes les 1000 ms. On calcule le
    // temps écoulé depuis startTime, puis on l'affiche au format m:ss
    // (padStart(2, '0') ajoute un zéro devant : 5 devient "05").
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

    // CŒUR DU JEU : appelé à chaque appui sur une touche (digit = "7" par ex.).
    // On compare avec le chiffre attendu dans les décimales (digits[currentStep]).
    //   - bon chiffre : score +1, on avance d'une position, on redessine
    //   - mauvais chiffre : on affiche le chiffre faux en rouge et on termine la partie
    // Remarque : digit et targetDigit sont tous deux du TEXTE, d'où la comparaison
    // possible avec ===.
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

    // FIN DE PARTIE
    //   - arrête le chrono
    //   - remplit l'écran de fin (score, temps)
    //   - compare avec l'ancien record et le sauvegarde si battu
    //   - affiche "..." + les 4 derniers bons chiffres + le chiffre manqué en rouge
    //   - change le titre : PERFECT! / NEW RECORD! / CRASHED!
    // Le paramètre "won" vaut toujours false pour l'instant (aucune condition de
    // victoire n'existe, les décimales étant très longues).
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

    // Effet visuel : fait clignoter une touche en blanc. On retire puis on remet
    // la classe "flash" (avec un reflow entre les deux) pour relancer l'animation
    // même si on retape très vite.
    function flashKey(btn) {
        btn.classList.remove('flash');
        void btn.offsetWidth; // restart the animation if tapped again quickly
        btn.classList.add('flash');
    }

    // BRANCHEMENT DES TOUCHES DU CLAVIER
    // Pour chaque bouton .key :
    //   - pointerdown (dès que le doigt touche) : effet de flash
    //   - onclick : envoie le chiffre (lu dans data-val="...") à handleInput
    document.querySelectorAll('.key').forEach(btn => {
        btn.addEventListener('pointerdown', () => flashKey(btn));
        btn.onclick = () => handleInput(btn.dataset.val);
    });

    // BOUTONS DE L'ÉCRAN DE FIN
    // RETRY relance une partie avec la même constante.
    document.getElementById('btn-retry').onclick = () => startGame();
    // MENU : on cache tous les écrans sauf le menu, on remet le titre et on
    // rafraîchit les meilleurs scores affichés.
    document.getElementById('btn-menu').onclick = () => {
        screenGameOver.classList.add('hidden');
        screenGame.classList.add('hidden');
        screenStudy.classList.add('hidden');
        screenWiki.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS';
        updateBestDisplays();
    };

    // Bouton de l'écran d'étude : retour au menu.
    document.getElementById('btn-study-back').onclick = () => {
        screenStudy.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS';
    };

    // Bouton du wiki : retour au menu.
    document.getElementById('btn-wiki-back').onclick = () => {
        screenWiki.classList.add('hidden');
        screenMenu.classList.remove('hidden');
        headerTitle.textContent = 'DIGITS';
    };
}

// Démarrage : on lance la fonction principale une fois le fichier chargé.
initApp();
