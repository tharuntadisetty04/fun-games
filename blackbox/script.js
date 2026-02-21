const RULES = {
  easy: [
    {
      name: "Natural Numbers",
      desc: "Positive whole numbers starting from 1 — 1, 2, 3, 4, 5, …",
      keys: [
        "natural",
        "natural number",
        "natural numbers",
        "positive integer",
        "counting number",
      ],
      test: (n) => Number.isInteger(n) && n >= 1,
    },
    {
      name: "Even Numbers",
      desc: "Numbers exactly divisible by 2 — 0, 2, 4, 6, 8, 10, …",
      keys: [
        "even",
        "even number",
        "even numbers",
        "divisible by 2",
        "multiple of 2",
      ],
      test: (n) => Number.isInteger(n) && n % 2 === 0,
    },
    {
      name: "Odd Numbers",
      desc: "Numbers NOT divisible by 2 — 1, 3, 5, 7, 9, 11, …",
      keys: ["odd", "odd number", "odd numbers", "not divisible by 2"],
      test: (n) => Number.isInteger(n) && n % 2 !== 0,
    },
    {
      name: "Prime Numbers",
      desc: "Numbers greater than 1 with no divisors other than 1 and themselves — 2, 3, 5, 7, 11, …",
      keys: ["prime", "prime number", "prime numbers", "primes"],
      test: (n) => isPrime(n),
    },
  ],
  medium: [
    {
      name: "Perfect Squares",
      desc: "Numbers that are a whole number multiplied by itself — 1, 4, 9, 16, 25, 36, …",
      keys: [
        "perfect square",
        "perfect squares",
        "square",
        "squared",
        "square number",
      ],
      test: (n) => n >= 0 && Math.sqrt(n) % 1 === 0,
    },
    {
      name: "Perfect Cubes",
      desc: "Numbers that are a whole number raised to the power of 3 — 1, 8, 27, 64, 125, …",
      keys: ["perfect cube", "perfect cubes", "cube", "cubed", "cube number"],
      test: (n) => n >= 0 && Math.round(Math.cbrt(n)) ** 3 === n,
    },
    {
      name: "Composite Numbers",
      desc: "Numbers greater than 1 that have more than two factors — 4, 6, 8, 9, 10, 12, …",
      keys: ["composite", "composite number", "composite numbers", "not prime"],
      test: (n) => n > 1 && !isPrime(n),
    },
    {
      name: "Powers of 2",
      desc: "Numbers that are 2 raised to a whole number power — 1, 2, 4, 8, 16, 32, 64, …",
      keys: ["power of 2", "powers of 2", "power of two", "2 to the power"],
      test: (n) => n > 0 && (n & (n - 1)) === 0,
    },
  ],
  hard: [
    {
      name: "Fibonacci Numbers",
      desc: "Numbers in the sequence where each is the sum of the two before — 1, 1, 2, 3, 5, 8, 13, 21, …",
      keys: [
        "fibonacci",
        "fib",
        "fibonacci number",
        "fibonacci numbers",
        "fibonacci sequence",
      ],
      test: (n) => isFib(n),
    },
    {
      name: "Factorials",
      desc: "Numbers equal to n! for some whole number n — 1, 2, 6, 24, 120, 720, 5040, …",
      keys: ["factorial", "factorials", "factorial number", "n factorial"],
      test: (n) => isFactorial(n),
    },
    {
      name: "Palindromes",
      desc: "Numbers from 11 upward that read the same forwards and backwards — 11, 22, 33, 101, 121, …",
      keys: [
        "palindrome",
        "palindromes",
        "palindrome number",
        "reads same",
        "same backwards",
      ],
      test: (n) => n >= 11 && isPalin(n),
    },
  ],
};

function isPrime(n) {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6)
    if (n % i === 0 || n % (i + 2) === 0) return false;
  return true;
}
function isFib(n) {
  if (n < 0) return false;
  const ok = (x) => {
    const s = Math.round(Math.sqrt(x));
    return s * s === x;
  };
  return ok(5 * n * n + 4) || ok(5 * n * n - 4);
}
function dsum(n) {
  return String(n)
    .split("")
    .reduce((a, d) => a + +d, 0);
}
function isPalin(n) {
  const s = String(n);
  return s === s.split("").reverse().join("");
}
function isFactorial(n) {
  if (n < 1) return false;
  let i = 1,
    f = 1;
  while (f < n) {
    i++;
    f *= i;
  }
  return f === n;
}

