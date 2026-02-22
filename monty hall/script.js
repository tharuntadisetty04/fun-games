let gameState = {
  phase: "pick",
  carDoor: -1,
  selectedDoor: -1,
  revealedDoor: -1,
  stats: {
    total: 0,
    stayWins: 0,
    switchWins: 0,
    stayTotal: 0,
    switchTotal: 0,
  },
};

function initGame() {
  gameState.phase = "pick";
  gameState.carDoor = Math.floor(Math.random() * 3);
  gameState.selectedDoor = -1;
  gameState.revealedDoor = -1;

  for (let i = 0; i < 3; i++) {
    const wrap = document.getElementById(`door-${i}`);
    const anim = document.getElementById(`door-anim-${i}`);
    wrap.className = "door-wrap selectable";
    anim.classList.remove("open");
  }

  updatePhase(1, "Pick a door");
  setMessage(
    "info",
    "🎭 Three doors stand before you. Behind one: a brand new car. Behind the others: goats. Choose your door to begin.",
  );
  setAction("");
}

function selectDoor(idx) {
  if (gameState.phase !== "pick") return;
  gameState.selectedDoor = idx;
  gameState.phase = "switch";

  for (let i = 0; i < 3; i++) {
    const wrap = document.getElementById(`door-${i}`);
    wrap.className = i === idx ? "door-wrap selected" : "door-wrap disabled";
  }

  let goatOptions = [0, 1, 2].filter(
    (i) => i !== idx && i !== gameState.carDoor,
  );
  gameState.revealedDoor =
    goatOptions[Math.floor(Math.random() * goatOptions.length)];

  setTimeout(() => {
    revealDoor(gameState.revealedDoor, "goat");
    document.getElementById(`door-${gameState.revealedDoor}`).className =
      "door-wrap goat";

    updatePhase(2, "Stay or switch?");
    setMessage(
      "info",
      `🐐 Monty opens Door ${["I", "II", "III"][gameState.revealedDoor]} — it's a goat! Now: do you <strong>stay</strong> with your original choice, or <strong>switch</strong> to the other door?`,
    );
    setAction("choice");
  }, 400);
}

function makeChoice(stayOrSwitch) {
  gameState.phase = "reveal";
  const finalDoor =
    stayOrSwitch === "stay"
      ? gameState.selectedDoor
      : [0, 1, 2].find(
          (i) => i !== gameState.selectedDoor && i !== gameState.revealedDoor,
        );

  const won = finalDoor === gameState.carDoor;
  gameState.stats.total++;
  if (stayOrSwitch === "stay") {
    gameState.stats.stayTotal++;
    if (won) gameState.stats.stayWins++;
  } else {
    gameState.stats.switchTotal++;
    if (won) gameState.stats.switchWins++;
  }

  for (let i = 0; i < 3; i++) {
    if (i !== gameState.revealedDoor) {
      const isCar = i === gameState.carDoor;
      setTimeout(() => revealDoor(i, isCar ? "car" : "goat"), i * 120);
    }
  }

  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      const wrap = document.getElementById(`door-${i}`);
      if (i === finalDoor) {
        wrap.className = won ? "door-wrap winner" : "door-wrap loser";
      } else if (i !== gameState.revealedDoor) {
        wrap.className = "door-wrap disabled";
      }
    }

    if (won) {
      setMessage(
        "success",
        `🏆 <strong>You won the car!</strong> You chose to ${stayOrSwitch}. Lucky${stayOrSwitch === "switch" ? " — and statistically smart!" : ", though the odds were against you!"}`,
      );
      spawnConfetti();
    } else {
      setMessage(
        "danger",
        `🐐 <strong>You got a goat.</strong> You chose to ${stayOrSwitch}. ${stayOrSwitch === "stay" ? "Switching would have won!" : "Tough luck — the car was behind your original door!"}`,
      );
    }

    updateStats();
    updatePhase(3, "Game over");
    setAction("play-again");
  }, 600);
}

function revealDoor(idx, type) {
  const emoji = document.getElementById(`door-emoji-${idx}`);
  const label = document.getElementById(`door-result-${idx}`);
  const anim = document.getElementById(`door-anim-${idx}`);
  const resultEl = document.getElementById(`door-result-${idx}`);

  if (type === "car") {
    emoji.textContent = "🚗";
    label.textContent = "Car!";
    resultEl.className = "door-result-label car";
  } else {
    emoji.textContent = "🐐";
    label.textContent = "Goat";
    resultEl.className = "door-result-label goat";
  }

  anim.classList.add("open");
}

function setMessage(type, html) {
  const box = document.getElementById("message-box");
  box.className = `message-box ${type} animate-in`;
  box.innerHTML = html;
  void box.offsetWidth;
  box.classList.add("animate-in");
}

