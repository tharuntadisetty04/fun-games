const SYMBOLS = ["7", "🍒", "💎", "⭐", "🍋", "🔔"];

const POINTS = {
  7: 100,
  "💎": 50,
  "⭐": 40,
  "🔔": 30,
  "🍒": 20,
  "🍋": 10,
};

const WIN_CHANCE = 0.22;
const SEVEN_CHANCE = 0.04;
const SYM_H = 118;
const BASE_STRIP = 30;
const REEL_EXTRA = [6, 8, 10];
const REEL_DELAY = [0, 700, 1400];
const REEL_DUR = [1800, 2300, 2800];
const MAX_SPINS = 3;

let spinning = false;
let finalSyms = [];
let currentScore = 0;
let spinsUsed = 0;
let currentPlayer = "";
let sessionActive = false;
let leaderboard = (() => {
  try {
    const saved = localStorage.getItem("slotLeaderboard");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
})();

function saveLeaderboard() {
  try {
    localStorage.setItem("slotLeaderboard", JSON.stringify(leaderboard));
  } catch (e) {
    console.warn("Could not save leaderboard to localStorage:", e);
  }
}

const spinBtn = document.getElementById("spinBtn");
const statusEl = document.getElementById("statusText");
const winFlash = document.getElementById("winFlash");
const leverArm = document.getElementById("leverArm");
const leverTrack = document.getElementById("leverTrack");
const leverArrow = document.getElementById("leverArrow");
const winPtsEl = document.getElementById("winPts");
const nameInput = document.getElementById("nameInput");
const nameErr = document.getElementById("nameErr");
const scoreValEl = document.getElementById("scoreVal");
const scoreSpinsEl = document.getElementById("scoreSpinsLeft");
const lbTop3El = document.getElementById("lbTop3");
const modalOverlay = document.getElementById("modalOverlay");
const modalList = document.getElementById("modalList");
const modalClose = document.getElementById("modalClose");
const viewAllBtn = document.getElementById("viewAllBtn");

const strips = [0, 1, 2].map((i) => document.getElementById("strip" + i));
const reelSlots = [0, 1, 2].map((i) => document.getElementById("reel" + i));
const dots = [0, 1, 2].map((i) => document.getElementById("dot" + i));

function updateDots() {
  dots.forEach((dot, i) => {
    dot.className = "spin-dot";
    if (i < spinsUsed) dot.classList.add("used");
    else if (sessionActive) dot.classList.add("remaining");
  });
}

function updateScoreDisplay() {
  scoreValEl.textContent = currentScore;

  if (!sessionActive) {
    scoreSpinsEl.textContent = "ENTER NAME TO START";
    return;
  }

  const spinsLeft = MAX_SPINS - spinsUsed;
  scoreSpinsEl.textContent =
    spinsLeft > 0
      ? `${spinsLeft} SPIN${spinsLeft === 1 ? "" : "S"} REMAINING`
      : "SESSION COMPLETE";
}

function setStatus(text, cls) {
  statusEl.textContent = text;
  statusEl.className = "status-text " + cls;
}

function startSession() {
  const name = nameInput.value.trim();

  if (!name) {
    nameErr.textContent = "NAME REQUIRED";
    return;
  }

  currentPlayer = name;
  currentScore = 0;
  spinsUsed = 0;
  sessionActive = true;

  nameInput.disabled = true;
  nameErr.textContent = "";

  spinBtn.disabled = false;
  spinBtn.className = "spin-btn";
  spinBtn.textContent = "SPIN";

  updateDots();
  updateScoreDisplay();
  setStatus("PULL THE LEVER!", "idle");
}

function endSession() {
  sessionActive = false;
  addToLeaderboard(currentPlayer, currentScore);
  updateScoreDisplay();
  updateDots();

  spinBtn.disabled = false;
  spinBtn.className = "spin-btn done-btn";
  spinBtn.textContent = "PLAY AGAIN";
}

function resetForNewPlayer() {
  nameInput.disabled = false;
  nameInput.value = "";
  nameInput.focus();

  currentScore = 0;
  spinsUsed = 0;
  sessionActive = false;

  spinBtn.disabled = true;
  spinBtn.className = "spin-btn";
  spinBtn.textContent = "SPIN";

  reelSlots.forEach((r) => r.classList.remove("win-glow"));
  winPtsEl.classList.remove("show");

  updateDots();
  updateScoreDisplay();
  setStatus("ENTER YOUR NAME!", "idle");
}

nameInput.addEventListener("input", () => {
  nameErr.textContent = "";
});

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (!sessionActive && nameInput.value.trim()) startSession();
  }
});