const P = {
  acc: [
    "Interesting… this one passes.",
    "Signal confirmed. Keep probing.",
    "Affirmative. The pattern holds.",
    "This number belongs.",
    "Correct. Continue.",
  ],
  rej: [
    "Rejected. Try differently.",
    "Negative. The logic eludes you.",
    "Are you sure about that pattern?",
    "Logic requires patience, operator.",
    "This one does not comply.",
  ],
  think: [
    "Analyzing input…",
    "Processing against hidden criteria…",
    "Consulting the black box…",
    "Running classification protocol…",
    "Evaluating numeric signature…",
  ],
  wrong: [
    "Hypothesis rejected. Recalibrate.",
    "Negative. That does not match.",
    "Almost… but not quite. Think deeper.",
    "The box remains sealed. Try again.",
    "Incorrect. The pattern remains hidden.",
  ],
};
const pick = (a) => a[Math.floor(Math.random() * a.length)];

let S = {
  rule: null,
  diff: "easy",
  history: [],
  tests: 0,
  accepted: 0,
  guesses: 0,
  startTime: null,
  won: false,
  clockId: null,
  timerId: null,
  timerOn: false,
  timerLeft: 180,
};

const $ = (id) => document.getElementById(id);

function init() {
  const pool = RULES[S.diff];
  S.rule = pool[Math.floor(Math.random() * pool.length)];
  Object.assign(S, {
    history: [],
    tests: 0,
    accepted: 0,
    guesses: 0,
    startTime: Date.now(),
    won: false,
    timerOn: false,
    timerLeft: 180,
  });

  clearInterval(S.clockId);
  clearInterval(S.timerId);
  S.clockId = setInterval(tickClock, 1000);

  $("histList").innerHTML =
    '<div class="h-empty" id="hEmpty">No tests yet.<br>Begin your investigation.</div>';
  clearResult();
  $("aiMsg").textContent = "Awaiting input from operator…";
  $("aiMsg").className = "ai-msg";
  $("gFb").textContent = "Your hypothesis will be evaluated here…";
  $("gFb").style.color = "";
  $("numInput").value = "";
  $("guessInput").value = "";
  $("timerVal").textContent = "OFF";
  $("timerVal").className = "timer-big";
  $("timerBtn").textContent = "ACTIVATE TIMER";
  $("vOverlay").classList.remove("show");

  updateStats();
  console.log("[BLACK BOX] Rule:", S.rule.name);
}

function clearResult() {
  const r = $("resText");
  r.textContent = "─";
  r.className = "result-text";
}

function testNumber() {
  const raw = $("numInput").value.trim();
  if (!raw) return;
  const n = parseInt(raw);
  if (isNaN(n)) {
    $("aiMsg").textContent = "Invalid number.";
    return;
  }

  const btn = $("testBtn");
  btn.disabled = true;

  const r = $("resText");
  r.className = "result-text analyzing show";
  r.textContent = pick(P.think);
  $("aiMsg").textContent = "";

  setTimeout(
    () => {
      const ok = S.rule.test(n);
      S.tests++;
      if (ok) S.accepted++;
      if (!S.history.find((h) => h.n === n)) S.history.push({ n, ok });

      r.className = `result-text ${ok ? "accepted" : "rejected"} show`;
      r.textContent = ok ? "✓  ACCEPTED" : "✗  REJECTED";

      $("aiMsg").textContent = pick(ok ? P.acc : P.rej);
      $("aiMsg").className = ok ? "ai-msg glow" : "ai-msg";

      flashScreen(ok);
      pulseBox(ok);
      addToHistory(n, ok);
      updateStats();
      btn.disabled = false;
    },
    850 + Math.random() * 500,
  );
}

function addToHistory(n, ok) {
  const list = $("histList");
  const empty = $("hEmpty");
  if (empty) empty.remove();

  const d = document.createElement("div");
  d.className = `h-item ${ok ? "acc" : "rej"}`;
  d.innerHTML = `<span>${n}</span><span class="h-badge ${ok ? "acc" : "rej"}">${ok ? "ACCEPTED" : "REJECTED"}</span>`;
  list.prepend(d);
}

function submitGuess() {
  const val = $("guessInput").value.trim().toLowerCase();
  if (!val) return;
  S.guesses++;
  updateStats();

  const fb = $("gFb");
  if (S.rule.keys.some((k) => val.includes(k))) {
    fb.style.color = "var(--green)";
    fb.textContent = "✓ HYPOTHESIS CONFIRMED";
    victory();
  } else {
    fb.style.color = "var(--red)";
    fb.textContent = pick(P.wrong);
  }
}

function victory() {
  S.won = true;
  clearInterval(S.clockId);
  clearInterval(S.timerId);
  const e = Math.floor((Date.now() - S.startTime) / 1000);
  $("vRule").textContent = `"${S.rule.name}" — ${S.rule.desc}`;
  $("vStats").textContent =
    `${S.tests} tests  •  ${S.guesses} guesses  •  ${fmt(e)}`;
  $("vOverlay").classList.add("show");
  startConfetti();
}
function closeVictory() {
  stopConfetti();
  $("vOverlay").classList.remove("show");
  resetGame();
}
function revealRule() {
  $("gFb").style.color = "var(--cyan)";
  $("gFb").textContent = `⚠ DECLASSIFIED: "${S.rule.name}" — ${S.rule.desc}`;
}
function resetGame() {
  stopConfetti();
  S.timerOn = false;
  init();
}
function setDiff(d) {
  S.diff = d;
  document
    .querySelectorAll(".diff-btn")
    .forEach((b) => b.classList.remove("on"));
  $("d-" + d).classList.add("on");
  resetGame();
}

