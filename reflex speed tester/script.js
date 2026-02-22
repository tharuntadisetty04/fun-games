let state = "idle";
let gameMode = "normal";
let startTime = null;
let timeout = null;
let heartbeatInterval = null;
let tensionStart = null;
let tensionDuration = null;
let results = [];
let fakeoutPending = [];
let isFakeout = false;

const arena = document.getElementById("arena");
const mainText = document.getElementById("main-text");
const subText = document.getElementById("sub-text");
const statLast = document.getElementById("stat-last");
const statBest = document.getElementById("stat-best");
const statAvg = document.getElementById("stat-avg");
const historyEl = document.getElementById("history");
const pulseRing = document.getElementById("pulse-ring");
const goBurst = document.getElementById("go-burst");
const errorOverlay = document.getElementById("error-overlay");
const tensionFill = document.getElementById("tension-fill");
const modeBadge = document.getElementById("mode-badge");
const btnSubmit = document.getElementById("btn-submit");
const playerInput = document.getElementById("player-name");

let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone({
  type = "sine",
  freq = 440,
  endFreq,
  gain = 0.25,
  attack = 0.005,
  decay = 0.15,
  start = 0,
}) {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.connect(g);
  g.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  if (endFreq)
    osc.frequency.exponentialRampToValueAtTime(
      endFreq,
      ctx.currentTime + start + decay,
    );
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + attack);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + decay);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + decay + 0.05);
}

function playNoise({ gain = 0.1, decay = 0.12, start = 0, freq = 800 }) {
  const ctx = getAudioCtx();
  const bufSize = ctx.sampleRate * (decay + 0.05);
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 0.5;
  const g = ctx.createGain();
  src.connect(filter);
  filter.connect(g);
  g.connect(ctx.destination);
  g.gain.setValueAtTime(gain, ctx.currentTime + start);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + decay);
  src.start(ctx.currentTime + start);
  src.stop(ctx.currentTime + start + decay + 0.05);
}

function playHeartbeat(intensity = 1) {
  const vol = Math.min(0.18 * intensity, 0.35);
  playTone({ type: "sine", freq: 80, endFreq: 35, gain: vol, decay: 0.18 });
  playNoise({ gain: vol * 0.3, decay: 0.08, freq: 120 });
  setTimeout(() => {
    playTone({
      type: "sine",
      freq: 70,
      endFreq: 30,
      gain: vol * 0.7,
      decay: 0.14,
    });
    playNoise({ gain: vol * 0.2, decay: 0.06, freq: 100 });
  }, 160);
}

function sfxStart() {
  playTone({
    type: "sawtooth",
    freq: 110,
    endFreq: 100,
    gain: 0.06,
    decay: 0.6,
  });
  playTone({ type: "square", freq: 440, gain: 0.04, decay: 0.05 });
}

function sfxGo() {
  playTone({
    type: "square",
    freq: 300,
    endFreq: 1200,
    gain: 0.22,
    attack: 0.001,
    decay: 0.08,
  });
  playTone({
    type: "sine",
    freq: 800,
    endFreq: 1600,
    gain: 0.18,
    attack: 0.001,
    decay: 0.12,
    start: 0.04,
  });
  playNoise({ gain: 0.1, decay: 0.06, freq: 2000 });
}

function sfxFakeout() {
  playTone({
    type: "sawtooth",
    freq: 400,
    endFreq: 200,
    gain: 0.14,
    attack: 0.001,
    decay: 0.1,
  });
  playNoise({ gain: 0.06, decay: 0.08, freq: 600 });
}

function sfxEarly() {
  playTone({
    type: "sawtooth",
    freq: 280,
    endFreq: 60,
    gain: 0.28,
    decay: 0.35,
  });
  playNoise({ gain: 0.15, decay: 0.25, freq: 200 });
  playTone({
    type: "square",
    freq: 120,
    endFreq: 50,
    gain: 0.12,
    decay: 0.4,
    start: 0.05,
  });
}

function sfxResult(ms) {
  const quality = Math.max(0, Math.min(1, (500 - ms) / 350));
  const baseFreq = 400 + quality * 800;
  playTone({
    type: "sine",
    freq: baseFreq,
    endFreq: baseFreq * 1.5,
    gain: 0.15,
    decay: 0.25,
  });
  playTone({
    type: "sine",
    freq: baseFreq * 1.25,
    gain: 0.1,
    decay: 0.35,
    start: 0.06,
  });
  if (ms < 250)
    playTone({
      type: "sine",
      freq: baseFreq * 2,
      gain: 0.08,
      decay: 0.3,
      start: 0.12,
    });
}

