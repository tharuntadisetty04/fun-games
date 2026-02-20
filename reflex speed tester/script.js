let state = "idle";
let startTime = null;
let timeout = null;
let heartbeatInterval = null;
let tensionInterval = null;
let tensionStart = null;
let tensionDuration = null;
let results = [];

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
  const gainNode = ctx.createGain();
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  if (endFreq)
    osc.frequency.exponentialRampToValueAtTime(
      endFreq,
      ctx.currentTime + start + decay,
    );
  gainNode.gain.setValueAtTime(0, ctx.currentTime + start);
  gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + attack);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + start + decay,
  );
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + decay + 0.05);
}

function playNoise({ gain = 0.1, decay = 0.12, start = 0, freq = 800 }) {
  const ctx = getAudioCtx();
  const bufSize = ctx.sampleRate * (decay + 0.05);
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 0.5;
  const gainNode = ctx.createGain();
  src.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  gainNode.gain.setValueAtTime(gain, ctx.currentTime + start);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + start + decay,
  );
  src.start(ctx.currentTime + start);
  src.stop(ctx.currentTime + start + decay + 0.05);
}

function playHeartbeat(intensity = 1) {
  const vol = Math.min(0.18 * intensity, 0.35);
  playTone({
    type: "sine",
    freq: 80,
    endFreq: 35,
    gain: vol,
    decay: 0.18,
  });
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
  playNoise({ gain: 0.1, decay: 0.06, freq: 2000, start: 0 });
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
  if (ms < 250) {
    playTone({
      type: "sine",
      freq: baseFreq * 2,
      gain: 0.08,
      decay: 0.3,
      start: 0.12,
    });
  }
}

let heartbeatSpeed = 1000;

function triggerPulse() {
  pulseRing.classList.remove("beat");
  void pulseRing.offsetWidth;
  pulseRing.classList.add("beat");
}

function startHeartbeat(totalDelay) {
  stopHeartbeat();
  let elapsed = 0;
  let beatCount = 0;
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
      beatCount++;
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
  tensionFill.style.transition = "none";
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
  stopHeartbeat();
  stopTensionBar();
  state = "waiting";
  arena.className = "ready";
  mainText.style.color = "var(--danger)";
  mainText.textContent = "WAIT...";
  mainText.classList.remove("go-flash", "early-shake");
  subText.textContent = "hold on... not yet!";
  sfxStart();

  const delay = 1500 + Math.random() * 3000;
  startHeartbeat(delay);
  startTensionBar(delay);
  timeout = setTimeout(showGo, delay);
}

function showGo() {
  stopHeartbeat();
  stopTensionBar();
  tensionFill.style.width = "100%";
  tensionFill.style.background =
    "linear-gradient(90deg, transparent, #00ffaa, transparent)";
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
  } else if (state === "waiting") {
    clearTimeout(timeout);
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
  } else if (state === "go") {
    const elapsed = performance.now() - startTime;
    const ms = Math.round(elapsed);
    recordResult(ms);
  }
}

function recordResult(ms) {
  state = "result";
  results.push(ms);

  const best = Math.min(...results);
  const avg = Math.round(results.reduce((a, b) => a + b, 0) / results.length);
  const [rating, ratingColor] = getRating(ms);

  statLast.textContent = ms + "ms";
  statBest.textContent = best + "ms";
  statAvg.textContent = avg + "ms";

  arena.className = "go";
  mainText.style.color = "var(--accent)";
  mainText.textContent = ms + "ms";
  mainText.classList.remove("go-flash");
  subText.innerHTML = `<span style="color:${ratingColor};letter-spacing:3px;border:1px solid ${ratingColor};padding:2px 8px">${rating}</span><br><br>click to test again`;

  sfxResult(ms);
  updateHistory(best);
  tensionFill.style.width = "0%";
  state = "idle";
}

function updateHistory(bestMs) {
  const max = Math.max(...results, 500);
  historyEl.innerHTML = "";
  const show = results.slice(-12);
  show.forEach((r) => {
    const bar = document.createElement("div");
    bar.className = "history-bar";
    const pct = Math.max(8, (r / max) * 100);
    bar.style.height = pct + "%";
    if (r === Math.min(...results)) bar.classList.add("best-bar");
    if (r === results[results.length - 1]) bar.classList.add("current-bar");
    bar.title = r + "ms";
    historyEl.appendChild(bar);
  });
}

function resetStats() {
  results = [];
  state = "idle";
  clearTimeout(timeout);
  stopHeartbeat();
  stopTensionBar();
  arena.className = "waiting";
  mainText.style.color = "var(--muted)";
  mainText.textContent = "CLICK TO START";
  mainText.classList.remove("go-flash", "early-shake");
  subText.textContent = "test your reaction time\nclick when it turns green";
  statLast.textContent = "—";
  statBest.textContent = "—";
  statAvg.textContent = "—";
  historyEl.innerHTML = "";
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "Enter") {
    e.preventDefault();
    handleClick();
  }
});