function setAction(type) {
  const area = document.getElementById("action-area");
  if (type === "choice") {
    area.innerHTML = `
        <div style="font-size:12px;color:var(--text-dim);letter-spacing:0.15em;text-transform:uppercase;margin-top:-8px">Your move:</div>
        <div class="choice-buttons">
          <button class="btn btn-stay" onclick="makeChoice('stay')">Stay with door ${["I", "II", "III"][gameState.selectedDoor]}</button>
          <button class="btn btn-switch" onclick="makeChoice('switch')">Switch doors</button>
        </div>
      `;
  } else if (type === "play-again") {
    area.innerHTML = `<button class="btn btn-play" style="margin-top:16px;" onclick="initGame()">Play Again</button>`;
  } else {
    area.innerHTML = "";
  }
}

function updatePhase(active, label) {
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`phase-${i}`);
    dot.className =
      "phase-dot" + (i < active ? " done" : i === active ? " active" : "");
  }
  document.getElementById("phase-label").textContent = label;
}

function updateStats() {
  const s = gameState.stats;
  document.getElementById("stat-total").textContent = s.total;
  document.getElementById("stat-switch-wins").textContent = s.switchWins;
  document.getElementById("stat-stay-wins").textContent = s.stayWins;

  const switchRate =
    s.switchTotal > 0 ? Math.round((s.switchWins / s.switchTotal) * 100) : null;
  const stayRate =
    s.stayTotal > 0 ? Math.round((s.stayWins / s.stayTotal) * 100) : null;

  const statSwitchRateEl = document.getElementById("stat-switch-rate");
  if (statSwitchRateEl)
    statSwitchRateEl.textContent = switchRate !== null ? switchRate + "%" : "—";

  const barStay = document.getElementById("bar-stay");
  const barSwitch = document.getElementById("bar-switch");
  const pctStay = document.getElementById("pct-stay");
  const pctSwitch = document.getElementById("pct-switch");
  const cntStay = document.getElementById("cnt-stay");
  const cntSwitch = document.getElementById("cnt-switch");

  if (s.stayTotal > 0 || s.switchTotal > 0) {
    if (barStay && stayRate !== null) barStay.style.width = stayRate + "%";
    if (barSwitch && switchRate !== null)
      barSwitch.style.width = switchRate + "%";
    if (pctStay) pctStay.textContent = stayRate !== null ? stayRate + "%" : "—";
    if (pctSwitch)
      pctSwitch.textContent = switchRate !== null ? switchRate + "%" : "—";
  }

  if (cntStay) cntStay.textContent = `${s.stayWins}/${s.stayTotal} wins`;
  if (cntSwitch)
    cntSwitch.textContent = `${s.switchWins}/${s.switchTotal} wins`;
}

function runSimulation(n) {
  document.querySelectorAll(".btn-sim").forEach((b) => (b.disabled = true));

  let switchWins = 0;
  let stayWins = 0;

  for (let i = 0; i < n; i++) {
    const car = Math.floor(Math.random() * 3);
    const pick = Math.floor(Math.random() * 3);

    const goatOptions = [0, 1, 2].filter((d) => d !== pick && d !== car);
    const revealed =
      goatOptions[Math.floor(Math.random() * goatOptions.length)];

    const switched = [0, 1, 2].find((d) => d !== pick && d !== revealed);

    if (switched === car) switchWins++;
    if (pick === car) stayWins++;
  }

  gameState.stats.total += n;
  gameState.stats.switchWins += switchWins;
  gameState.stats.switchTotal += n;
  gameState.stats.stayWins += stayWins;
  gameState.stats.stayTotal += n;
  updateStats();

  const switchPct = Math.round((switchWins / n) * 100);
  const stayPct = Math.round((stayWins / n) * 100);

  document.getElementById("sim-switch-pct").textContent = switchPct + "%";
  document.getElementById("sim-stay-pct").textContent = stayPct + "%";
  document.getElementById("sim-switch-count").textContent =
    `${switchWins} / ${n} games`;
  document.getElementById("sim-stay-count").textContent =
    `${stayWins} / ${n} games`;

  const resultsEl = document.getElementById("sim-results");
  resultsEl.classList.add("visible");

  const barsEl = document.getElementById("sim-bars");
  barsEl.style.display = "flex";

  const barSwitch = document.getElementById("sim-bar-switch");
  const barStay = document.getElementById("sim-bar-stay");
  barSwitch.style.width = "0%";
  barStay.style.width = "0%";
  document.getElementById("sim-pct-switch").textContent = switchPct + "%";
  document.getElementById("sim-pct-stay").textContent = stayPct + "%";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      barSwitch.style.width = switchPct + "%";
      barStay.style.width = stayPct + "%";
    });
  });

  setTimeout(() => {
    document.querySelectorAll(".btn-sim").forEach((b) => (b.disabled = false));
  }, 400);
}

function spawnConfetti() {
  const colors = ["#c9a84c", "#f0d070", "#4ca870", "#ffffff", "#c94040"];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.cssText = `
          left: ${20 + Math.random() * 60}%;
          top: -10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          transform: rotate(${Math.random() * 360}deg);
          animation-duration: ${0.8 + Math.random() * 1.2}s;
          animation-delay: ${Math.random() * 0.3}s;
          width: ${4 + Math.random() * 12}px;
          height: ${4 + Math.random() * 8}px;
        `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }, i * 30);
  }
}

initGame();