function sfxNewBest() {
  playTone({ type: "sine", freq: 600, endFreq: 900, gain: 0.18, decay: 0.2 });
  playTone({
    type: "sine",
    freq: 750,
    endFreq: 1100,
    gain: 0.14,
    decay: 0.25,
    start: 0.15,
  });
  playTone({
    type: "sine",
    freq: 900,
    endFreq: 1400,
    gain: 0.1,
    decay: 0.3,
    start: 0.3,
  });
}

function triggerPulse() {
  pulseRing.classList.remove("beat");
  void pulseRing.offsetWidth;
  pulseRing.classList.add("beat");
}

function startHeartbeat(totalDelay) {
  stopHeartbeat();
  let elapsed = 0;
  function scheduleBeat() {
    if (state !== "waiting") return;
    const progress = Math.min(elapsed / totalDelay, 0.95);
    const interval = 1100 - progress * 800;
    const intensity = 1 + progress * 1.5;
    heartbeatInterval = setTimeout(() => {
      if (state !== "waiting") return;
      triggerPulse();
      playHeartbeat(intensity);
      elapsed += interval;
      scheduleBeat();
    }, interval);
  }
  scheduleBeat();
}

function stopHeartbeat() {
  clearTimeout(heartbeatInterval);
  heartbeatInterval = null;
  pulseRing.classList.remove("beat");
}