spinBtn.addEventListener("click", () => {
  if (spinBtn.classList.contains("done-btn")) {
    resetForNewPlayer();
    return;
  }
  if (!sessionActive) {
    startSession();
    return;
  }
  doSpin();
});

leverArm.addEventListener("click", () => {
  if (spinBtn.classList.contains("done-btn")) return;
  if (!sessionActive) {
    startSession();
    return;
  }
  doSpin();
});

const medals = ["🥇", "🥈", "🥉"];
const rankClasses = ["top-1", "top-2", "top-3"];

function addToLeaderboard(name, score) {
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  saveLeaderboard();
  renderTop3(name, score);
  renderModal();
}

function renderTop3(newName, newScore) {
  lbTop3El.innerHTML = "";
  const top = leaderboard.slice(0, 3);

  if (top.length === 0) {
    lbTop3El.innerHTML = `
            <div style="font-family:'Bebas Neue',sans-serif;font-size:0.6rem;
                        letter-spacing:2px;color:#2a2848;text-align:center;padding:10px 0">
              NO SCORES YET
            </div>`;
    return;
  }

  top.forEach((entry, i) => {
    const div = document.createElement("div");
    div.className = "lb-entry" + (i < 3 ? " " + rankClasses[i] : "");

    const isNew = newName && entry.name === newName && entry.score === newScore;
    if (isNew) div.classList.add("new-entry");

    div.innerHTML = `
            <div class="lb-rank">${medals[i] || i + 1}</div>
            <div class="lb-name">${entry.name}</div>
            <div class="lb-score">${entry.score}</div>`;

    lbTop3El.appendChild(div);
  });
}

function renderModal() {
  modalList.innerHTML = "";

  leaderboard.forEach((entry, i) => {
    const div = document.createElement("div");
    div.className = "modal-entry" + (i < 3 ? " " + rankClasses[i] : "");
    div.innerHTML = `
            <div class="modal-rank">${i < 3 ? medals[i] : i + 1}</div>
            <div class="modal-name">${entry.name}</div>
            <div class="modal-score">${entry.score} pts</div>`;
    modalList.appendChild(div);
  });
}

viewAllBtn.addEventListener("click", () => {
  renderModal();
  modalOverlay.classList.add("open");
});

modalClose.addEventListener("click", () => {
  modalOverlay.classList.remove("open");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove("open");
});

