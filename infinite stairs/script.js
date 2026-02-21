let state = {
  score: 0,
  step: 0,
  highScore: 0,
  highStep: 0,
  attempt: 1,
  gamesPlayed: 0,
  riskTotal: 0,
  riskWins: 0,
  busy: false,
};

const MILESTONES = [10, 20, 30, 50, 75, 100, 150, 200];
function getNextMilestone(step) {
  return MILESTONES.find((m) => m > step) || Math.ceil((step + 1) / 10) * 10;
}

function rnd(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const canvas = document.getElementById("staircaseCanvas");
const ctx = canvas.getContext("2d");

const RADIUS = 11;
const VIS_STEPS = 8;
const GRAVITY = 0.7;

let ball = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  jumping: false,
  idleT: 0,
  color: "#ffd700",
};

let landX = 0,
  landY = 0;
let currentDrawStep = 0;
let animFrameId = null;

let trail = [];

function resizeCanvas() {
  const panel = document.getElementById("stairPanel");
  canvas.width = panel.clientWidth - 40;
  canvas.height = 300;
  recomputeLanding();
  if (!ball.jumping) {
    ball.x = landX;
    ball.y = landY;
  }
}

function recomputeLanding() {
  const W = canvas.width,
    H = canvas.height;
  const stepW = W / (VIS_STEPS + 2);
  const stepH = H / (VIS_STEPS + 2);
  const i = VIS_STEPS - 1;
  const x = W - (i + 1) * stepW;
  const y = H - (i + 1) * stepH;
  landX = x - stepW * 0.5;
  landY = y - RADIUS - 2;
}

function launchBall(peakHeight, color) {
  ball.color = color || "#ffd700";
  ball.jumping = true;
  trail = [];

  const dx = landX - ball.x;
  const dy = landY - ball.y;

  const vy0 = -Math.sqrt(2 * GRAVITY * peakHeight);
  const totalFrames =
    ((-2 * vy0) / GRAVITY) * (1 + (Math.max(0, dy) / peakHeight) * 0.5);
  const vx0 = dx / totalFrames;

  ball.vx = vx0;
  ball.vy = vy0;
}

function jumpSafe() {
  const W = canvas.width,
    H = canvas.height;
  const stepW = W / (VIS_STEPS + 2);
  const stepH = H / (VIS_STEPS + 2);
  ball.x = landX + stepW;
  ball.y = landY + stepH;
  launchBall(stepH * 1.4, "#00ff88");
}

function jumpRisk() {
  const W = canvas.width,
    H = canvas.height;
  const stepW = W / (VIS_STEPS + 2);
  const stepH = H / (VIS_STEPS + 2);
  ball.x = landX + stepW * 2.5;
  ball.y = landY + stepH * 2;
  launchBall(stepH * 3.5, "#ff2d55");
}

function ballFall() {
  ball.jumping = true;
  ball.vx = 1;
  ball.vy = -4;
  trail = [];
  ball.color = "#ff2d55";
}