function toggleTimer() {
  S.timerOn = !S.timerOn;
  if (S.timerOn) {
    S.timerLeft = 120;
    $("timerBtn").textContent = "DEACTIVATE";
    clearInterval(S.timerId);
    S.timerId = setInterval(() => {
      S.timerLeft--;
      const el = $("timerVal");
      el.textContent = fmt(S.timerLeft);
      el.className =
        "timer-big" +
        (S.timerLeft <= 10 ? " crit" : S.timerLeft <= 30 ? " warn" : "");
      if (S.timerLeft <= 0) {
        clearInterval(S.timerId);
        S.timerOn = false;
        el.textContent = "TIME UP";
        el.className = "timer-big crit";
        $("timerBtn").textContent = "ACTIVATE TIMER";
        revealRule();
      }
    }, 1000);
  } else {
    clearInterval(S.timerId);
    $("timerVal").textContent = "OFF";
    $("timerVal").className = "timer-big";
    $("timerBtn").textContent = "ACTIVATE TIMER";
  }
}

function tickClock() {
  if (!S.startTime || S.won) return;
  $("sTime").textContent = fmt(Math.floor((Date.now() - S.startTime) / 1000));
}
function updateStats() {
  $("sTests").textContent = S.tests;
  $("sGuess").textContent = S.guesses;
  $("sAcc").textContent =
    S.tests > 0 ? Math.round((S.accepted / S.tests) * 100) + "%" : "–";
}
function fmt(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function flashScreen(ok) {
  const el = $(ok ? "flG" : "flR");
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 280);
}
function pulseBox(ok) {
  const b = $("blackBox");
  b.style.borderColor = ok ? "var(--green)" : "var(--red)";
  b.style.boxShadow = ok
    ? "0 0 35px rgba(0,255,136,.8),0 0 70px rgba(0,255,136,.3)"
    : "0 0 35px rgba(255,34,68,.8),0 0 70px rgba(255,34,68,.3)";
  setTimeout(() => {
    b.style.borderColor = "";
    b.style.boxShadow = "";
  }, 750);
}
function boxClick() {
  const b = $("blackBox");
  b.style.transform = "scale(.94)";
  setTimeout(() => (b.style.transform = ""), 140);
}

let cfAnim;
function startConfetti() {
  const cv = $("cfCanvas"),
    cx = cv.getContext("2d");
  cv.width = window.innerWidth;
  cv.height = window.innerHeight;
  const pts = Array.from({ length: 130 }, () => ({
    x: Math.random() * cv.width,
    y: Math.random() * cv.height - cv.height,
    r: 4 + Math.random() * 6,
    c: ["#0ff", "#0f8", "#f0f", "#ff0", "#08f"][~~(Math.random() * 5)],
    vy: 2 + Math.random() * 4,
    vx: (Math.random() - 0.5) * 2,
    rot: Math.random() * Math.PI * 2,
    rv: (Math.random() - 0.5) * 0.12,
  }));
  (function draw() {
    cx.clearRect(0, 0, cv.width, cv.height);
    pts.forEach((p) => {
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.rv;
      if (p.y > cv.height + 12) {
        p.y = -12;
        p.x = Math.random() * cv.width;
      }
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.rot);
      cx.fillStyle = p.c;
      cx.shadowColor = p.c;
      cx.shadowBlur = 8;
      cx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
      cx.restore();
    });
    cfAnim = requestAnimationFrame(draw);
  })();
}
function stopConfetti() {
  cancelAnimationFrame(cfAnim);
  const cv = $("cfCanvas");
  cv.getContext("2d").clearRect(0, 0, cv.width, cv.height);
}

(function () {
  const c = $("particles");
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const sz = 1 + Math.random() * 2.5;
    p.style.cssText =
      `left:${Math.random() * 100}vw;width:${sz}px;height:${sz}px;` +
      `background:${Math.random() > 0.5 ? "var(--cyan)" : "var(--pink)"};` +
      `animation-duration:${10 + Math.random() * 18}s;animation-delay:${Math.random() * 18}s;`;
    c.appendChild(p);
  }
})();

$("numInput").addEventListener(
  "keydown",
  (e) => e.key === "Enter" && testNumber(),
);
$("guessInput").addEventListener(
  "keydown",
  (e) => e.key === "Enter" && submitGuess(),
);

init();