function startTensionBar(duration) {
  tensionStart = performance.now();
  tensionDuration = duration;
  tensionFill.style.width = "0%";
  function animate() {
    if (state !== "waiting") return;
    const pct = Math.min(
      ((performance.now() - tensionStart) / tensionDuration) * 100,
      100,
    );
    tensionFill.style.width = pct + "%";
    const alpha = 0.3 + (pct / 100) * 0.7;
    tensionFill.style.background = `linear-gradient(90deg, transparent, rgba(255,34,68,${alpha}), transparent)`;
    if (pct < 100) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

function stopTensionBar() {
  tensionFill.style.width = "0%";
}

function setMode(mode) {
  gameMode = mode;
  document
    .getElementById("mode-normal")
    .classList.toggle("active", mode === "normal");
  document
    .getElementById("mode-fakeout")
    .classList.toggle("active", mode === "fakeout");
  modeBadge.style.display = mode === "fakeout" ? "block" : "none";
  resetArenaToIdle();
}

function clearFakeouts() {
  fakeoutPending.forEach(clearTimeout);
  fakeoutPending = [];
  isFakeout = false;
}

function triggerFakeout() {
  if (state !== "waiting") return;
  isFakeout = true;

  arena.className = "fakeout";
  mainText.style.color = "#ff8800";
  mainText.textContent = "CLICK NOW!";
  mainText.classList.add("go-flash");
  sfxFakeout();

  let fb = document.getElementById("fakeout-burst");
  if (!fb) {
    fb = document.createElement("div");
    fb.id = "fakeout-burst";
    fb.className = "fakeout-burst";
    arena.appendChild(fb);
  }
  fb.classList.remove("active");
  void fb.offsetWidth;
  fb.classList.add("active");

  const revertId = setTimeout(() => {
    if (state !== "waiting") return;
    isFakeout = false;
    arena.className = "ready";
    mainText.style.color = "var(--danger)";
    mainText.textContent = "WAIT...";
    mainText.classList.remove("go-flash");
  }, 400);
  fakeoutPending.push(revertId);
}

function scheduleFakeouts(totalDelay) {
  const count = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < count; i++) {
    const when = 600 + Math.random() * (totalDelay - 1000);
    const id = setTimeout(triggerFakeout, when);
    fakeoutPending.push(id);
  }
}

function getRating(ms) {
  if (ms < 150) return ["SUPERHUMAN", "#00ffff"];
  if (ms < 200) return ["ELITE", "#00ffaa"];
  if (ms < 250) return ["FAST", "#44ff88"];
  if (ms < 300) return ["GOOD", "#aaff44"];
  if (ms < 400) return ["AVERAGE", "#ffcc00"];
  if (ms < 500) return ["SLOW", "#ff8844"];
  return ["SLUGGISH", "#ff2244"];
}

function startGame() {
  clearTimeout(timeout);
  clearFakeouts();
  stopHeartbeat();
  stopTensionBar();
  btnSubmit.style.display = "none";

  state = "waiting";
  arena.className = "ready";
  mainText.style.color = "var(--danger)";
  mainText.textContent = "WAIT...";
  mainText.classList.remove("go-flash", "early-shake");
  subText.textContent =
    gameMode === "fakeout"
      ? "watch out for fake flashes!"
      : "hold on... not yet!";
  sfxStart();

  const delay = 1500 + Math.random() * 3000;
  startHeartbeat(delay);
  startTensionBar(delay);

  if (gameMode === "fakeout") scheduleFakeouts(delay);

  timeout = setTimeout(showGo, delay);
}

function showGo() {
  clearFakeouts();
  stopHeartbeat();
  stopTensionBar();
  tensionFill.style.width = "100%";
  tensionFill.style.background =
    "linear-gradient(90deg, transparent, #00ffaa, transparent)";

  isFakeout = false;
  state = "go";
  arena.className = "go";
  mainText.style.color = "var(--accent)";
  mainText.textContent = "CLICK NOW!";
  mainText.classList.add("go-flash");
  subText.textContent = "";

  goBurst.classList.remove("active");
  void goBurst.offsetWidth;
  goBurst.classList.add("active");

  sfxGo();
  startTime = performance.now();
}

function handleClick() {
  if (state === "idle") {
    startGame();
    return;
  }

  if (state === "waiting") {
    if (isFakeout) {
      clearTimeout(timeout);
      clearFakeouts();
      stopHeartbeat();
      stopTensionBar();
      state = "idle";

      arena.className = "early";
      mainText.style.color = "var(--danger)";
      mainText.textContent = "TRAP!";
      mainText.classList.remove("go-flash");
      mainText.classList.add("early-shake");
      subText.textContent = "you fell for the fake!\nclick to try again";
      errorOverlay.classList.remove("flash");
      void errorOverlay.offsetWidth;
      errorOverlay.classList.add("flash");
      sfxEarly();
      tensionFill.style.width = "0%";
      return;
    }

    clearTimeout(timeout);
    clearFakeouts();
    stopHeartbeat();
    stopTensionBar();
    state = "idle";
    arena.className = "early";
    mainText.style.color = "var(--danger)";
    mainText.textContent = "TOO EARLY!";
    mainText.classList.remove("go-flash");
    mainText.classList.add("early-shake");
    subText.textContent = "wait for green\nclick to try again";
    errorOverlay.classList.remove("flash");
    void errorOverlay.offsetWidth;
    errorOverlay.classList.add("flash");
    sfxEarly();
    tensionFill.style.width = "0%";
    return;
  }

  if (state === "go") {
    const ms = Math.round(performance.now() - startTime);
    recordResult(ms);
  }
}

function recordResult(ms) {
  state = "result";
  results.push(ms);

  const prevBest =
    results.length > 1 ? Math.min(...results.slice(0, -1)) : Infinity;
  const best = Math.min(...results);
  const avg = Math.round(results.reduce((a, b) => a + b, 0) / results.length);
  const [rating, ratingColor] = getRating(ms);
  const isNewBest = ms < prevBest && results.length > 1;

  statLast.textContent = ms + "ms";
  statBest.textContent = best + "ms";
  statAvg.textContent = avg + "ms";

  arena.className = "go";
  mainText.style.color = "var(--accent)";
  mainText.textContent = ms + "ms";
  mainText.classList.remove("go-flash");
  subText.innerHTML = `<span style="color:${ratingColor};letter-spacing:3px;border:1px solid ${ratingColor};padding:2px 8px">${rating}</span><br><br>click to test again`;

  if (isNewBest) {
    sfxNewBest();
    showNewBestBanner();
  } else {
    sfxResult(ms);
  }

  updateHistory();

  if (playerInput.value.trim()) {
    btnSubmit.style.display = "";
    btnSubmit.className = "btn submit-btn";
    btnSubmit.textContent = "[ SUBMIT SCORE ]";
  }

  tensionFill.style.width = "0%";
  state = "idle";
}

function updateHistory() {
  const max = Math.max(...results, 500);
  historyEl.innerHTML = "";
  results.slice(-14).forEach((r) => {
    const bar = document.createElement("div");
    bar.className = "history-bar";
    bar.style.height = Math.max(8, (r / max) * 100) + "%";
    if (r === Math.min(...results)) bar.classList.add("best-bar");
    if (r === results[results.length - 1]) bar.classList.add("current-bar");
    bar.title = r + "ms";
    historyEl.appendChild(bar);
  });
}

function showNewBestBanner() {
  let banner = document.getElementById("new-best-banner");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "new-best-banner";
    banner.className = "new-best-banner";
    document.body.appendChild(banner);
  }
  banner.textContent = "🏆 NEW PERSONAL BEST!";
  banner.classList.remove("show");
  void banner.offsetWidth;
  banner.classList.add("show");
}

