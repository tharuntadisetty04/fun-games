function makeMoleSVG(type) {
  const normalBody = "#b8896a",
    normalFace = "#d4a882",
    normalBelly = "#edd5b3";
  const hatBody = "#7a8fa6",
    hatFace = "#a0b8cc",
    hatBelly = "#d0e4f0";
  const goldBody = "#c8960a",
    goldFace = "#e8b820",
    goldBelly = "#ffe580";

  const [body, face, belly] =
    type === "hat"
      ? [hatBody, hatFace, hatBelly]
      : type === "gold"
        ? [goldBody, goldFace, goldBelly]
        : [normalBody, normalFace, normalBelly];

  const extras =
    type === "hat"
      ? `
    <!-- Hard hat -->
    <ellipse cx="38" cy="16" rx="24" ry="7" fill="#f5a623"/>
    <rect x="18" y="9" width="40" height="10" rx="5" fill="#f5a623"/>
    <rect x="22" y="7" width="32" height="10" rx="5" fill="#ffcc44"/>
    <rect x="30" y="5" width="16" height="8" rx="4" fill="#ffcc44"/>
    <rect x="33" y="14" width="10" height="3" rx="1.5" fill="#e69500"/>`
      : type === "gold"
        ? `
    <!-- Crown -->
    <polygon points="20,14 27,4 33,12 38,2 43,12 49,4 56,14" fill="#ffd700" stroke="#e65100" stroke-width="1.5"/>
    <circle cx="38" cy="2" r="3" fill="#ff4444"/>
    <circle cx="27" cy="4" r="2" fill="#44aaff"/>
    <circle cx="49" cy="4" r="2" fill="#44ff88"/>`
        : "";

  return `<svg viewBox="0 0 76 84" xmlns="http://www.w3.org/2000/svg">
    ${extras}
    <ellipse cx="38" cy="60" rx="30" ry="24" fill="${body}"/>
    <ellipse cx="38" cy="64" rx="19" ry="15" fill="${belly}"/>
    <ellipse cx="38" cy="36" rx="27" ry="25" fill="${body}"/>
    <ellipse cx="38" cy="34" rx="19" ry="17" fill="${face}"/>
    <ellipse cx="13" cy="22" rx="8" ry="10" fill="${body}"/>
    <ellipse cx="13" cy="22" rx="4.5" ry="6.5" fill="#e8a0b0"/>
    <ellipse cx="63" cy="22" rx="8" ry="10" fill="${body}"/>
    <ellipse cx="63" cy="22" rx="4.5" ry="6.5" fill="#e8a0b0"/>
    <circle cx="26" cy="31" r="7.5" fill="white"/>
    <circle cx="28" cy="31" r="4.5" fill="#111"/>
    <circle cx="29" cy="29" r="1.8" fill="white"/>
    <circle cx="50" cy="31" r="7.5" fill="white"/>
    <circle cx="52" cy="31" r="4.5" fill="#111"/>
    <circle cx="53" cy="29" r="1.8" fill="white"/>
    <ellipse cx="38" cy="44" rx="5.5" ry="4.5" fill="#c06080"/>
    <path d="M30 51 Q38 58 46 51" stroke="#9a4060" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <line x1="41" y1="44" x2="62" y2="38" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
    <line x1="41" y1="47" x2="62" y2="47" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
    <line x1="35" y1="44" x2="14" y2="38" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
    <line x1="35" y1="47" x2="14" y2="47" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
  </svg>`;
}

const DIFF = {
  easy: {
    moleTime: 2200,
    interval: 1500,
    doubles: false,
    moleChances: [0.8, 0.16, 0.04],
  },
  medium: {
    moleTime: 1400,
    interval: 900,
    doubles: false,
    moleChances: [0.65, 0.25, 0.1],
  },
  hard: {
    moleTime: 850,
    interval: 550,
    doubles: true,
    moleChances: [0.5, 0.32, 0.18],
  },
};
const MOLE_PTS = { normal: 1, hat: 2, gold: 3 };

function randMoleType(diff) {
  const [pN, pH] = DIFF[diff].moleChances;
  const r = Math.random();
  return r < pN ? "normal" : r < pN + pH ? "hat" : "gold";
}

let score = 0,
  best = 0,
  timeLeft = 30;
let gameRunning = false;
let moleTimers = [],
  gInterval = null,
  tInterval = null;