function drawFrame() {
  const W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const stepW = W / (VIS_STEPS + 2);
  const stepH = H / (VIS_STEPS + 2);

  for (let i = 0; i < VIS_STEPS; i++) {
    const isActive = i === VIS_STEPS - 1;
    const stairNum = Math.max(0, currentDrawStep - (VIS_STEPS - 1 - i));
    const x = W - (i + 1) * stepW;
    const y = H - (i + 1) * stepH;
    const alpha = 0.2 + (i / VIS_STEPS) * 0.7;

    ctx.globalAlpha = alpha;
    ctx.strokeStyle = isActive ? "rgba(0,229,255,0.95)" : "rgba(0,229,255,0.5)";
    ctx.lineWidth = isActive ? 2 : 1.2;

    if (isActive) {
      ctx.shadowColor = "#00e5ff";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "rgba(0,229,255,0.08)";
      ctx.fillRect(x - stepW, y, stepW, stepH * 0.15);
    }

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(x - stepW, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + stepH);
    ctx.stroke();

    if (stairNum > 0) {
      ctx.fillStyle = isActive ? "rgba(0,229,255,0.9)" : "rgba(0,229,255,0.35)";
      ctx.font = `${isActive ? "bold " : ""}${isActive ? 11 : 9}px 'Share Tech Mono'`;
      ctx.textAlign = "center";
      ctx.fillText(stairNum, x - stepW * 0.5, y + stepH * 0.6);
    }
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = "rgba(0,229,255,0.25)";
  ctx.font = `20px 'Share Tech Mono'`;
  ctx.textAlign = "left";
  ctx.fillText(
    "∞",
    W - (VIS_STEPS + 1) * stepW + 6,
    H - (VIS_STEPS + 1) * stepH + 22,
  );

  trail.forEach((t, i) => {
    const a = (i / trail.length) * 0.5;
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.arc(t.x, t.y, RADIUS * (i / trail.length) * 0.8, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  const dist = Math.max(0, ball.y - landY);
  const shadowAlpha = Math.max(0, 0.4 - dist / 200);
  const shadowScale = Math.max(0.2, 1 - dist / 200);
  ctx.globalAlpha = shadowAlpha;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(
    landX,
    landY + RADIUS * 0.6,
    RADIUS * shadowScale,
    RADIUS * 0.3 * shadowScale,
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.shadowColor = ball.color;
  ctx.shadowBlur = 24;
  const grad = ctx.createRadialGradient(
    ball.x - RADIUS * 0.35,
    ball.y - RADIUS * 0.35,
    RADIUS * 0.05,
    ball.x,
    ball.y,
    RADIUS,
  );
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.3, ball.color);
  grad.addColorStop(
    1,
    ball.color === "#ffd700"
      ? "#885500"
      : ball.color === "#00ff88"
        ? "#004422"
        : "#660011",
  );
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function animLoop() {
  if (ball.jumping) {
    trail.push({ x: ball.x, y: ball.y });
    if (trail.length > 12) trail.shift();

    ball.vy += GRAVITY;
    ball.x += ball.vx;
    ball.y += ball.vy;

    const arrived =
      ball.vy > 0 && ball.y >= landY && Math.abs(ball.x - landX) < 30;
    const offScreen = ball.y > canvas.height + 60;

    if (arrived) {
      ball.x = landX;
      ball.y = landY;
      ball.vx = 0;
      ball.vy = 0;
      ball.jumping = false;
      ball.color = "#ffd700";
      trail = [];
      updateStepDisplay();
    } else if (offScreen) {
      ball.x = landX;
      ball.y = landY;
      ball.vx = 0;
      ball.vy = 0;
      ball.jumping = false;
      ball.color = "#ffd700";
      trail = [];
    }
  } else {
    ball.idleT += 0.07;
    ball.x = landX;
    ball.y = landY + Math.sin(ball.idleT) * 4;
  }

  drawFrame();
  animFrameId = requestAnimationFrame(animLoop);
}

function startAnim(step) {
  currentDrawStep = step;
  recomputeLanding();
  if (!animFrameId) {
    ball.x = landX;
    ball.y = landY;
    ball.idleT = 0;
    animFrameId = requestAnimationFrame(animLoop);
  }
}

function updateStepDisplay() {
  document.getElementById("stepDisplay").textContent = state.step;
}

function updateMilestoneBar() {
  const next = getNextMilestone(state.step);
  const prev = MILESTONES[MILESTONES.indexOf(next) - 1] || 0;
  const pct = Math.min(
    100,
    Math.round(((state.step - prev) / (next - prev)) * 100),
  );
  document.getElementById("nextMilestone").textContent = next;
  document.getElementById("milestonePercent").textContent = pct + "%";
  document.getElementById("milestoneFill").style.width = pct + "%";
}

function updateUI() {
  document.getElementById("stepDisplay").textContent = state.step;
  document.getElementById("scoreDisplay").textContent =
    state.score.toLocaleString();
  document.getElementById("highScoreDisplay").textContent =
    state.highScore.toLocaleString();
  document.getElementById("attemptDisplay").textContent = state.attempt;

  document.getElementById("statGames").textContent = state.gamesPlayed;
  document.getElementById("statHighStep").textContent = state.highStep;
  document.getElementById("statRiskTotal").textContent = state.riskTotal;
  document.getElementById("statRiskRate").textContent =
    state.riskTotal > 0
      ? Math.round((state.riskWins / state.riskTotal) * 100) + "%"
      : "—";

  updateMilestoneBar();
  currentDrawStep = state.step;
  recomputeLanding();
}

function spawnFloat(text, color, x, y) {
  const el = document.createElement("div");
  el.className = "float-text";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.color = color;
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

let audioCtx;
function getAudio() {
  if (!audioCtx)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, type, duration, gain = 0.3) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playSafeSound() {
  playTone(440, "sine", 0.2, 0.2);
  setTimeout(() => playTone(550, "sine", 0.15, 0.2), 120);
}

function playWinSound() {
  [330, 440, 550, 660].forEach((f, i) => {
    setTimeout(() => playTone(f, "sine", 0.3, 0.25), i * 80);
  });
}

function playLoseSound() {
  playTone(200, "sawtooth", 0.1, 0.35);
  setTimeout(() => playTone(150, "sawtooth", 0.15, 0.4), 80);
  setTimeout(() => playTone(100, "sawtooth", 0.25, 0.6), 200);
}

function playMilestoneSound() {
  [440, 550, 660, 880, 1100].forEach((f, i) => {
    setTimeout(() => playTone(f, "sine", 0.4, 0.2), i * 60);
  });
}

const confCanvas = document.getElementById("confettiCanvas");
const confCtx = confCanvas.getContext("2d");
confCanvas.width = window.innerWidth;
confCanvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  confCanvas.width = window.innerWidth;
  confCanvas.height = window.innerHeight;
});

let confParticles = [];
let confAnimId = null;

function launchConfetti() {
  confParticles = [];
  for (let i = 0; i < 120; i++) {
    confParticles.push({
      x: Math.random() * confCanvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * 4 + 2,
      color: ["#00ff88", "#ffd700", "#00e5ff", "#b44eff", "#ff2d55"][
        Math.floor(Math.random() * 5)
      ],
      size: Math.random() * 8 + 4,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      life: 1,
    });
  }
  if (confAnimId) cancelAnimationFrame(confAnimId);
  animateConfetti();
}

function animateConfetti() {
  confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
  confParticles = confParticles.filter((p) => p.life > 0);
  confParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.rot += p.rotV;
    p.life -= 0.012;
    confCtx.save();
    confCtx.globalAlpha = Math.max(0, p.life);
    confCtx.translate(p.x, p.y);
    confCtx.rotate((p.rot * Math.PI) / 180);
    confCtx.fillStyle = p.color;
    confCtx.shadowColor = p.color;
    confCtx.shadowBlur = 8;
    confCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    confCtx.restore();
  });
  if (confParticles.length > 0) {
    confAnimId = requestAnimationFrame(animateConfetti);
  }
}

function setBusy(val) {
  state.busy = val;
  document.getElementById("safeBtn").disabled = val;
  document.getElementById("riskBtn").disabled = val;
}

function doSafeStep() {
  if (state.busy) return;
  setBusy(true);

  state.score += 10;
  state.step += 1;

  playSafeSound();

  document.getElementById("scoreDisplay").textContent =
    state.score.toLocaleString();
  updateHighs();
  updateMilestoneBar();

  currentDrawStep = state.step;
  recomputeLanding();
  jumpSafe();

  const btn = document.getElementById("safeBtn");
  const r = btn.getBoundingClientRect();
  spawnFloat("+10", "#00ff88", r.left + r.width / 2, r.top);

  checkMilestone();

  setTimeout(() => setBusy(false), 480);
}

function doRiskStep() {
  if (state.busy) return;
  setBusy(true);

  state.riskTotal++;

  const overlay = document.getElementById("calcOverlay");
  const resultFlash = document.getElementById("resultFlash");
  const dots = document.getElementById("calcDots");
  overlay.classList.add("active");
  resultFlash.style.opacity = "0";
  resultFlash.className = "result-flash";

  let dotCount = 0;
  const dotInterval = setInterval(() => {
    dotCount++;
    dots.textContent = ". ".repeat((dotCount % 3) + 1);
  }, 300);

  setTimeout(() => {
    clearInterval(dotInterval);
    const won = Math.random() < 0.5;

    if (won) {
      state.riskWins++;
      state.score *= 2;
      state.step += 1;

      resultFlash.textContent = "DOUBLED ✓";
      resultFlash.classList.add("win");
      resultFlash.style.opacity = "1";
      playWinSound();

      setTimeout(() => {
        overlay.classList.remove("active");

        document.getElementById("scoreDisplay").textContent =
          state.score.toLocaleString();
        updateHighs();
        updateMilestoneBar();
        currentDrawStep = state.step;
        recomputeLanding();
        jumpRisk();

        const btn = document.getElementById("riskBtn");
        const r = btn.getBoundingClientRect();
        spawnFloat("×2!", "#ffd700", r.left + r.width / 2, r.top);
        checkMilestone();

        setTimeout(() => setBusy(false), 900);
      }, 1000);
    } else {
      state.score = 0;
      state.gamesPlayed++;

      resultFlash.textContent = "YOU FELL.";
      resultFlash.classList.add("lose");
      resultFlash.style.opacity = "1";
      playLoseSound();

      setTimeout(() => {
        overlay.classList.remove("active");
        document.getElementById("stairPanel").classList.add("shake");
        setTimeout(
          () => document.getElementById("stairPanel").classList.remove("shake"),
          800,
        );

        ballFall();

        setTimeout(() => {
          state.step = 0;
          currentDrawStep = 0;
          recomputeLanding();
          ball.x = landX;
          ball.y = landY - 80;
          ball.vx = 0;
          ball.vy = 0;
          ball.jumping = false;
          ball.idleT = 0;
          ball.color = "#ffd700";
          trail = [];

          document.getElementById("stairPanel").classList.add("pulse-red");
          setTimeout(
            () =>
              document
                .getElementById("stairPanel")
                .classList.remove("pulse-red"),
            500,
          );

          updateUI();
          setBusy(false);
        }, 900);
      }, 900);
    }
  }, 1800);
}

function checkMilestone() {
  if (MILESTONES.includes(state.step)) {
    launchConfetti();
    playMilestoneSound();
    spawnFloat(
      "★ STEP " + state.step + " ★",
      "#ffd700",
      window.innerWidth / 2 - 80,
      window.innerHeight / 2,
    );
  }
}

function updateHighs() {
  if (state.score > state.highScore) state.highScore = state.score;
  if (state.step > state.highStep) state.highStep = state.step;
}

function resetGame() {
  state.score = 0;
  state.step = 0;
  state.attempt++;
  state.gamesPlayed++;
  setBusy(false);
  currentDrawStep = 0;
  recomputeLanding();
  ball.x = landX;
  ball.y = landY - 80;
  ball.vx = 0;
  ball.vy = 3;
  ball.jumping = false;
  ball.idleT = 0;
  ball.color = "#ffd700";
  trail = [];
  updateUI();
}

window.addEventListener("load", () => {
  resizeCanvas();
  currentDrawStep = 0;
  recomputeLanding();
  ball.x = landX;
  ball.y = landY - 100;
  ball.vx = 0;
  ball.vy = 0;
  ball.idleT = 0;
  ball.color = "#ffd700";
  updateUI();
  animFrameId = requestAnimationFrame(animLoop);
});

window.addEventListener("resize", resizeCanvas);