const SFX = (() => {
  let audioCtx = null;

  function getCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function osc(type, freq, start, dur, g0, g1, ac) {
    const gainNode = ac.createGain();
    gainNode.gain.setValueAtTime(g0, start);
    gainNode.gain.exponentialRampToValueAtTime(
      Math.max(g1, 0.0001),
      start + dur,
    );

    const oscillator = ac.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, start);
    oscillator.connect(gainNode);
    gainNode.connect(ac.destination);
    oscillator.start(start);
    oscillator.stop(start + dur + 0.01);
  }

  function oscSlide(type, f0, f1, start, dur, g0, g1, ac) {
    const gainNode = ac.createGain();
    gainNode.gain.setValueAtTime(g0, start);
    gainNode.gain.exponentialRampToValueAtTime(
      Math.max(g1, 0.0001),
      start + dur,
    );

    const oscillator = ac.createOscillator();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(f0, start);
    oscillator.frequency.linearRampToValueAtTime(f1, start + dur);
    oscillator.connect(gainNode);
    gainNode.connect(ac.destination);
    oscillator.start(start);
    oscillator.stop(start + dur + 0.01);
  }

  function noise(start, dur, gainVal, ac) {
    const buffer = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const src = ac.createBufferSource();
    src.buffer = buffer;

    const gainNode = ac.createGain();
    gainNode.gain.setValueAtTime(gainVal, start);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, start + dur);

    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 800;
    bp.Q.value = 0.8;

    src.connect(bp);
    bp.connect(gainNode);
    gainNode.connect(ac.destination);
    src.start(start);
    src.stop(start + dur + 0.01);
  }

  return {
    leverPull() {
      const ac = getCtx(),
        t = ac.currentTime;
      noise(t, 0.06, 0.35, ac);
      oscSlide("sine", 180, 60, t, 0.12, 0.4, 0.01, ac);
    },

    leverSnap() {
      const ac = getCtx(),
        t = ac.currentTime;
      oscSlide("sine", 400, 220, t, 0.18, 0.3, 0.01, ac);
      noise(t, 0.05, 0.15, ac);
    },

    reelSpin() {
      const ac = getCtx();
      let running = true,
        tick = 0;

      function go() {
        if (!running) return;
        const t = ac.currentTime;
        const gap = 0.055 - tick * 0.001;
        tick = Math.min(tick + 1, 40);

        noise(t, 0.025, 0.12, ac);
        osc("square", 1200 + Math.random() * 400, t, 0.02, 0.08, 0.001, ac);
        setTimeout(go, Math.max(gap * 1000, 30));
      }

      go();
      return () => {
        running = false;
      };
    },

    reelStop(idx) {
      const ac = getCtx(),
        t = ac.currentTime;
      const pitches = [140, 110, 90];
      oscSlide(
        "sine",
        pitches[idx] * 1.4,
        pitches[idx],
        t,
        0.14,
        0.55,
        0.01,
        ac,
      );
      noise(t, 0.09, 0.4, ac);
    },

    win() {
      const ac = getCtx(),
        t = ac.currentTime;
      const notes = [523, 659, 784, 1047, 1319];
      notes.forEach((freq, i) => {
        const st = t + i * 0.11;
        osc("sine", freq, st, 0.6, 0.5, 0.001, ac);
        osc("triangle", freq * 2, st, 0.3, 0.15, 0.001, ac);
      });

      setTimeout(() => {
        const ac2 = getCtx(),
          t2 = ac2.currentTime;
        [1047, 1319, 1568].forEach((freq, i) => {
          osc("sine", freq, t2 + i * 0.07, 0.5, 0.3, 0.001, ac2);
        });
      }, 620);
    },

    lose() {
      const ac = getCtx(),
        t = ac.currentTime;
      oscSlide("sawtooth", 320, 180, t, 0.22, 0.25, 0.001, ac);
      oscSlide("sawtooth", 240, 140, t + 0.24, 0.22, 0.2, 0.001, ac);
      oscSlide("sine", 80, 40, t + 0.05, 0.15, 0.3, 0.001, ac);
    },

    sessionEnd() {
      const ac = getCtx(),
        t = ac.currentTime;
      [392, 494, 587, 740].forEach((freq, i) => {
        osc("sine", freq, t + i * 0.15, 0.4, 0.4, 0.001, ac);
      });
    },
  };
})();

let leverMax = 0;

function measureLever() {
  const trackHeight = leverTrack.clientHeight;
  const armHeight = leverArm.offsetHeight;
  leverMax = Math.max(0, trackHeight - armHeight - 4);
}

function setLeverPos(px) {
  leverArm.style.top = px + "px";
}

function animateLever() {
  return new Promise((resolve) => {
    measureLever();
    leverArrow.classList.add("hidden");

    const PULL_DURATION = 260;
    const RETURN_DURATION = 420;
    SFX.leverPull();

    const pullStart = performance.now();
    (function pullFrame(now) {
      const progress = Math.min((now - pullStart) / PULL_DURATION, 1);
      setLeverPos(leverMax * progress * progress);
      if (progress < 1) {
        requestAnimationFrame(pullFrame);
      } else {
        setTimeout(returnFrame, 70);
      }
    })(pullStart);

    function returnFrame() {
      SFX.leverSnap();
      const returnStart = performance.now();
      (function springFrame(now) {
        const p = Math.min((now - returnStart) / RETURN_DURATION, 1);
        const ease = 1 - Math.pow(1 - p, 3) * Math.cos(p * Math.PI * 2.8);
        setLeverPos(leverMax * (1 - ease));
        if (p < 1) {
          requestAnimationFrame(springFrame);
        } else {
          setLeverPos(0);
          leverArrow.classList.remove("hidden");
          resolve();
        }
      })(returnStart);
    }
  });
}

function determineResult() {
  const roll = Math.random();

  if (roll < SEVEN_CHANCE) {
    return ["7", "7", "7"];
  }

  if (roll < WIN_CHANCE) {
    const nonSeven = SYMBOLS.filter((s) => s !== "7");
    const sym = nonSeven[Math.floor(Math.random() * nonSeven.length)];
    return [sym, sym, sym];
  }

  let result;
  do {
    result = SYMBOLS.map(
      () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    );
  } while (result[0] === result[1] && result[1] === result[2]);

  return result;
}

const randomSym = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

function buildStrip(stripEl) {
  stripEl.innerHTML = "";
  for (let i = 0; i < BASE_STRIP; i++) {
    addSymbolCell(stripEl, randomSym());
  }
}