function resetArenaToIdle() {
  clearTimeout(timeout);
  clearFakeouts();
  stopHeartbeat();
  stopTensionBar();
  state = "idle";
  arena.className = "waiting";
  mainText.style.color = "var(--muted)";
  mainText.textContent = "CLICK TO START";
  mainText.classList.remove("go-flash", "early-shake");
  subText.textContent =
    gameMode === "fakeout"
      ? "watch for fakeouts!\nonly click on green"
      : "test your reaction time\nclick when it turns green";
  tensionFill.style.width = "0%";
}

function resetStats() {
  results = [];
  btnSubmit.style.display = "none";
  statLast.textContent = "—";
  statBest.textContent = "—";
  statAvg.textContent = "—";
  historyEl.innerHTML = "";
  resetArenaToIdle();
}

const LB_KEY = "reflex_leaderboard_v1";
let lbTab = "normal";

function loadLeaderboard() {
  try {
    return (
      JSON.parse(localStorage.getItem(LB_KEY)) || { normal: [], fakeout: [] }
    );
  } catch {
    return { normal: [], fakeout: [] };
  }
}

function saveLeaderboard(data) {
  localStorage.setItem(LB_KEY, JSON.stringify(data));
}

function submitScore() {
  const name = playerInput.value.trim().toUpperCase() || "UNKNOWN";
  if (results.length === 0) return;

  const best = Math.min(...results);
  const avg = Math.round(results.reduce((a, b) => a + b, 0) / results.length);
  const [rating] = getRating(best);
  const entry = {
    name,
    best,
    avg,
    rating,
    attempts: results.length,
    mode: gameMode,
    date: Date.now(),
  };

  const data = loadLeaderboard();
  const list = data[gameMode];

  const existingIdx = list.findIndex((e) => e.name === name);
  if (existingIdx >= 0) {
    if (best < list[existingIdx].best) list[existingIdx] = entry;
  } else {
    list.push(entry);
  }

  list.sort((a, b) => a.best - b.best);
  data[gameMode] = list;
  saveLeaderboard(data);

  btnSubmit.textContent = "[ ✓ SUBMITTED ]";
  btnSubmit.style.borderColor = "var(--accent)";
  btnSubmit.style.color = "var(--accent)";
  setTimeout(() => {
    btnSubmit.style.display = "none";
  }, 1500);

  playTone({ type: "sine", freq: 660, endFreq: 880, gain: 0.12, decay: 0.2 });
}

function openLeaderboard() {
  lbTab = gameMode;
  renderLeaderboard();
  document.getElementById("modal-overlay").classList.add("open");
  document.getElementById("modal").classList.add("open");
}

function closeLeaderboard() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.getElementById("modal").classList.remove("open");
}

function switchTab(tab) {
  lbTab = tab;
  document
    .getElementById("tab-normal")
    .classList.toggle("active", tab === "normal");
  document
    .getElementById("tab-fakeout")
    .classList.toggle("active", tab === "fakeout");
  renderLeaderboard();
}

function renderLeaderboard() {
  const data = loadLeaderboard();
  const list = data[lbTab] || [];
  const tbody = document.getElementById("lb-body");
  const empty = document.getElementById("lb-empty");

  if (list.length === 0) {
    tbody.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  const medals = ["🥇", "🥈", "🥉"];
  const rankClasses = ["lb-rank-1", "lb-rank-2", "lb-rank-3"];

  tbody.innerHTML = list
    .map((entry, i) => {
      const [, ratingColor] = getRating(entry.best);
      const rankLabel = i < 3 ? medals[i] : i + 1;
      const rankCls = i < 3 ? rankClasses[i] : "";
      const scoreCls = i === 0 ? "gold" : "green";
      return `<tr class="${i < 3 ? "rank-" + (i + 1) : ""}">
      <td><span class="lb-rank ${rankCls}">${rankLabel}</span></td>
      <td><span class="lb-name">${entry.name}</span></td>
      <td><span class="lb-score ${scoreCls}">${entry.best}ms</span></td>
      <td><span class="lb-score" style="font-size:14px;color:var(--muted)">${entry.avg}ms</span></td>
      <td><span class="lb-rating-tag" style="color:${ratingColor}">${entry.rating}</span></td>
    </tr>`;
    })
    .join("");
}

function clearLeaderboard() {
  if (!confirm("Clear ALL leaderboard scores? This cannot be undone.")) return;
  saveLeaderboard({ normal: [], fakeout: [] });
  renderLeaderboard();
}

document.addEventListener("keydown", (e) => {
  if (document.activeElement === playerInput) return;
  if (e.code === "Space" || e.code === "Enter") {
    e.preventDefault();
    handleClick();
  }
  if (e.code === "Escape") closeLeaderboard();
});