let difficulty = "easy";
const holeTypes = new Array(9).fill("normal");

const scoreEl = document.getElementById("score-val");
const timerEl = document.getElementById("timer-val");
const bestEl = document.getElementById("best-val");
const overlay = document.getElementById("overlay");

const holes = [];
for (let i = 0; i < 9; i++) {
  const w = document.createElement("div");
  w.className = "hole-wrap";
  w.innerHTML = `
    <div class="hole-shadow"></div>
    <div class="hole-opening"></div>
    <div class="hole-clip"><div class="mole">${makeMoleSVG("normal")}</div></div>
    <div class="hole-rim"><svg viewBox="0 0 106 38" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="53" cy="20" rx="53" ry="19" fill="#4caf50"/>
      <ellipse cx="53" cy="16" rx="49" ry="15" fill="#5cb860"/>
      <ellipse cx="53" cy="13" rx="42" ry="11" fill="#6abf69"/>
    </svg></div>
    <div class="hit-fx"></div>
  `;
  w.addEventListener("click", () => whack(i));
  document.getElementById("grid").appendChild(w);
  holes.push(w);
}

function setDiff(d) {
  difficulty = d;
  document
    .querySelectorAll(".diff-btn, .ol-diff-btn")
    .forEach((b) => b.classList.toggle("active", b.dataset.diff === d));
}
document
  .querySelectorAll(".diff-btn, .ol-diff-btn")
  .forEach((b) => b.addEventListener("click", () => setDiff(b.dataset.diff)));

function whack(i) {
  if (!gameRunning) return;
  const h = holes[i];
  if (!h.classList.contains("active") || h.classList.contains("whacked"))
    return;

  const type = holeTypes[i];
  const pts = MOLE_PTS[type];
  score += pts;
  scoreEl.textContent = score;

  h.classList.remove("active");
  h.classList.add("whacked");

  const fx = h.querySelector(".hit-fx");
  fx.className = `hit-fx type-${type}`;
  fx.textContent = `+${pts}`;
  void fx.offsetWidth;
  fx.classList.add("pop");

  setTimeout(() => {
    h.classList.remove("whacked");
    fx.className = "hit-fx";
  }, 260);
}

function popMole(i) {
  const h = holes[i];
  if (h.classList.contains("active") || h.classList.contains("whacked")) return;

  const type = randMoleType(difficulty);
  holeTypes[i] = type;

  const moleEl = h.querySelector(".mole");
  moleEl.innerHTML = makeMoleSVG(type);
  moleEl.className = `mole type-${type}`;

  h.classList.add("active");
  const t = setTimeout(() => {
    h.classList.remove("active");
    moleEl.className = "mole";
  }, DIFF[difficulty].moleTime);
  moleTimers.push(t);
}

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  score = 0;
  timeLeft = 30;
  scoreEl.textContent = "0";
  timerEl.textContent = "30";
  timerEl.classList.remove("urgent");
  overlay.classList.add("hidden");
  document.body.classList.add("playing");

  const cfg = DIFF[difficulty];
  gInterval = setInterval(() => {
    const count = cfg.doubles ? 2 : 1;
    const used = new Set();
    for (let n = 0; n < count; n++) {
      let r;
      do {
        r = Math.floor(Math.random() * 9);
      } while (used.has(r));
      used.add(r);
      popMole(r);
    }
  }, cfg.interval);

  tInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 5) timerEl.classList.add("urgent");
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function endGame() {
  gameRunning = false;
  document.body.classList.remove("playing");
  clearInterval(gInterval);
  clearInterval(tInterval);
  moleTimers.forEach(clearTimeout);
  moleTimers = [];
  holes.forEach((h) => {
    h.classList.remove("active", "whacked");
    const m = h.querySelector(".mole");
    m.className = "mole";
  });
  if (score > best) best = score;
  bestEl.textContent = best;

  document.getElementById("ol-emoji").textContent = score >= 12 ? "🎉" : "⏰";
  document.getElementById("ol-title").textContent =
    score >= 12 ? "GREAT JOB!" : "TIME'S UP!";
  document.getElementById("ol-score").textContent = score;
  document.getElementById("ol-score-block").style.display = "block";
  document.getElementById("ol-best").style.display = "block";
  document.getElementById("ol-best").textContent = `🏆 Best: ${best}`;
  overlay.classList.remove("hidden");
}

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("ol-play").addEventListener("click", startGame);