function addSymbolCell(stripEl, symbol) {
  const cell = document.createElement("div");
  cell.className = "reel-symbol" + (symbol === "7" ? " is-seven" : "");
  cell.textContent = symbol;
  stripEl.appendChild(cell);
  return cell;
}

function setSymbolCell(cell, symbol) {
  cell.textContent = symbol;
  cell.className = "reel-symbol" + (symbol === "7" ? " is-seven" : "");
}

function spinReel(reelIdx, target, onDone) {
  const strip = strips[reelIdx];

  buildStrip(strip);

  const totalNeeded = REEL_EXTRA[reelIdx] * BASE_STRIP + BASE_STRIP + 5;
  while (strip.children.length < totalNeeded) {
    addSymbolCell(strip, randomSym());
  }

  const targetIndex = strip.children.length - 3;
  setSymbolCell(strip.children[targetIndex], target);

  strip.style.transition = "none";
  strip.style.transform = "translateY(0px)";
  strip.getBoundingClientRect();

  strip.style.transition = `transform ${REEL_DUR[reelIdx]}ms cubic-bezier(0.15,0.65,0.10,1.0)`;
  strip.style.transform = `translateY(${-(targetIndex * SYM_H)}px)`;

  setTimeout(onDone, REEL_DUR[reelIdx]);
}

async function doSpin() {
  if (spinning || !sessionActive || spinsUsed >= MAX_SPINS) return;

  spinning = true;
  spinBtn.disabled = true;

  reelSlots.forEach((r) => r.classList.remove("win-glow"));
  winPtsEl.classList.remove("show");

  setStatus("SPINNING...", "spinning");

  await animateLever();

  finalSyms = determineResult();

  const stopSpinSFX = SFX.reelSpin();

  let stoppedCount = 0;
  for (let i = 0; i < 3; i++) {
    const reelIdx = i;
    setTimeout(() => {
      spinReel(reelIdx, finalSyms[reelIdx], () => {
        SFX.reelStop(reelIdx);

        if (++stoppedCount === 3) {
          stopSpinSFX();
          onAllStopped();
        }
      });
    }, REEL_DELAY[i]);
  }
}

function onAllStopped() {
  const isWin = finalSyms[0] === finalSyms[1] && finalSyms[1] === finalSyms[2];
  spinsUsed++;

  if (isWin) {
    const pts = POINTS[finalSyms[0]] || 10;
    currentScore += pts;

    requestAnimationFrame(() => {
      reelSlots.forEach((r) => r.classList.add("win-glow"));
    });

    setStatus(finalSyms[0] === "7" ? "🏆JACKPOT🏆" : "YOU WIN!", "win");

    winPtsEl.textContent = "+" + pts + " pts";
    winPtsEl.classList.add("show");

    setTimeout(() => SFX.win(), 80);
    triggerWinFX();

    scoreValEl.textContent = currentScore;
  } else {
    setStatus("NO MATCH", "lose");
    setTimeout(() => SFX.lose(), 120);
  }

  updateDots();
  updateScoreDisplay();
  spinning = false;

  const spinsLeft = MAX_SPINS - spinsUsed;

  if (spinsLeft > 0) {
    spinBtn.disabled = false;
    setTimeout(
      () => {
        reelSlots.forEach((r) => r.classList.remove("win-glow"));
        winPtsEl.classList.remove("show");
        setStatus("PULL THE LEVER!", "idle");
      },
      isWin ? 3000 : 1200,
    );
  } else {
    setTimeout(
      () => {
        reelSlots.forEach((r) => r.classList.remove("win-glow"));
        winPtsEl.classList.remove("show");
        setStatus("FINAL SCORE: " + currentScore, "win");
        SFX.sessionEnd();
        endSession();
      },
      isWin ? 3000 : 1000,
    );
  }
}

function triggerWinFX() {
  winFlash.classList.add("active");
  setTimeout(() => winFlash.classList.remove("active"), 1400);

  startConfetti();
  setTimeout(stopConfetti, 2200);
}

(function bgAtmosphere() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const particles = [];
  for (let i = 0; i < 55; i++) {
    const isEmber = Math.random() > 0.45;
    particles.push({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: isEmber ? Math.random() * 2.2 + 0.8 : Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.35 + 0.08),
      alpha: Math.random() * 0.5 + 0.1,
      flicker: Math.random() * Math.PI * 2,
      flickerSpeed: Math.random() * 0.04 + 0.01,
      h: isEmber
        ? Math.floor(Math.random() * 30 + 20)
        : Math.floor(Math.random() * 60 + 200),
      s: isEmber ? 90 : 30,
      isEmber,
    });
  }

  (function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.flicker += p.flickerSpeed;
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < -5) p.y = canvas.height + 5;
      if (p.x < -5) p.x = canvas.width + 5;
      if (p.x > canvas.width + 5) p.x = -5;

      const pulse = 0.5 + 0.5 * Math.sin(p.flicker);
      const alpha = p.alpha * (0.6 + 0.4 * pulse);
      const glowR = p.r * (p.isEmber ? 4 : 3);

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
      grad.addColorStop(0, `hsla(${p.h},${p.s}%,70%,${alpha})`);
      grad.addColorStop(0.4, `hsla(${p.h},${p.s}%,55%,${alpha * 0.4})`);
      grad.addColorStop(1, `hsla(${p.h},${p.s}%,40%,0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.h},${p.s}%,90%,${alpha * 1.2})`;
      ctx.fill();
    });

    requestAnimationFrame(drawFrame);
  })();
})();

const confettiCanvas = document.getElementById("confetti-canvas");
const cctx = confettiCanvas.getContext("2d");

let confettiParts = [];
let confettiActive = false;
let confettiRafId = null;

const CONFETTI_COLOURS = [
  "#FFD700",
  "#FF4500",
  "#00FF88",
  "#FF69B4",
  "#00BFFF",
  "#FF6347",
  "#ADFF2F",
  "#FF1493",
];

function resizeConfetti() {
  confettiCanvas.width = innerWidth;
  confettiCanvas.height = innerHeight;
}
addEventListener("resize", resizeConfetti);
resizeConfetti();

function makeConfettiParticle() {
  return {
    x: confettiCanvas.width * Math.random(),
    y: Math.random() * -confettiCanvas.height * 0.5,
    w: Math.random() * 9 + 4,
    h: Math.random() * 5 + 3,
    col: CONFETTI_COLOURS[Math.floor(Math.random() * CONFETTI_COLOURS.length)],
    vy: Math.random() * 3 + 1.8,
    vx: (Math.random() - 0.5) * 1.0,
    ang: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.22,
    op: 1,
  };
}

function startConfetti() {
  confettiActive = false;
  if (confettiRafId) cancelAnimationFrame(confettiRafId);
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParts = Array.from({ length: 80 }, makeConfettiParticle);
  confettiActive = true;
  confettiRafId = requestAnimationFrame(drawConfetti);
}

function stopConfetti() {
  confettiActive = false;
}

function drawConfetti() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  let anyAlive = false;

  for (let i = 0; i < confettiParts.length; i++) {
    const p = confettiParts[i];

    p.y += p.vy;
    p.x += p.vx;
    p.ang += p.spin;

    const fadeStart = confettiCanvas.height * 0.72;
    if (p.y > fadeStart) {
      p.op = Math.max(
        0,
        1 - (p.y - fadeStart) / (confettiCanvas.height * 0.28),
      );
    }

    if (p.op <= 0 || p.y > confettiCanvas.height + 10) continue;

    anyAlive = true;

    cctx.save();
    cctx.globalAlpha = p.op;
    cctx.translate(p.x, p.y);
    cctx.rotate(p.ang);
    cctx.fillStyle = p.col;
    cctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    cctx.restore();
  }

  if (anyAlive || confettiActive) {
    confettiRafId = requestAnimationFrame(drawConfetti);
  } else {
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiRafId = null;
  }
}

(function init() {
  const INITIAL_SYMBOLS = ["7", "🍒", "💎"];

  strips.forEach((strip, i) => {
    buildStrip(strip);
    setSymbolCell(strip.children[0], INITIAL_SYMBOLS[i]);
    strip.style.transition = "none";
    strip.style.transform = "translateY(0px)";
  });

  updateDots();
  updateScoreDisplay();

  renderTop3(null, null);
  renderModal();

  requestAnimationFrame(() => {
    const machineBody = document.getElementById("machineBody");
    const bottomPanel = document.getElementById("bottomPanel");
    const totalHeight = machineBody.offsetHeight + bottomPanel.offsetHeight;
    document.getElementById("leverHousing").style.minHeight =
      totalHeight + "px";

    const marqueeHeight = document.querySelector(".marquee").offsetHeight;
    document.getElementById("leverCol").style.paddingTop = marqueeHeight + "px";

    measureLever();
    setLeverPos(0);
  });

  nameInput.focus();
})();
